function CommentsBox({ comments }) {
  return (
    <div className="comments-box">
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <p>
            <b>{comment.user.username}</b>: {comment.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CommentsBox;