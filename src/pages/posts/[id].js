import React from "react";

const PostDetails = ({post}) => {
  return <div>{post}</div>;
};

PostDetails.getInitialProps = (context) => ({ post: `Hello ${context.query.id}` });

export default PostDetails;
