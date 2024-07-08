# app.py
from flask import Flask, render_template, request, jsonify
import logging
import traceback
import json
import requests
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# ログの設定
logging.basicConfig(filename='app.log', level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(message)s')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    try:
        # フォームデータの取得
        server_address = request.form['server_address']
        site_id = request.form['site_id']
        api_key = request.form['api_key']

        # ファイルの保存
        input_file = request.files['input_file']
        if input_file:
            filename = secure_filename(input_file.filename)
            input_file.save(os.path.join('uploads', filename))

        # ここで設計書の処理を行う
        # process_design_document(filename, server_address, site_id, api_key)

        # 処理結果をログに記録
        logging.info(f"処理完了: {filename}")

        return jsonify({"status": "success", "message": "処理が完了しました"})
    except Exception as e:
        logging.error(f"エラー発生: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({"status": "error", "message": str(e)}), 500

def process_design_document(filename, server_address, site_id, api_key):
    # ここに設計書を処理するコードを記述
    # 例: Excelファイルの読み込み、JSONデータの作成、APIリクエストの送信など
    pass

if __name__ == '__main__':
    app.run(debug=True)
