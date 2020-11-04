## Files (Write down on what branch, on what files you have worked on)
- comment:
  - stockin/frontend/src/components/CommentBlock/CommentBlock.js
  - stockin/frontend/src/components/CommentList/CommentList.js
  - stockin/frontend/src/components/Detail/DetailComment/DetailComment.js
  - stockin/frontend/src/containers/DetailPage/DetailPage.js
  - stockin/frontend/src/store/authentication.js
  - stockin/frontend/src/store/comment.js
  - design_and_planning.md
  - stockin/backend/apps/comments/tests.py
  - stockin/backend/apps/comments/views.py

## Jobs (Write down what you have done)
- implemented delete/add features of comments
- modified views of Comment to send comment_id on GET request
- deleted 401 and 403 httpresponse, due to User inconsistency on react
- commented out corresponding test codes
- updated D&P

## Evils (Write down weird things that you have done so that everyone should be careful)
- CSRF is BS
- temporarily added @csrf_exempt to some views to check backend connection

## Plans (Write down what are you going to do next)
- Check delete is working properly
- Hide edit/delete buttons to unauthorized users
- Add textarea for new comment create
