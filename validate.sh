#!/bin/bash
# Validation script for Localhost App Detector extension

echo "🔍 Validating Chrome Extension Files..."
echo "========================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo -e "${RED}❌ ERROR: manifest.json not found. Run this script from the extension directory.${NC}"
    exit 1
fi

echo "✅ Found manifest.json"

# Check required files
echo ""
echo "Checking required files..."
echo "--------------------------"

required_files=(
    "manifest.json"
    "background.js"
    "popup.html"
    "popup.css"
    "popup.js"
    "docker-manager.js"
    "port-scanner.js"
    "saved-apps-manager.js"
    "icons/icon16.png"
    "icons/icon48.png"
    "icons/icon128.png"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ MISSING: $file${NC}"
        ((errors++))
    fi
done

# Check manifest.json syntax
echo ""
echo "Validating manifest.json..."
echo "---------------------------"
if python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null; then
    echo -e "${GREEN}✅ manifest.json is valid JSON${NC}"
else
    echo -e "${RED}❌ manifest.json has syntax errors${NC}"
    ((errors++))
fi

# Check background.js imports
echo ""
echo "Checking background.js imports..."
echo "---------------------------------"
imports=$(grep "importScripts" background.js | sed "s/.*importScripts('\(.*\)').*/\1/")
for import in $imports; do
    if [ -f "$import" ]; then
        echo -e "${GREEN}✅ $import (imported by background.js)${NC}"
    else
        echo -e "${RED}❌ MISSING: $import (imported by background.js)${NC}"
        ((errors++))
    fi
done

# Check for common issues
echo ""
echo "Checking for common issues..."
echo "-----------------------------"

# Check for module.exports (wrong for service workers)
if grep -q "module.exports" docker-manager.js port-scanner.js saved-apps-manager.js 2>/dev/null; then
    echo -e "${RED}❌ Found 'module.exports' in imported files (should be removed)${NC}"
    ((errors++))
else
    echo -e "${GREEN}✅ No module.exports found (good for service workers)${NC}"
fi

# Check class names match
if grep -q "new DockerDetector" background.js; then
    echo -e "${RED}❌ background.js uses 'DockerDetector' but file is 'DockerManager'${NC}"
    ((errors++))
elif grep -q "new DockerManager" background.js; then
    echo -e "${GREEN}✅ background.js uses correct class name 'DockerManager'${NC}"
fi

# Check icon sizes
echo ""
echo "Checking icon files..."
echo "---------------------"
for icon in icons/icon16.png icons/icon48.png icons/icon128.png; do
    if [ -f "$icon" ]; then
        size=$(file "$icon" 2>/dev/null | grep -o '[0-9]* x [0-9]*' | head -1)
        echo -e "${GREEN}✅ $icon ($size)${NC}"
    fi
done

# Check for large files
echo ""
echo "Checking file sizes..."
echo "---------------------"
large_files=$(find . -name "*.js" -o -name "*.json" -o -name "*.html" -o -name "*.css" | xargs ls -lh | awk '$5 ~ /M$/ {print $9, $5}')
if [ ! -z "$large_files" ]; then
    echo -e "${YELLOW}⚠️  Large files found (>1MB):${NC}"
    echo "$large_files"
    ((warnings++))
else
    echo -e "${GREEN}✅ All files are reasonably sized${NC}"
fi

# Summary
echo ""
echo "========================================"
echo "Summary:"
echo "--------"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Extension should load.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Go to chrome://extensions/"
    echo "2. Enable 'Developer mode'"
    echo "3. Click 'Load unpacked'"
    echo "4. Select this directory"
    exit 0
else
    echo -e "${RED}❌ Found $errors error(s)${NC}"
    if [ $warnings -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Found $warnings warning(s)${NC}"
    fi
    echo ""
    echo "Fix the errors above before loading the extension."
    exit 1
fi
