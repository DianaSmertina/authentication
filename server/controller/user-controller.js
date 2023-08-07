const db = require('../db');

class UserController {
    async getUsers(req, res) {
        try {
            const user = await db.query('SELECT * FROM users ORDER BY id ASC');
            return res.json(user.rows);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();