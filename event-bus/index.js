const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const events = [];

async function callService(serviceDomain, event) {
	const baseUrl = `http://${serviceDomain}/events`;

	axios.post(baseUrl, event).catch(console.error);
}

app.post('/events', async (req, res) => {
	const event = req.body;

	events.push(event);

	callService('posts-clusterip-srv:4000', event);
	callService('comments-srv:4001', event);
	callService('query-srv:4002', event);
	callService('moderation-srv:4003', event);

	res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
	res.send(events);
});

app.listen(4005, () => console.log('Running on port 4005'));
