#!/bin/bash

# Jekyll live preview server
echo "🚀 Starting Jekyll preview server..."

# Sync posts first
./sync-posts.sh

# Kill any existing Jekyll processes
pkill -f "jekyll serve" 2>/dev/null

# Start Jekyll with live reload and incremental builds
echo "📡 Starting server at http://localhost:4000"
echo "🔄 Auto-reloading when files change"
echo "📝 Edit your .md files in VSCode and see changes instantly!"
echo ""
echo "Press Ctrl+C to stop"

# Use bundle if Gemfile exists, otherwise system jekyll
if [ -f "Gemfile" ]; then
    bundle exec jekyll serve --livereload --incremental --port 4000 --host 0.0.0.0 2>/dev/null
else
    jekyll serve --livereload --incremental --port 4000 --host 0.0.0.0 2>/dev/null
fi