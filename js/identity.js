/**
 * Fort Wolters Archive - Identity & Verification Module
 * Handles QR code generation and cryptographic hashing for artifacts
 */

/**
 * Generate SHA-256 hash of artifact data
 * @param {Object} artifactData - The artifact metadata object
 * @returns {Promise<string>} - Hex string of the hash
 */
async function generateArtifactHash(artifactData) {
    const dataString = JSON.stringify(artifactData, Object.keys(artifactData).sort());
    const encoder = new TextEncoder();
    const data = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Generate QR code for artifact URL using canvas-based rendering
 * @param {string} artifactUrl - The full URL to the artifact page
 * @param {string} containerId - DOM element ID to render QR code
 */
function generateQRCode(artifactUrl, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }

    // Create a canvas element for the QR code
    const canvas = document.createElement('canvas');
    canvas.id = 'qr-canvas';
    canvas.style.border = '2px solid #556B2F';
    canvas.style.borderRadius = '8px';
    canvas.style.padding = '10px';
    canvas.style.backgroundColor = 'white';
    
    container.appendChild(canvas);

    // Use QR code generation via API
    // This uses a simple GET request to generate the QR code as an image
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(artifactUrl)}`;
    
    const img = document.createElement('img');
    img.src = qrImageUrl;
    img.alt = 'QR Code for artifact verification';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    
    // Clear canvas and add image
    container.innerHTML = '';
    container.appendChild(img);
}

/**
 * Verify artifact hash against registry
 * @param {string} artifactId - The artifact ID to verify
 * @param {string} providedHash - The hash to verify
 * @returns {Promise<boolean>} - True if hash matches
 */
async function verifyArtifactHash(artifactId, providedHash) {
    try {
        const response = await fetch('../data/registry.json');
        const registry = await response.json();
        const artifact = registry.artifacts.find(a => a.id === artifactId);
        
        if (!artifact) {
            console.error('Artifact not found in registry');
            return false;
        }
        
        const computedHash = await generateArtifactHash(artifact);
        return computedHash === providedHash;
    } catch (error) {
        console.error('Error verifying hash:', error);
        return false;
    }
}

/**
 * Get full artifact URL for QR code generation
 * @param {string} artifactId - The artifact ID
 * @returns {string} - Full URL to artifact page
 */
function getArtifactUrl(artifactId) {
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
    // Map artifact ID to page URL
    if (artifactId.startsWith('FW-ARC-')) {
        const category = 'lighters'; // Would be determined by artifact type
        return `${baseUrl}/${category}/${artifactId.toLowerCase()}.html`;
    }
    return baseUrl;
}

/**
 * Initialize QR code generation on artifact page
 */
function initQRCode() {
    const artifactId = document.querySelector('.artifact-id')?.textContent;
    if (artifactId) {
        const qrContainer = document.getElementById('qr-code-container');
        if (qrContainer) {
            const artifactUrl = window.location.href;
            generateQRCode(artifactUrl, 'qr-code-container');
        }
    }
}

/**
 * Initialize verification UI
 */
function initVerificationUI() {
    const urlParams = new URLSearchParams(window.location.search);
    const verify = urlParams.get('verify');
    
    if (verify) {
        // Show verification status
        const artifactId = document.querySelector('.artifact-id')?.textContent;
        if (artifactId) {
            verifyArtifactHash(artifactId, verify).then(isValid => {
                const statusDiv = document.createElement('div');
                statusDiv.style.cssText = 'padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; font-weight: bold;';
                
                if (isValid) {
                    statusDiv.style.background = '#d4edda';
                    statusDiv.style.color = '#155724';
                    statusDiv.textContent = '✓ Artifact verified - Hash matches registry';
                } else {
                    statusDiv.style.background = '#f8d7da';
                    statusDiv.style.color = '#721c24';
                    statusDiv.textContent = '✗ Verification failed - Hash does not match';
                }
                
                const header = document.querySelector('.header');
                if (header) {
                    header.after(statusDiv);
                }
            });
        }
    }
}

/**
 * Handle contextual tag filtering
 * @param {string} tagType - Type of tag (e.g., 'aircraft', 'class', 'era')
 * @param {string} tagValue - Value of the tag
 */
function filterByTag(tagType, tagValue) {
    const dashboardUrl = '../dashboard.html?filter=' + encodeURIComponent(tagType) + '&value=' + encodeURIComponent(tagValue);
    window.location.href = dashboardUrl;
}

/**
 * Apply contextual tag filters from URL parameters on dashboard
 */
function applyContextualFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterType = urlParams.get('filter');
    const filterValue = urlParams.get('value');

    if (filterType && filterValue) {
        // Map filter types to form elements
        const filterMap = {
            'aircraft': 'categoryFilter',
            'class': 'categoryFilter',
            'era': 'eraFilter',
            'condition': 'conditionFilter'
        };

        const elementId = filterMap[filterType];
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.value = filterValue;
                // Trigger the filter
                element.dispatchEvent(new Event('change'));
            }
        }
    }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        initQRCode();
        initVerificationUI();
        applyContextualFilters();
    });
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateArtifactHash,
        generateQRCode,
        verifyArtifactHash,
        getArtifactUrl,
        filterByTag
    };
}
