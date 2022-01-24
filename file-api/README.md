# File API 📂

A REST API for uploading & downloading image files.

Made using RUST 🦀



`POST: /upload` - Upload file to this endpoint

`GET /files/{file_name}` - Get uploaded file



The default port is configured to `8080`



## Setup

Api is made using RUST, so you need RUST & CARGO installed to get this thing working..

```bash
$ cargo run
```

Or you can run using docker

```bash
$ docker build -t file-api .
```

```bash
$ docker run -p 8080:8080 file-api
```
