#!/bin/bash

# Fort Wolters Archive - GitHub Deployment Script

echo "🛩️  Fort Wolters Archive - GitHub Pages Deployment"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✓ Git initialized"
else
    echo "✓ Git repository already initialized"
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo ""
    echo "Please enter your GitHub username:"
    read username
    echo ""
    echo "Adding remote origin..."
    git remote add origin https://github.com/$username/fort-wolters-archive.git
    echo "✓ Remote added: https://github.com/$username/fort-wolters-archive.git"
else
    echo "✓ Remote origin already configured"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .
echo "✓ Files staged"

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "Deploy Fort Wolters Archive" || echo "No changes to commit"

# Push
echo ""
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "=================================================="
echo "✓ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to: https://github.com/$username/fort-wolters-archive"
echo "2. Click Settings > Pages"
echo "3. Set Source to: main branch, / (root)"
echo "4. Save and wait 1-2 minutes"
echo "5. Your site will be live at:"
echo "   https://$username.github.io/fort-wolters-archive/"
echo ""
