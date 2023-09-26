import axios from 'axios';
import { useEffect, useState } from 'react';
import { CommentList, Comments } from './CommentList';
import { CommentCreate } from './CommentCreate';

type Post = {
	[key: string]: {
		id: string;
		title: string;
		comments: Comments[];
	};
};

export function PostList() {
	const [posts, setPosts] = useState<Post>({} as Post);

	async function fetchPosts() {
		const response = await axios.get<Post>('http://mini-blog.com/posts');

		setPosts(response.data);
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{Object.values(posts).map((post) => (
				<div
					key={post.id}
					className="card"
					style={{ width: '30%', marginBottom: '20px' }}
				>
					<div className="card-body">
						<h3>{post.title}</h3>

						<CommentList comments={post.comments} />
						<CommentCreate postId={post.id} />
					</div>
				</div>
			))}
		</div>
	);
}
