import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import CommentList from '../../CommentList/CommentList';
import { postComment } from '../../../store/comment/comment';

const DetailComment = (props) => {
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    dispatch(postComment(props.id, comment, user.nickname));
  };

  return (
    <div className="DetailComment" data-testid="DetailComment">
      DetailComment
      <Form.TextArea
        value={comment}
        placeholder="Write your comment here"
        onChange={(event) => setComment(event.target.value)}
      />
      <Button
        primary
        content="Submit"
        labelPosition="right"
        icon="write"
        onClick={() => onSubmitHandler()}
      />
      <CommentList stock={props.id} />
    </div>
  );
};

export default DetailComment;
