export type Comments = {
	id: string;
	content: string;
};

export function CommentList({ comments }: { comments: Comments[] }) {
	const renderedComments = comments.map((comment) => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderedComments}</ul>;
}
