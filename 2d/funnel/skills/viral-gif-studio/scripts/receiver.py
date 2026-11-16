#!/usr/bin/env python3
"""Receives base64 PNG frames from browser and saves to outdir."""
import base64, json, os, sys
from http.server import BaseHTTPRequestHandler, HTTPServer

OUTDIR = sys.argv[1] if len(sys.argv) > 1 else '/tmp/frames'
os.makedirs(OUTDIR, exist_ok=True)
received = {}

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(length))
        idx = body['i']
        data = base64.b64decode(body['png'].split(',', 1)[1])
        path = os.path.join(OUTDIR, f'f{idx:04d}.png')
        with open(path, 'wb') as f:
            f.write(data)
        received[idx] = True
        total = body.get('total', '?')
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(b'ok')
        if len(received) % 10 == 0:
            print(f'  saved {len(received)}/{total} frames', flush=True)
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    def log_message(self, *a): pass

print(f'Receiver on :8788 -> {OUTDIR}', flush=True)
HTTPServer(('localhost', 8788), Handler).serve_forever()
