# Native imports
import subprocess
# Module imports
from scripts import build
from scripts import clean


clean.clean()
build.build()
print('ℹ️  Starting')
print('ℹ️  Open http://127.0.0.1:8000 in your browser when started')
subprocess.run('python -m uvicorn src.main:app --reload')
