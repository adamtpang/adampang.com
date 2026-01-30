#!/bin/bash
echo "🔍 Debugging Jekyll server..."

# Check ruby version
ruby -v

echo "📦 Fixing Lockfile and Installing dependencies..."
# Use ruby -S to find bundle in the ruby path if the executable isn't in PATH
ruby -S bundle lock --add-platform x64-mingw-ucrt
ruby -S bundle install

echo "🚀 Starting server..."
# Try to run jekyll serve
ruby -S bundle exec jekyll serve --livereload --incremental --host 127.0.0.1 --port 4000