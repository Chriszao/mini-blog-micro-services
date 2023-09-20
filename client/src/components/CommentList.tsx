import axios from 'axios';
import { useEffect, useState } from 'react';

type Comments = {
	id: string;
	content: string;
};

export function CommentList({ postId }: { postId: string }) {
	const [comments, setComments] = useState<Comments[]>([]);

	const fetchData = async () => {
		const res = await axios.get(
			`http://localhost:4001/posts/${postId}/comments`,
		);

		setComments(res.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const renderedComments = comments.map((comment) => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderedComments}</ul>;
}
