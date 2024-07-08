import os
import time
import debugpy

debug_mode = os.environ.get('DEBUG_MODE', '0')

if debug_mode == '1':
    print("Waiting for debugger to attach...")
    debugpy.listen(("0.0.0.0", 5678))
    debugpy.wait_for_client()
    print("Debugger attached!")
    time.sleep(2)  # デバッガーの初期化を待つ

import uvicorn
from api_server.main import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
