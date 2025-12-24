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
 * Generate QR code for artifact URL
 * @param {string} artifactUrl - The full URL to the artifact page
 * @param {string} containerId - DOM element ID to render QR code
 */
function generateQRCode(artifactUrl, containerId) {
    // Using qrcode.js library (would need to be included)
    // This is a placeholder for QR generation logic
    console.log(`QR Code would be generated for: ${artifactUrl}`);
    console.log(`Target container: ${containerId}`);
    
    // In production, you would use a library like:
    // new QRCode(document.getElementById(containerId), {
    //     text: artifactUrl,
    //     width: 256,
    //     height: 256
    // });
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
    // This would be expanded based on artifact categories
    if (artifactId.startsWith('FW-ARC-')) {
        const category = 'lighters'; // Would be determined by artifact type
        return `${baseUrl}/${category}/${artifactId.toLowerCase()}.html`;
    }
    return baseUrl;
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
                
                document.querySelector('.header').after(statusDiv);
            });
        }
    }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initVerificationUI);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateArtifactHash,
        generateQRCode,
        verifyArtifactHash,
        getArtifactUrl
    };
}
