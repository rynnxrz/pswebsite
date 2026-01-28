
import os

ASSET_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.glb', '.mp4', '.mov', '.pdf', '.ico'}
IGNORE_DIRS = {'node_modules', '.git', 'dist', '.agent', '.gemini', '.vscode'}
SCAN_EXTENSIONS = {'.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md', '.scss', '.less'}

def get_all_files(root_dir):
    all_files = []
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            all_files.append(os.path.join(root, file))
    return all_files

def is_asset(file_path):
    return os.path.splitext(file_path)[1].lower() in ASSET_EXTENSIONS

def is_code(file_path):
    return os.path.splitext(file_path)[1].lower() in SCAN_EXTENSIONS

def main():
    root_dir = os.getcwd()
    assets = []
    code_files = []

    # 1. Collect Assets and Code
    for file_path in get_all_files(root_dir):
        rel_path = os.path.relpath(file_path, root_dir)
        
        # Classify
        if is_asset(file_path):
            assets.append(rel_path)
        
        if is_code(file_path):
            code_files.append(file_path)

    print(f"Found {len(assets)} assets.")
    print(f"Found {len(code_files)} code files.")

    # 2. Check usage
    # heuristic: filename usage
    unused_assets = []
    
    # Pre-read code content to avoid re-reading
    code_contents = []
    for cf in code_files:
        try:
            with open(cf, 'r', encoding='utf-8', errors='ignore') as f:
                code_contents.append(f.read())
        except Exception as e:
            print(f"Error reading {cf}: {e}")

    print("Scanning...")
    
    for asset in assets:
        basename = os.path.basename(asset)
        # For public assets, they might be referenced by path
        # e.g. public/assets/img.png -> /assets/img.png
        # We search for basename as a loose check first.
        
        found = False
        for content in code_contents:
            if basename in content:
                found = True
                break
        
        if not found:
            unused_assets.append(asset)

    # 3. Report
    print(f"\nTotal Unused Assets: {len(unused_assets)}")
    for asset in sorted(unused_assets):
        print(f"[UNUSED] {asset}")

if __name__ == "__main__":
    main()
