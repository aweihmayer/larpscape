# Native imports
from pathlib import Path
import shutil

def clean():
    print('ℹ️  Cleaning')
    target = Path(__file__).parent.parent

    for x in ('build', 'dist'):
        shutil.rmtree(target / x, ignore_errors=True)

    for x in target.glob('*.egg-info'):
        shutil.rmtree(x, ignore_errors=True)

    for x in target.rglob('__pycache__'):
        shutil.rmtree(x, ignore_errors=True)

    for x in target.rglob('.pytest_cache'):
        shutil.rmtree(x, ignore_errors=True)

if __name__ == '__main__':
    clean()