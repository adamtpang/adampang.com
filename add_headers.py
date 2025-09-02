#!/usr/bin/env python3
"""
Add standardized headers to all markdown files in _archive folder.
Uses the filename (without .md) as the title.
"""

import os
from pathlib import Path

def add_header_to_file(file_path):
    """Add standardized header to a markdown file."""
    print(f"Processing: {file_path}")
    
    # Get filename without extension for title
    title = file_path.stem
    
    # Read existing content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file already has front matter
    if content.startswith('---'):
        print(f"  Skipping - already has front matter")
        return
    
    # Create new header
    header = f'''---
title: "{title}"
date: 2025-08-14
image: https://i.pinimg.com/736x/c0/92/c5/c092c57320c42e8d55af83f9d5306314.jpg
---

'''
    
    # Combine header with existing content
    new_content = header + content
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  Added header with title: {title}")

def main():
    """Main function to process all markdown files."""
    archive_dir = Path("_archive")
    
    if not archive_dir.exists():
        print(f"Error: {archive_dir} directory not found!")
        return
    
    # Get all .md files
    md_files = list(archive_dir.glob("*.md"))
    
    print(f"Found {len(md_files)} markdown files to process")
    
    processed_count = 0
    for file_path in md_files:
        try:
            add_header_to_file(file_path)
            processed_count += 1
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    
    print(f"\nCompleted! Processed {processed_count}/{len(md_files)} files")

if __name__ == "__main__":
    main()