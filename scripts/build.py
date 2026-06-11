# Native imports
from enum import Enum
import json
from pathlib import Path
import subprocess
# Module imports
from scripts import clean
# Package imports
from src import *
# Third-party imports
import sass

def build_css():
    print('ℹ️  Building CSS')
    scss_files = list(Path('src/ui').rglob('*.scss'))
    scss_files.extend(Path('core/ui').rglob('*.scss'))
    scss_files = sorted(scss_files)
    scss_files = [x for x in scss_files if not x.name.endswith('vars.scss')]
    scss_files.insert(0, Path('src/ui/basic/vars.scss'))
    css = []
    for f in scss_files:
        css.append(sass.compile(filename=str(f)))

    with open('src/ui/build/main.css', 'w') as f:
        f.write('\n\n'.join(css))

def build_js():
    print('ℹ️  Building JS')
    subprocess.run([
        'npx',
        'esbuild',
        'src/main.tsx',
        '--bundle',
        #'--minify',
        '--outfile=src/ui/build/main.js'], shell=True)

def build():
    print('ℹ️  Building')
    build_css()
    build_js()

if __name__ == '__main__':
    clean.clean()
    build()