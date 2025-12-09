import base64
import os

image_path = 'public/assets/images/ora-web/slogo.png'
html_path = 'public/dashboard_refactor.html'

print(f"Reading image from {image_path}...")
with open(image_path, 'rb') as img_file:
    # Read the whole file
    data = img_file.read()
    print(f"Image size: {len(data)} bytes")
    encoded_string = base64.b64encode(data).decode('utf-8')
    print(f"Encoded string length: {len(encoded_string)}")

print(f"Reading HTML from {html_path}...")
with open(html_path, 'r') as html_file:
    lines = html_file.readlines()

found = False
for i, line in enumerate(lines):
    # Match the line containing the specific base64 start for slogo
    if 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAmCAYAAABK4f' in line:
        print(f"Found target line at index {i+1}")
        # Preserve indentation (12 spaces based on previous view)
        # We can extract it from the line itself
        indent = line[:line.find('<img')]
        if not indent:
            indent = '            ' # Fallback to 12 spaces if not found
            
        # Construct new line
        new_line = f'{indent}<img src="data:image/png;base64,{encoded_string}"\n'
        lines[i] = new_line
        found = True
        break

if found:
    with open(html_path, 'w') as html_file:
        html_file.writelines(lines)
    print("Successfully replaced slogo base64 in HTML.")
else:
    print("Target line not found in HTML. Please verify the search pattern.")
    # Fallback search: look for alt="Ora" and check previous line?
    # Or strict search for the exact start seen in view_file
