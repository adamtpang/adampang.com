#!/usr/bin/env python3
"""
Sort sentences in markdown files by character count.
This script processes all .md files in the _archive folder, 
sorts each sentence by character count, and overwrites the files.
"""

import os
import re
import glob
from pathlib import Path

def extract_front_matter_and_content(content):
    """Extract front matter and main content from markdown file."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            front_matter = f"---{parts[1]}---"
            main_content = parts[2].strip()
            return front_matter, main_content
    return "", content

def split_into_sentences(text):
    """Split text into sentences while preserving structure."""
    # Split by periods, exclamation marks, and question marks followed by space or newline
    sentences = re.split(r'([.!?])\s+', text)
    
    # Recombine sentences with their punctuation
    result = []
    for i in range(0, len(sentences) - 1, 2):
        if i + 1 < len(sentences):
            sentence = sentences[i] + sentences[i + 1]
            # Only include non-empty sentences
            if sentence.strip():
                result.append(sentence.strip())
    
    # Handle any remaining text
    if len(sentences) % 2 == 1 and sentences[-1].strip():
        result.append(sentences[-1].strip())
    
    return result

def sort_sentences_by_length(sentences):
    """Sort sentences by character count (shortest first)."""
    return sorted(sentences, key=len)

def process_markdown_file(file_path):
    """Process a single markdown file."""
    print(f"Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract front matter and content
    front_matter, main_content = extract_front_matter_and_content(content)
    
    if not main_content.strip():
        print(f"  Skipping - no content to process")
        return
    
    # Split into sentences
    sentences = split_into_sentences(main_content)
    
    if len(sentences) <= 1:
        print(f"  Skipping - only {len(sentences)} sentence(s)")
        return
    
    # Sort by character count
    sorted_sentences = sort_sentences_by_length(sentences)
    
    # Reconstruct content
    new_content = '\n\n'.join(sorted_sentences)
    
    # Combine with front matter
    if front_matter:
        final_content = f"{front_matter}\n\n{new_content}\n"
    else:
        final_content = f"{new_content}\n"
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"  Sorted {len(sentences)} sentences by length")

def main():
    """Main function to process all markdown files in _archive folder."""
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
            process_markdown_file(file_path)
            processed_count += 1
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    
    print(f"\nCompleted! Processed {processed_count}/{len(md_files)} files")

if __name__ == "__main__":
    main()