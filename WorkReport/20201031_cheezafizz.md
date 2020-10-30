## Files (Write down on what branch, on what files you have worked on)
- test-frontend:
  - stockin/frontend/package.json
  - stockin/frontend/src/App.js
  - stockin/frontend/src/App.test.js
  - stockin/frontend/src/components/*
  - stockin/frontend/src/containers/*
## Jobs (Write down what you have done)
- installed redux toolkit
- updated react testing library
- fixed all testing codes in `enzyme` to `RTL`
- **I deleted `signup` branch** (It is orignally meant to implement signup but ended up implmenting testing, so contents are moved to `test-frontend`)
## Problems (Write down problems you have experienced)
- It is tricky to test Header because of scrolls and visible options
- In order to query nodes in RTL, you need to give field `data-testid` to every nodes
## Evils (Write down weird things that you have done so that everyone should be careful)
- I fixed some part of the non-testing codes in order to query using `getByTestId` and `queryAllByTestId`
- store is not mocked at `App.test.js`
- history is not properly sent to child nodes even though `<App />` is covered with `<Provider />`
- Thus, currently, you always have to give history everytime child node is called
## Plans (Write down what are you going to do next)
- Try 100% coverage on `Header.js`
- Finish other testing to achieve 90%+ coverage
