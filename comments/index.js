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

	const newComment = { id: commentId, content, status: 'pending' };

	comments.push(newComment);

	commentsByPostId[postId] = comments;

	await axios.post('http://localhost:4005/events', {
		type: 'CommentCreated',
		data: {
			...newComment,
			postId,
		},
	});

	res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentModerated') {
		const { postId, id, status, content } = data;

		const comments = commentsByPostId[postId];

		const comment = comments.find((comment) => comment.id === id);

		comment.status = status;

		await axios
			.post('http://localhost:4005/events', {
				type: 'CommentUpdated',
				data: {
					id,
					status,
					postId,
					content,
				},
			})
			.catch(console.error);
	}

	res.send({});
});

app.listen(4001, () => console.log('Listening on port 4001'));
