### Development

```
npm run start
```

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

### Build Docker Image

```
docker build -f Dockerfile -t healthcheck-ui .
```

### Run Docker Image

```
docker run --publish 3000:3000 --name healthcheck-ui healthcheck-ui
```
