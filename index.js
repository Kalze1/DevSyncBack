const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const mongoose = require('mongoose')
const users = require('./routes/users')
const home = require('./routes/home')
const posts = require('./routes/knowledgeBase')

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use(express.json())


app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/', home)

mongoose.connect('mongodb://127.0.0.1/devsync')
    .then(() => console.log('connected to mongod'))
    .catch(err => console.error('connection to db failed', err))



// createUser()
// getUser()







app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const r = await axios.put(
            'https://api.chatengine.io/users',
            { username: username, secret: username, first_name: username },
            { headers: { "private-key": "b6ef7e92-9d36-4c62-a6cb-d82f678769a4" } }
        )

        return res.status(r.status).json(r.data)
    } catch (e) {

        return res.status(e.response.status).json(e.response.data)
    }

});



app.listen(3001, () => console.log("listening on port 3001"));