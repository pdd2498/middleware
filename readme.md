### README.md

# Express Logging Middleware 

This project demonstrates an Express application with a custom logging middleware. The middleware logs information about each incoming request, including the HTTP method, the requested URL, the timestamp, and the time taken to process the request.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   node index.js
   ```

## Application Structure

- **index.js**: Main application file that sets up the Express server, includes the custom middleware, and defines the routes.
- **assis.log**: Log file where the request details and processing times are saved.

## Middleware Details

### myMiddleware

The `myMiddleware` function captures and logs the following information about each incoming request:
- HTTP method
- Requested URL
- Timestamp of the request
- Processing time for the request

The middleware logs these details to both the console and a log file named `assis.log`.

### Implementation

```javascript
const express = require("express");
const app = express();
const fs = require("node:fs");

const myMiddleware = (req, res, next) => {
    const startTime = Date.now();
    console.log(req.url, "at", new Date(), req.method);

    res.on('finish', () => {
        const endTime = Date.now();
        const processingTime = endTime - startTime;
        const logEntry = `Request processed: [${new Date()}] ${req.method} ${req.url} - Processing time: ${processingTime}ms\n`;
        fs.appendFileSync("assis.log", logEntry);
        console.log(`${req.method} ${req.url} - Processing time: ${processingTime}ms`);
    });

    next();
};

app.use(myMiddleware);
```

## Routes

### `GET /user/app/:id`

This route fetches user data based on the `id` parameter. The data is returned in JSON format if a matching user is found.

#### Example Request

```bash
curl http://localhost:6060/user/app/1
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "preyesh"
  }
}
```

## Sample Data

The application uses a sample dataset of users:

```javascript
const product = [
  { id: 1, name: "preyesh" },
  { id: 2, name: "diwan" },
  { id: 3, name: "dhar" }
];
```

## Starting the Server

Run the following command to start the server:

```bash
node index.js
```

The server will start on port 6060. You should see the following message in the console:

```
preyrsh dhar diwan
```

## Logging

Logs are written to a file named `assis.log` in the project directory. Each log entry includes the request details and the time taken to process the request.

## Author

Preyesh Dhar Diwan
