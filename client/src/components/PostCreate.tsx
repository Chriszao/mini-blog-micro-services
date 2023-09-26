import axios from 'axios';
import { useState } from 'react';

export function PostCreate() {
	const [title, setTitle] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await axios.post('http://mini-blog.com/posts', {
			title,
		});

		setTitle('');
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						value={title}
						className="form-control"
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>

				<button type="submit" className="btn btn-primary mt-2">
					Submit
				</button>
			</form>
		</div>
	);
}
