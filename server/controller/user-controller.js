const db = require("../db");
const bcrypt = require("bcryptjs");
const dateConvert = require("../helpers/dateConvert");

class UserController {
    async getUsers(req, res) {
        try {
            const user = await db.query("SELECT * FROM users ORDER BY id ASC");
            return res.json(user.rows);
        } catch (e) {
            console.log(e);
        }
    }

    async updateLastLogDate(req, res) {
        try {
            const email = req.body.email; 
            const date = dateConvert.getToday();
            await db.query('UPDATE users SET last_log_date = ($1) WHERE email = ($2)', [date, email]);
            return res.json('Date updated');
        } catch(e) {
            return res.status(400).json({message: 'Date update error'});
        }
    }

    async signIn(req, res) {
        try {
            const email = await req.body.email;
            const password = await req.body.password;
            const user = await db.query(
                "SELECT * FROM users where email = $1",
                [email]
            );
            if (user.rowCount === 0) return res.status(400).json({ message: "User not found" });
            const isRightPassword = await bcrypt.compare(
                password,
                user.rows[0].password_hash
            );
            if (!isRightPassword) return res.status(400).json({ message: "Wrong password" });
            return res.json("ok");
        } catch (e) {
            console.log(e);
        }
    }

    async signUp(req, res) {
        try {
            const email = await req.body.email;
            const password = await req.body.password;
            const name = await req.body.name;
            const passwordHash = bcrypt.hashSync(password, 7);
            const date = dateConvert.getToday();
            await db.query(
                "INSERT INTO users(name, email, reg_date, last_log_date, status, password_hash) VALUES ($1, $2, $3, $4, $5, $6)",
                [name, email, date, date, "active", passwordHash]
            );
            return res.json("ok");
        } catch (e) {
            const duplicateError = "23505";
            if ((e.code = duplicateError)) {
                console.log(e);
                res.status(400).json({
                    message: "This email is already taken",
                });
            } else {
                res.status(400).json({ message: "Registration error" });
            }
        }
    }

    async updateStatus(req, res) {
        try {
            const email = req.body.email; 
            const newStatus = req.body.status;
            await db.query('UPDATE users SET status = ($1) WHERE email = ($2)', [newStatus, email]);
            return res.json('Status updated');
        } catch(e) {
            return res.status(400).json({message: 'Status update error'});
        }
    }
}

module.exports = new UserController();
