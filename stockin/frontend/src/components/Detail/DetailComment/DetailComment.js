import React from 'react';
import CommentList from '../../CommentList/CommentList';

const DetailComment = (props) => {
  return (
    <div className="DetailComment" data-testid="DetailComment">
      DetailComment
      <CommentList stock={props.id} />
    </div>
  );
};

export default DetailComment;
