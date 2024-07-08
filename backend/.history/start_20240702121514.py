import os
import subprocess

debug_mode = os.environ.get('DEBUG_MODE', '0')

if debug_mode == '1':
    print("debug mode")
    cmd = ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678", "--wait-for-client", "-m", "uvicorn", "api_server.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
else:
    print("normal mode")
    cmd = ["uvicorn", "api_server.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

subprocess.run(cmd)