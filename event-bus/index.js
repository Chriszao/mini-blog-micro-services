const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

async function callService(port, event) {
	const baseUrl = `http://localhost:${port}/events`; // For this purpose, we are running the apps in the same machine

	axios.post(baseUrl, event).catch(console.error);
}

app.post('/events', async (req, res) => {
	const event = req.body;

	callService(4000, event);
	callService(4001, event);
	callService(4002, event);

	res.send({ status: 'OK' });
});

app.listen(4005, () => console.log('Running on port 4005'));
