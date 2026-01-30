#!/bin/bash

# Watch for changes in _posts and auto-sync to _jekyll_posts
echo "👀 Watching _posts/ for changes..."
echo "Auto-syncing to _jekyll_posts/ when you edit files"
echo "Press Ctrl+C to stop"

# Function to sync posts
sync_posts() {
    echo "🔄 Change detected, syncing posts..."
    ./sync-posts.sh > /dev/null 2>&1
}

# Watch _posts directory for changes
if command -v inotifywait >/dev/null 2>&1; then
    # Linux
    while inotifywait -e close_write,moved_to,create _posts/ 2>/dev/null; do
        sync_posts
    done
elif command -v fswatch >/dev/null 2>&1; then
    # macOS
    fswatch -o _posts/ | while read; do
        sync_posts
    done
else
    echo "⚠️  No file watcher found. Install inotify-tools (Linux) or fswatch (macOS)"
    echo "💡 For now, manually run ./sync-posts.sh after editing"
fi