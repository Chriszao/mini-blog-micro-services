const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	const { id: postId } = req.params;

	res.send(commentsByPostId[postId] ?? []);
});

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');

	const { id: postId } = req.params;
	const { content } = req.body;

	const comments = commentsByPostId[postId] ?? [];

	comments.push({ id: commentId, content });

	commentsByPostId[postId] = comments;

	await axios.post('http://localhost:4005/events', {
		type: 'CommentCreated',
		data: {
			id: commentId,
			content,
			postId,
		},
	});

	res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	console.log('Received Event:', type);

	res.send({});
});

app.listen(4001, () => console.log('Listening on port 4001'));
