import axios from 'axios';
import { useState } from 'react';

export function CommentCreate({ postId }: { postId: string }) {
	const [content, setContent] = useState('');

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await axios.post(`http://posts.com/posts/${postId}/comments`, {
			content,
		});

		setContent('');
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="content">New Comment</label>
					<input
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="form-control"
						id="content"
					/>
				</div>

				<button className="btn btn-primary mt-2">Submit</button>
			</form>
		</div>
	);
}
