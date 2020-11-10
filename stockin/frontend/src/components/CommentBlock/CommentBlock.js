import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { deleteComment, editComment } from '../../store/comment';

const CommentBlock = (props) => {
  const { user } = useSelector((state) => state.authentication);
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

  const buttons =
    user && user.id == props.author ? (
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
    ) : (
      <Comment.Actions />
    );
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
        {buttons}
      </Comment.Content>
    </Comment>
  );

  return (
    <div className="CommentBlock" data-testid="CommentBlock">
      {console.log(user)}
      {console.log(props)}
      <Form>{content}</Form>
      <p>{user.nickname}</p>
      <p>{props.author}</p>
    </div>
  );
};

export default CommentBlock;
