import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { deleteComment, editComment } from '../../store/comment';

const CommentBlock = (props) => {
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(props.content);
  const dispatch = useDispatch();

  const onEditHandler = () => {
    dispatch(editComment(props.id, editContent));
    setEdit(false);
  };

  const onDeleteHandler = () => {
    dispatch(deleteComment(props.id));
  };

  const content = edit ? (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>

        <Form.TextArea
          onChange={(event) => setEditContent(event.target.value)}
          value={editContent}
        />
        <Button
          primary
          content="Edit"
          labelPosition="right"
          icon="edit"
          onClick={() => onEditHandler()}
        />
      </Comment.Content>
    </Comment>
  ) : (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{props.time}</div>
        </Comment.Metadata>
        <Comment.Text>{props.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Comment.Action>
          <Comment.Action onClick={() => onDeleteHandler()}>Delete</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );

  return (
    <div className="CommentBlock" data-testid="CommentBlock">
      <Form>{content}</Form>
    </div>
  );
};

export default CommentBlock;
