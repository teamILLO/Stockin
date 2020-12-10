import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextArea } from 'semantic-ui-react';
import CommentList from '../../CommentList/CommentList';
import { postComment } from '../../../store/comment/comment';
import './DetailComment.css';

const DetailComment = (props) => {
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    const submitComment = comment;
    if (submitComment === '') return;
    dispatch(postComment(props.id, submitComment, user.nickname));
    setComment('');
  };

  return (
    <div className="DetailComment" data-testid="DetailComment">
      <TextArea
        className="commentInput"
        value={comment}
        placeholder="Write your comment here"
        rows="3"
        onChange={(event) => setComment(event.target.value)}
      />
      <Button
        className="mainButton"
        content="Add Comment"
        labelPosition="right"
        icon="write"
        onClick={() => onSubmitHandler()}
      />
      <CommentList stock={props.id} />
    </div>
  );
};

export default DetailComment;
