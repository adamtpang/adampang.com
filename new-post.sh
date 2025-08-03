#!/bin/bash

# Script to create a new blog post with automatic date prefix
# Usage: ./new-post.sh "My Post Title"

if [ $# -eq 0 ]; then
    echo "Usage: ./new-post.sh \"Your Post Title\""
    exit 1
fi

# Get current date
DATE=$(date +%Y-%m-%d)

# Convert title to filename (lowercase, replace spaces with hyphens)
TITLE="$1"
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')

# Create the post file
POST_FILE="_posts/${DATE}-${FILENAME}.md"

cat > "$POST_FILE" << EOF
---
title: "$TITLE"
---

Write your post content here...
EOF

echo "Created new post: $POST_FILE"
echo "You can now edit it and just focus on the content!"