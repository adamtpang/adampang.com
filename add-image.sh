#!/bin/bash

# Easy image adding script
# Usage: ./add-image.sh path/to/image.jpg "optional description"

if [ -z "$1" ]; then
    echo "Usage: ./add-image.sh path/to/image.jpg \"optional description\""
    echo "Example: ./add-image.sh ~/Downloads/screenshot.png \"My screenshot\""
    exit 1
fi

IMAGE_PATH="$1"
DESCRIPTION="${2:-Image}"

# Check if image exists
if [ ! -f "$IMAGE_PATH" ]; then
    echo "❌ Image not found: $IMAGE_PATH"
    exit 1
fi

# Get filename and extension
FILENAME=$(basename "$IMAGE_PATH")
NAME="${FILENAME%.*}"
EXT="${FILENAME##*.}"

# Create timestamp for unique naming
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
NEW_NAME="${TIMESTAMP}_${NAME}.${EXT}"

# Copy to assets/images/posts/
cp "$IMAGE_PATH" "assets/images/posts/$NEW_NAME"

# Generate markdown
MARKDOWN="![${DESCRIPTION}](/assets/images/posts/${NEW_NAME})"

echo "✅ Image copied to: assets/images/posts/$NEW_NAME"
echo "📋 Markdown to paste:"
echo ""
echo "$MARKDOWN"
echo ""
echo "This markdown is now in your clipboard (on macOS/Linux with xclip)"

# Try to copy to clipboard (works on different systems)
if command -v pbcopy >/dev/null 2>&1; then
    echo "$MARKDOWN" | pbcopy
elif command -v xclip >/dev/null 2>&1; then
    echo "$MARKDOWN" | xclip -selection clipboard
elif command -v clip.exe >/dev/null 2>&1; then
    echo "$MARKDOWN" | clip.exe
else
    echo "💡 Copy the markdown above and paste it in your post!"
fi