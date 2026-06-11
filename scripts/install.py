# Native imports
import subprocess

print('ℹ️  Installing')
subprocess.run('pip install -r requirements.txt')
subprocess.run('npm install -g react react-dom')
subprocess.run('npm install -g @types/react @types/react-dom')
subprocess.run('npm install -g typescript')
subprocess.run('npm install esbuild')
subprocess.run('npm install lucide-react')
subprocess.run('npm install fuse.js')