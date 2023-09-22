export type Comments = {
	id: string;
	content: string;
	status: 'approved' | 'pending' | 'rejected';
};

export function CommentList({ comments }: { comments: Comments[] }) {
	const renderedComments = comments.map((comment) => {
		let content: string = '';

		if (comment.status === 'approved') {
			content = comment.content;
		}

		if (comment.status === 'pending') {
			content = 'This comment is awaiting moderation';
		}

		if (comment.status === 'rejected') {
			content = 'This comment has been rejected';
		}

		return <li key={comment.id}>{content}</li>;
	});

	return <ul>{renderedComments}</ul>;
}
