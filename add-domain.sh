#!/bin/bash

# Set the target directory, search string, and replacement string
domains_path="/Users/juansgr/projects/atlas/atlas2/src/domains"
router_path="/Users/juansgr/projects/atlas/atlas2/src/app/hub"
newdomain="$1"    # The first argument will be the target directory
search="client"    # String to search for in filenames
search_upper="Client" # Uppercase version of the search string
replace="$newdomain" # This should be the new name you want to replace with

search_plural="${search}s"

replace_upper=$(echo "$newdomain" | awk '{ print toupper(substr($0, 1, 1)) substr($0, 2) }')
sw="s"
# Define the full path
full_path="$domains_path/$newdomain$sw"
full_router_path="$router_path/$newdomain$sw"

# Check if the target directory already exists
if [ -d "$full_path" ]; then
  echo "Directory $full_path already exists."
  exit 1
fi

# Base folder to copy
base_folder="$domains_path/clients"

# Copy the base folder to the new path
cp -r "$base_folder" "$full_path"

# Check if the copy was successful
if [ ! -d "$full_path" ]; then
  echo "Failed to create directory $full_path."
  exit 1
fi

# Find and rename files with lowercase search string
find "$full_path" -type f -name "*$search*" | while read -r file; do
  # Generate the new file name with the replacement
  newFile="${file//$search/$replace}"

  # Rename the file
  mv "$file" "$newFile"
  echo "Renamed: $file -> $newFile"
done

# Find and rename files with uppercase search string
find "$full_path" -type f -name "*$search_upper*" | while read -r file; do
  # Generate the new file name with the replacement
  newFile="${file//$search_upper/$replace_upper}"

  # Rename the file
  mv "$file" "$newFile"
  echo "Renamed: $file -> $newFile"
done


# Wait a moment to ensure the file system is ready (optional)
# sleep


search_plural="${search}s"
replace_plural="${replace}s"

find "$full_path" -type f -exec sed -i.bak "s|$search_plural|$replace_plural|g" {} +

# Replace lowercase 'client' with 'machine' in every file
find "$full_path" -type f -exec sed -i.bak "s|$search|$replace|g" {} +

# Replace uppercase 'Client' with 'Machine' in every file
find "$full_path" -type f -exec sed -i.bak "s|$search_upper|$replace_upper|g" {} +

find "$full_path" -type f -exec sed -i.bak "s|use $replace|use client|g" {} +


find "$full_path" -type f -name "*.bak" -exec rm {} +
