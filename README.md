# kintone-local-https

# Create SSL certificate

## Install mkcert

### Mac

```
brew install mkcert
```

### Windows

```
choco install mkcert
```

# Generate certificate

```
mkcert -install
cd cert
mkcert --key-file localhost-key.pem  --cert-file localhost.pem localhost 127.0.0.1
```

# Debug

```
npm run dev
```

Set local URL to "App Setting" > "JavaScript and CSS Customization" in kintone.

https://localhost:8080/dist/dev/desktop.js

# Build

```
npm run build
```
