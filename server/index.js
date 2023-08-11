const express = require('express');
const PORT = process.env.PORT || 5000;
require('./db');
require('pg');
const router = require('./routes/user-routes');
const cors = require('cors');

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
        this.app.use(cors({
            origin: 'https://brilliant-licorice-cc6be1.netlify.app',
        }));
        this.app.use(express.json());
        this.app.use('/api', router);
    }
}

new Server().start();