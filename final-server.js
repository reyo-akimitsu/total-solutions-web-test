const http = require('http');
const fs = require('fs');
const path = require('path');

// Use port 8002 instead of 8001 to avoid conflicts
const PORT = 8002;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  
  // Handle the root path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Security check to prevent directory traversal
  if (filePath.includes('..')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  // Add .html extension if not present and file doesn't exist
  if (!path.extname(filePath)) {
    filePath += '.html';
  }
  
  // Resolve the file path
  filePath = path.join(process.cwd(), filePath);
  
  // Get the file extension
  const extname = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, serve 404 page
        fs.readFile(path.join(process.cwd(), '404.html'), (err, notFoundContent) => {
          if (err) {
            // If 404.html doesn't exist, send a simple 404 response
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>', 'utf-8');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(notFoundContent, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});