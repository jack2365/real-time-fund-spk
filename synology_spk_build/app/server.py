#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 3099
DIRECTORY = os.path.dirname(os.path.realpath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
        
    def do_GET(self):
        # 尝试映射到物理文件
        path = self.translate_path(self.path)
        if not os.path.exists(path):
            # SPA 回退到 index.html
            self.path = '/index.html'
        super().do_GET()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
