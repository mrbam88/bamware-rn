#!/bin/bash

tmpfile=$(mktemp)
filtered=$(mktemp)

# Run tests and capture full output
yarn test 2>&1 | tee "$tmpfile"

# Extract key information
{
  # Test summary
  echo "Test Summary:"
  grep "Test Suites:" "$tmpfile"
  grep "Tests:" "$tmpfile"
  grep "Snapshots:" "$tmpfile"
  
  # Detailed errors
  echo -e "\nDetailed Errors:"
  sed -n '/^FAIL/,/^PASS/p' "$tmpfile" | grep -v "^PASS"
  
  # Warnings
  echo -e "\nWarnings:"
  grep "Warning:" "$tmpfile"
  
  # Timing
  echo -e "\nTiming:"
  grep "Time:" "$tmpfile"
} > "$filtered"

# Full error details
echo -e "\nFull Error Details:" >> "$filtered"
sed -n '/^FAIL/,/^PASS/p' "$tmpfile" >> "$filtered"

# Output to terminal
cat "$filtered"

# Copy to clipboard
cat "$filtered" | xclip -selection clipboard

echo "✅ Test results copied to clipboard."

# Cleanup
rm "$tmpfile" "$filtered"

# Exit with appropriate status
grep -q "^FAIL" "$tmpfile" && exit 1
exit 0