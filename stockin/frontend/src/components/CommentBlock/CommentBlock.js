import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Comment, Form } from 'semantic-ui-react';
import { deleteComment, editComment } from '../../store/comment/comment';
import './CommentBlock.css';

const avatar = [
  'avatar/small/ade.jpg',
  'avatar/small/chris.jpg',
  'avatar/small/christian.jpg',
  'avatar/small/daniel.jpg',
  'avatar/small/elliot.jpg',
  'avatar/small/helen.jpg',
  'avatar/small/jenny.jpg',
  'avatar/small/joe.jpg',
  'avatar/small/justen.jpg',
  'avatar/small/laura.jpg',
  'avatar/small/matt.jpg',
  'avatar/small/nan.jpg',
  'avatar/small/steve.jpg',
  'avatar/small/stevie.jpg',
  'avatar/small/veronika.jpg',
  'avatar2/small/elyse.png',
  'avatar2/small/kristy.png',
  'avatar2/small/lena.png',
  'avatar2/small/lindsay.png',
  'avatar2/small/mark.png',
  'avatar2/small/matthew.png',
  'avatar2/small/molly.png',
  'avatar2/small/patrick.png',
  'avatar2/small/rachel.png',
];

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

  const formatingTime = (time) => {
    let temp = time.split('T');
    let result = temp[0].replace(/-/g, '.') + ' at ';
    let hour = Number(temp[1].substring(0, 2));
    let meridiem = ' AM';
    if (hour >= 12) {
      meridiem = ' PM';
      hour -= 12;
    }
    if (hour === 0) hour = 12;
    result += String(hour) + ':' + temp[1].substring(3, 5) + meridiem;
    return result;
  };

  const buttons =
    user && user.nickname === props.author ? (
      <Comment.Actions>
        <Comment.Action
          data-testid="editButton"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </Comment.Action>
        <Comment.Action data-testid="deleteButton" onClick={() => onDeleteHandler()}>
          Delete
        </Comment.Action>
      </Comment.Actions>
    ) : (
      <Comment.Actions />
    );
  const content = edit ? (
    <Comment className="Comment">
      <Comment.Avatar src={'https://semantic-ui.com/images/' + avatar[user.id % 24]} />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{formatingTime(props.time)}</div>
        </Comment.Metadata>
        <Form.TextArea
          onChange={(event) => setEditContent(event.target.value)}
          placeholder="Write your comment here"
          value={editContent}
        />
        <Button
          data-testid="submitEditButton"
          className="mainBasicButton"
          content="Edit"
          labelPosition="right"
          icon="edit"
          onClick={() => onEditHandler()}
        />
      </Comment.Content>
    </Comment>
  ) : (
    <Comment className="Comment">
      <Comment.Avatar
        src={
          props.author_id
            ? 'https://semantic-ui.com/images/' + avatar[props.author_id % 24]
            : 'https://semantic-ui.com/images/avatar/small/ade.jpg'
        }
      />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{formatingTime(props.time)}</div>
        </Comment.Metadata>
        <Comment.Text>{props.content}</Comment.Text>
        {buttons}
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
