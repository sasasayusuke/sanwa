FROM python:3.12-slim

WORKDIR /app

# 依存関係ファイルをコピー
COPY requirements.txt .

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# debugpyのインストール
RUN pip install debugpy

# アプリケーションのソースコードをコピー
COPY . /app

# アプリケーションを実行するコマンド
CMD ["python", "start.py"]