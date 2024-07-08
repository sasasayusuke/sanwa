import os
import subprocess

debug_mode = os.environ.get('DEBUG_MODE', '0')

if debug_mode == '0':
    print("normal mode")
    command = ["uvicorn", "api_server.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
else:
    print("debug mode")
    command = ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678", "-m", "uvicorn", "api_server.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

subprocess.run(command)