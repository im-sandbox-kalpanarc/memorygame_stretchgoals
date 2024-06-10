// Server-side code (Express.js)
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());

app.options('*', cors());
app.use(cors());

app.post('/api/savePlayerGame', cors(), (req, res) => {
    const data = req.body;
    console.log("Payload data", data);
    try {
        const filePath = path.join(__dirname, '../src/data/game_data.json');
        let existingData = [];

        // Check if file exists before reading
        if (fs.existsSync(filePath)) {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        existingData.push(data);
        console.log(existingData);
        console.log("Initiating write to file");

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
        res.status(200).send({ message: "Data saved successfully", data: existingData });
    } catch (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send({ error: err.message });
    }
});

app.get('/api/test', (req, res) => {
    res.send('Server is running properly');
});

app.get('/api/getGame', (req, res) => {
    const filePath = path.join(__dirname, '../src/data/game_data.json'); // Use path.join here too
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        const gameData = JSON.parse(data);
        res.send(gameData);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
