const express = require('express');
const PORT = process.env.PORT || 5000;

class Server {
    app = express();
    start() {
        try {
            this.app.listen(PORT, () => {
                console.log(`server start on port ${PORT}`);
            });
            this.addMiddleware();
        } catch (e) {
            console.log(e);
        }
    }

    addMiddleware() {
        this.app.use(express.json());
    }
}

new Server().start();