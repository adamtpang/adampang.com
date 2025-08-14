#!/bin/bash

# Sync posts from your simple format (_posts/) to Jekyll format (_jekyll_posts/)

echo "🔄 Syncing posts to Jekyll format..."

# Clear Jekyll posts directory
rm -rf _jekyll_posts/*.md 2>/dev/null

# Convert each post from _posts to _jekyll_posts
for file in _posts/*.md; do
    if [ -f "$file" ]; then
        # Extract date from front matter
        date=$(grep "^date:" "$file" | head -1 | sed 's/date: *//' | tr -d '"'"'"'')
        
        # Get filename without path
        basename=$(basename "$file" .md)
        
        # Create Jekyll filename: YYYY-MM-DD-title.md
        jekyll_name="${date}-${basename}.md"
        
        # Copy to Jekyll posts directory
        cp "$file" "_jekyll_posts/$jekyll_name"
        
        echo "✅ $file → _jekyll_posts/$jekyll_name"
    fi
done

echo "🎉 Post sync complete!"