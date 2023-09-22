const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const events = [];

async function callService(port, event) {
	const baseUrl = `http://localhost:${port}/events`; // For this purpose, we are running the apps in the same machine

	axios.post(baseUrl, event).catch(console.error);
}

app.post('/events', async (req, res) => {
	const event = req.body;

	events.push(event);

	callService(4000, event); // posts
	callService(4001, event); // comments
	callService(4002, event); // query
	callService(4003, event); // moderation

	res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
	res.send(events);
});

app.listen(4005, () => console.log('Running on port 4005'));
