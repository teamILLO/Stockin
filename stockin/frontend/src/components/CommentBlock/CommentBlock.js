import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

const CommentBlock = (props) => {
  return (
    <div className="CommentBlock" data-testid="CommentBlock">
      <Comment.Group>
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{props.author}</Comment.Author>
            <Comment.Metadata>
              <div>{props.time}</div>
            </Comment.Metadata>
            <Comment.Text>{props.content}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
  );
};

export default CommentBlock;
