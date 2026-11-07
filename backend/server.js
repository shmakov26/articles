require("dotenv").config();
const express = require("express")
const cors = require("cors")
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB connection successful");

        app.listen(PORT, '0.0.0.0', () => {
            console.log("Server is running on port: " + PORT);
        });
    } catch (error) {
        console.error('Unable to connect DB. ' + error);
        process.exit(1);
    }
}

start();