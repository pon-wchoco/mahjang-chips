# mahjong-chips

## ローカル実行
Cloud datasoreと連携させる
```
set GOOGLE_APPLICATION_CREDENTIALS=<絶対パス>\db.json

python main.py
```
GCPのコンソールからDBの接続情報が含まれたJSONファイルをダウンロードします。
そのJSONファイルを環境変数に設定して、main.pyを実行すると、ローカル環境でもクラウドのDatastoreを利用して動作させることができます。

## デプロイ
>gcloud app deploy --project=<あなたのプロジェクトID>