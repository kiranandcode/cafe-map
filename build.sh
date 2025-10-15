#!/usr/bin/env bash
set -e

# Run build
npm run build

# Find the first CSS and JS file under dist/assets
CSS_FILE=$(find dist/assets -type f -name "*.css" | head -n 1)
JS_FILE=$(find dist/assets -type f -name "*.js" | head -n 1)

# Copy them to root with fixed names
cp "$CSS_FILE" ./cafehopper.css
cp "$JS_FILE" ./cafehopper.js

echo "Copied:"
echo "  CSS -> cafehopper.css"
echo "  JS  -> cafehopper.js"
