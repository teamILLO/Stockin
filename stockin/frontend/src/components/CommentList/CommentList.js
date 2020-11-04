import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Comment } from 'semantic-ui-react';
import { getCommentList } from '../../store/comment';

const CommentList = (props) => {
  const { commentList } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(getCommentList(props.stock));
  });*/
  return (
    <div className="CommentList" data-testid="CommentList">
      <Comment.Group>
        {commentList.map((comment) => (
          <CommentBlock author={comment.author} time={comment.time} content={comment.content} />
        ))}
      </Comment.Group>
    </div>
  );
};

export default CommentList;
