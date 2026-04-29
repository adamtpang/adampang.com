#!/bin/bash

# Auto git add, commit, push script
echo "🚀 Publishing blog posts..."

# First, sync posts to Jekyll format
echo "📋 Syncing posts to Jekyll format..."
./sync-posts.sh

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit."
    exit 0
fi

# Get current timestamp
timestamp=$(date "+%Y-%m-%d %H:%M:%S")

# Commit with auto-generated message
git commit -m "Update blog posts - $timestamp

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push

echo "✅ Published! Your posts are live at https://adampang.com/"