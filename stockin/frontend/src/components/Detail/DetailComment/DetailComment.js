import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Container } from 'semantic-ui-react';
import CommentList from '../../CommentList/CommentList';
import { postComment } from '../../../store/comment';

const DetailComment = (props) => {
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    dispatch(postComment(props.id, comment));
  };

  return (
    <div className="DetailComment" data-testid="DetailComment">
      DetailComment
      <Form.TextArea value={comment} onChange={(event) => setComment(event.target.value)} />
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
