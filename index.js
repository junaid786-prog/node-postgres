const express = require('express')
const { Client } = require("pg")

const app = express()

app.get("/", async (req, res) => {
    res.send("Hello World")
})
app.get("/users", async (req, res) => {
    const client = new Client({
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
        database: "dbms"
    })
    let users
    try {
        client.connect()
        users = await client.query("SELECT * FROM users")
    } catch (e) {
        return res.status(500).send("Error while fetching users")
    } finally {
        client.end()
    }
    let a = users?.rowCount
    if (a > 0) {
        res.send(users.rows)
    } else {
        res.send("No users found")
    }
    // get users from database
})
app.get("/save-user", async (req, res) => {
    const client = new Client({
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
        database: "dbms"
    })
    // save user to database
    try {
        client.connect()
        await client.query("INSERT INTO users (name, email) VALUES ($1, $2)", ["junaid", "j@a.com"])
    } catch (e) {
        res.status(500).send("Error while saving user" + e)
    } finally {
        client?.end()
    }
    res.send("User saved")
})
app.get("/ids/:id", async (req, res) => {
    const reqId = req.params.id
    const client = new Client({
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
        database: "dbms"
    })
    // save user to database
    let ids
    try {
        client.connect()
        ids = await client.query("SELECT tid FROM ids WHERE tid = $1", [reqId])
    } catch (e) {
        res.status(500).send("Error while saving user" + e)
    } finally {
        client?.end()
    }
    res.status(200).send("count: " + ids.rowCount)
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})