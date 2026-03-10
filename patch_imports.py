import sys
import os

def process_file(filepath):
    with open(filepath, 'r', newline='') as f:
        content = f.read()

    # Replace relative ensocharts imports
    if 'ensocharts' in content and 'Zenith' not in filepath: # avoid self replace
        pass
    
    # Actually just simple regex replace
    import re
    # We replace `import { ... } from 'ensocharts'` with local imports.
    # But it's easier to just replace 'ensocharts' with '../../index' or '../index'
    if 'src/webgl/layers/' in filepath:
        content = content.replace("'ensocharts'", "'../../index'")
    elif 'src/webgl/' in filepath:
        content = content.replace("'ensocharts'", "'../index'")
        
    with open(filepath, 'w', newline='') as f:
        f.write(content)

for root, dirs, files in os.walk('src/webgl'):
    for file in files:
        if file.endswith('.ts'):
            process_file(os.path.join(root, file))
