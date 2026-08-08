#!/bin/bash

# Jekyll live preview server
echo "🚀 Starting Jekyll preview server..."

# Sync posts first
./sync-posts.sh

# Kill any existing Jekyll processes (suppress error if none found)
pkill -f "jekyll serve" >/dev/null 2>&1

# Start Jekyll with live reload and incremental builds
echo "📡 Starting server at http://localhost:4000"
echo "🔄 Auto-reloading when files change"
echo "📝 Edit your .md files in VSCode and see changes instantly!"
echo ""
echo "Press Ctrl+C to stop"

# Check if Gemfile exists and run appropriate command
if [ -f "Gemfile" ]; then
    # Use ruby -S to find bundle/jekyll in the ruby path, and REMOVE 2>/dev/null to show errors
    ruby -S bundle exec jekyll serve --livereload --incremental --port 4000 --host 0.0.0.0
else
    ruby -S jekyll serve --livereload --incremental --port 4000 --host 0.0.0.0
fi
