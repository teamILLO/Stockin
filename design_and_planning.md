# stockin': Design and Planning

## Document Revision History

Rev. 1.0 2020-10-31 - initial version<br/>
Rev. 1.1 2020-11-10 - additional backend model `Comment`, `Stock`, `StockHistory`<br/>
Rev. 1.2 2020-11-19 - revise backend api & response format

## System Architecture<br />

<img src = "https://user-images.githubusercontent.com/59424336/97679637-de506180-1ad8-11eb-9d7f-f248d3de02b7.png" width="100%">

---

## Model

This is django-specific model diagram. Actually, since only models we deal with in development are Django ORM ones, we described it in class-like diagram rather than relational UML.
When representing class relations, three line connected class matches to “many”, one line connected class matches to “one”.
That is, “Group” model and “Stock” model is “many to many” relationship.

![image](https://user-images.githubusercontent.com/26567209/97522291-c7c7de80-19e2-11eb-8e6e-d7d33c0c5c89.png)

## View

![Untitled Diagram](https://user-images.githubusercontent.com/13393489/97493421-43f10080-19a8-11eb-9371-78c7350ae9c7.png)

#### 0. Headers and footers

##### HEADER

- **HEADER** is composed of **HEADER 1** and **HEADER 2**.
- **HEADER 1** is displayed when user is at the top of the page as a default.
- **HEADER 2** is displayed, when user scrolls down from the top page.

##### HEADER 1

- If the user clicks on the logo image, he/she is navigated to Main Page.
- If the user clicks on Report button, he/she is navigated to Report Page.
- If the user clicks on My Page button, he/she is navigated to My Page.
- If the user clicks on About Us button, he/she is navigated to AboutUs Page.
- If the user clicks on Logout button, he/she is navigated to Prelogin Page.
- If the user enters some text on the search input, related results appear on the bottom.
  - If the user clicks on one of the results, he/she is navigated to Detail Page of the corresponding stock.

##### HEADER 2

- If the user clicks on the logo image, he/she is navigated to Main Page.
- If the user clicks on Report button, he/she is navigated to Report Page.
- If the user clicks on My Page button, he/she is navigated to My Page.
- If the user clicks on Logout button, he/she is navigated to Prelogin Page.
- If the user enters some text on the search input, related results appear on the bottom.
  - If the user clicks on one of the results, he/she is navigated to Detail Page of the

##### FOOTER

- If the user clicks on twitter icon, he/she is navigated to the twitter page of the team.
- If the user clicks on facebook icon, he/she is navigated to the facebook page of the team.
- If the user clicks on linked-in icon, he/she is navigated to the linked-in page of the team.
- If the user clicks on Home button, he/she is navigated to Main Page.
- If the user clicks on Report button, he/she is navigated to Report Page.
- If the user clicks on My Page button, he/she is navigated to My Page.
- If the user clicks on About Us button, he/she is navigated to AboutUs Page.

#### 1. Prelogin page

- Left half lets user sign in with his/her account
  - If the user clicks on Login button, user is navigated to Main Page.
  - If the user clicks on Sign Up button, Sign Up Modal shows up.
- Right half displays introduction of the service
  - Introductory explanation of stockin' is displayed as a default.
  - If the user clicks on STOCKIN button, introductory explanation of stockin' is displayed on the right side.
  - If the user clicks on About us button, brief introduction of team 15 is displayed on the right side.
  - If the user clicks on Preview button, peek view of the service is displayed on the right side.

#### 2. Main Page

- **HEADER 2** is displayed on the top.
- As a default, brief report on the stock market as a whole is displayed below the header.
- Brief report of the few selected stocks is displayed as a clickable component.
- If the user clicks on Daily Report button, brief report on the stock market as a whole is displayed.
  - To-rise stocks are displayed on the top row, and to-fall stocks are displayed on the bottom row.
  - If the user clicks on one of the clickable components, he/she is navigated to corresponding Detail Page.
- If the user clicks on My Interests button, brief report on the selected stocks is displayed.
  - To-rise stocks are displayed on the top row, and to-fall stocks are displayed on the bottom row.
  - If the user clicks on one of the clickable components, he/she is navigated to corresponding Detail Page.
- **FOOTER** is displayed on the bottom.

#### 3. Report Page

- **HEADER** is displayed on the top.
- Right below the header, time when the information was lastly updated is displayed.
- Below the time, as a default, slightly elaborated information about to-rise stocks is displayed.
  - To-rise stocks are sorted in an ascending order of ranking based on scores by ML trained model.
- If the user clicks on To-rise button, slightly elaborated information of stocks estimated to show a rise is shown.
- If the user clicks on To-fall button, slightly elaborated information of stocks estimated to show a fall is shown.
- If the user enters some text on the search input, related results appear on the bottom.
  - If the user clicks on one of the results, slightly elaborated information of corresponding stock is displayed instead of sorted information of stocks in an ascending order.
- If the user clicks on the calendar icon, DatePicker popup shows up, showing current month's calendar.
  - If the user clicks on a certain date, report page of the date is displayed.
  - If the user clicks on the right-arrow button, next month's calendar is displayed on the popup.
  - If the user clicks on the left-arrow button, previous month's calendar is displayed on the popup.
  - If the user clicks on Today button, report page of today is displayed.
- If the user clicks on the following parts of a stock, he/she is navigated to Detail Page of the corresponding stock.
  - name of the stock
  - ranking of the stock
  - graph image of the stock
  - score of the stock
  - news analysis result of the stock
  - text 'noticeable news' of the stock
- **FOOTER** is displayed on the bottom.

#### 4. My Page

- **HEADER** is displayed on the top.
  - At My Page, page scroll is disabled, thus **HEADER 1** is always displayed.
- As a default, brief quadrant chart on information of stocks pre-selected is displayed.
- If the user clicks on My Interests button, brief quadrant chart on information of stocks pre-selected is displayed.
- If the user clicks on My Interests Detail button, detailed chart of pre-selected stocks is displayed.
  - If the user clicks on All button, detailed chart of all the pre-selected stocks is displayed.
  - If the user clicks on a button for specific group, detailed chart of the stocks in the group is displayed.
  - If you click on Edit button, group manager is displayed instead of the chart.
    - If the user clicks on make new group button, you can create a new group.
    - If none of the checkboxes of the stocks is checked, then add to group button and delete button are deactivated.
    - If the user clicks on add to group button when activated, checked stocks will be added to the group
    - If the user clicks on delete button when activated, checked stocks or groups will be deleted from the list.
- If the user clicks on User Information button, brief account information of current user is displayed.
  - If the user clicks on Edit button, he/she can change his/her nickname.
  - If the user clicks on Change Password button, he/she can change his/her password.
  - If the user clicks on Sign Out button, he/she can delete his/her account from the website.

#### 5. Detail Page

- **HEADER** is displayed on the top.
- As a default, breif overview of the stock and a graph image is displayed except for the following cases:
  - When navigated by clicking on the news related parts, news is displayed instead of the overview.
  - When navigated by clicking on the graph related parts, history of prices of the stock is displayed instead of the overview.
  - When navigated by clicking on the financial statement related parts, financial statement is displayed instead of the overview.
- If the user clicks on the star icon,
  - If the star was already colored, corresponding stock is deleted from the groups.
  - If the star was not colored, corresponding stock is added to the groups.
- If the user clicks on Overview button, brief overview of the stock is displayed below the graph.
- If the user clicks on News button, list of titles of news related to the stock is displayed below the graph.
  - If the user clicks on the title of an article, he/she is navigated to the source of the article.
- If the user clicks on Price trends button, history of prices of the stock is displayed.
- If the user clicks on Financial state button, financial statement of the stock and scores of it with comparisons of other average stocks.
- If the user clicks on Comments button, new-comment textarea and comment list for the stock is displayed.
  - Comment list is sorted in recently-created order.
  - If new-comment text area is empty, submit button is disabled.
  - If the user clicks on submit button when enabled, new comment of corresponding content is created.
  - If the user clicks on the number buttons on the bottom of the list, the corresonding page of comment list is displayed.

#### 6. AboutUs Page

- **HEADER 2** is displayed on the top.
- As a default, brief information about the team and the contact info is displayed.

## Controller

<img src = "https://user-images.githubusercontent.com/59424336/97441314-edfe6780-196b-11eb-9fb6-6672c8eb5490.jpg" width="70%">

## Implementation Details

### Frontend design

![frontend_design(1)](https://user-images.githubusercontent.com/54826729/97574073-0b940580-1a2e-11eb-8d97-ebae68a15f56.png)

#### 0. Headers and footers

##### HEADER

- **HEADER** is composed of a logo, Report, MyPage, AboutUs and Logout buttons, and a searchbox.
- Shape of **HEADER** is different depending on its location on the page
  - If **HEADER** is placed at the top of the page, its size is 1440 x 112, hiding AboutUs button
  - Else its size is 1440 x 400

##### FOOTER

- **FOOTER** is composed of a logo, Home, Report, MyPage, AboutUs buttons and a ContactUs component.
  - ContactUs displays information about service providers' contact info.

#### 1. Prelogin Page

- PreloginPage is composed of email and password inputs, signup and login buttons, Stockin, AboutUs and Preview components.
  - signup button triggers modal ModalLogin
  - Stockin, AboutUs, Preview components display information about the service
  - ModalLogin is composed of email, password and nickname inputs and nextButton and loginButton buttons.
    - When nextButton is clicked, email and password inputs disappear and nickname input appears.

#### 2. Main Page

- Main Page is composed of **HEADER** and **FOOTER**, DailyReportTab and MyInterestsTab buttons and DailyReport and MyInterests components.
  - DailyReport and MyInterests are composed of a few StockBox components, and 4 arrow buttons.
    - StockBox component is composed of HalfCircularScore and CircularPercentage components, a revised version of react-circle-progressbar.

#### 3. Report Page

- Report Page is composed of **HEADER** and **FOOTER**, toBuyTab and toSellTab buttons and Calendar, ToBuy and ToSell components.
  - If toBuyTab button is clicked, ToBuy component is displayed.
  - If toSellTab button is clicked, ToSell component is displayed.
  - ToBuy and ToSell components are composed of a few StockDetailBox components.
  - Calendar component displays a calendar, allowing user to choose between dates.
  - StockDetailBox displays various information about the stock.

#### 4. My Page

- My Page is composed of MyPageTabs, MyStocks, MyStocksDetail and UserInformation.
  - MyPageTabs is composed of myInterests, myInterestsDetail and userInfomation buttons.
  - MyStocks is composed of MyStocksTab and Graph components.
    - Further components are well displayed on the flowchart.
  - MyStocksDetail is composed of MyStocksTab and MyStocksTable components.
    - Further components are well displaeyd on the flowchart.
  - UserInformation is composed of edit, changePassword and signOut buttons.
    - Further components are well displayed on the flowchart.

#### 5. Detail Page

- Detail Page is composed of DetailData, DetailNav, DetialOverview, DetailNews, DetailTrends, DetailFinancalState, DetailComment components.
  - Each component represent a tab containing corresponding information except for DetailData and DetailNav.

#### 6. AboutUs Page

- AboutUs Page is composed of AboutUs component displayed in Prelogin Page.

### Backend design

### Backend design
| Model | API | GET | POST | PUT | DELETE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| User | ```api/users/signup/ ``` | X | Create user | X | X |
| | ``` api/users/signin/ ``` | X | User login | X | X |
| | ``` api/users/checklogin/ ``` | User login check | X | X | X |
| | ``` api/users/logout/ ``` | User logout | X | X | X |
| | ``` api/users/signout/ ``` | X | User signout | X | X |
| | ``` api/users/duplicate/ ``` | X | Check signup integrity | X | X |
| | ``` api/users/sendCode/ ``` | X | Send code to user | X | X |
| | ``` api/users/userInfo/ ``` | Get user's info | X | Edit user info | X |
| | ``` api/users/token/ ``` | Get token | X | X | X |
| Stock | ``` api/stocks/ ``` | Get stock list | X | X | X |
| | ``` api/stocks/:stock_id/ ``` | Get stock info | X | X | X |
| | ``` api/stocks/report/up/stockinfo/ ``` | Get stockinfo of top 100 stocks | X | X | X |
| | ``` api/stocks/report/down/stockinfo/ ``` | Get stockinfo of bottom 100 stocks | X | X | X |
| | ``` api/stocks/top10/ ``` | Get top 10 stocks | X | X | X |
| | ``` api/stocks/bottom10/ ``` | Get bottom 10 stocks | X | X | X |
| | ``` api/stocks/financialstats/stock/:stock_id/ ``` | Get financial statement of specified stock | X | X | X |
| | ``` api/stocks/financialstats/score/:stock_id/ ``` | Get financial score of specified stock | X | X | X |
| StockHistory | ``` api/stocks/price/:stock_id/ ``` | Get stock price info | X | X | X |
| | ``` api/stocks/report/up/stockhistory/ ``` | Get stockhistory of top 100 stocks | X | X | X |
| | ``` api/stocks/report/down/stockhistory/ ``` | Get stockhistory of bottom 100 stocks | X | X | X |
| Group | ``` api/groups/ ``` | Get user's group list | Create group | X | X |
| | ``` api/groups/:group_id/ ``` | X | X | Update group name | Delete group |
| | ``` api/groups/:group_id/stocks/ ``` | Get user's all stock | Add stocks | X | X |
| | ``` api/groups/:group_id/stocks/:stock_id/ ``` | X | X | X | Delete stock |
| Comment | ``` api/stocks/:stock_id/comments/  ``` | Get stock's comment list   | Create comment | X | X |
| | ``` api/comments/:comment_id/  ``` | Get a comment | X | Edit comment | Delete comment |
| News | ``` api/news/stock/:stock_id/date/:news_date/ ``` | Get news list of specified date | X | X | X |
| | ``` api/stocks/report/up/news/ ``` | Get news of top 100 stockss | X | X | X |
| | ``` api/stocks/report/down/news/ ``` | Get news of bottom 100 stocks  | X | X | X |


### User Model
#### ``` api/users/signup/ ```
- POST
   * request form : ``` {“email”: string, "nickname": string, "id": id} ```
   * response form : ``` {“email”: string, "nickname": string, "id": id} ```
   * IntegrityError : status 406
   * Success : status 201
- NotAllowedMethod : status 405

#### ``` api/users/signin/ ```
- POST
   * request form : ``` {“email”: string, "nickname": string, "id": id} ```
   * response form : ``` {“email”: string, "nickname": string, "id": id} ```
   * KeyError : status 400
   * AuthenticateError : status 401
   * Success : status 201
- NotAllowedMethod : status 405

#### ``` api/users/checklogin/ ```
- GET
   * response form : ``` {“email”: string, "nickname": string, "id": id} ```
   * AuthenticateError : status 401
   * Success : status 201
- NotAllowedMethod : status 405

#### ``` api/users/logout/ ```
- GET
   * Success : status 204
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/users/signout/ ```
- POST
   * resquest form : ``` {“email”: string, “password": string} ```
   * KeyError : status 400
   * AuthenticateError : status 401
   * Success : status 204
- NotAllowedMethod : status 405

#### ``` api/users/duplicate/ ```
- POST
   * resquest form : ``` {“email”: string, "nickname": string} ```
   * response form : ``` {“duplicate”: boolean} ```
   * Success : status 203
- NotAllowedMethod : status 405

#### ``` api/user/sendCode/```
- POST
   * requset form : ``` {“email”: string, “code”: integer} ```
   * Sucess : status 204
- NotAllowedMethod : status 405

#### ``` api/users/userInfo/ ```
- GET
   * response form : ``` {“email”: string, "nickname": string, "id": id} ```
   * Success : status 203
- PUT
   * request form : ``` {“change”: string, "email": string, “nickname": string} or {“change”: string, "email": string, “password": string}  ```
   * response form : ``` {“email”: string, "nickname": string, "id": id} ```
   * KeyError : status 400
   * Success : status 201
   * NotFound : status 404
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/users/token/ ```
- GET
   * Success : status 204
- NotAllowedMethod : status 405

### Stock Model
#### ``` api/stocks/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/:stock_id/ ```
- GET
   * response form : ``` {“title”: string, “code”: string, “sector”: string, “price”: integer, “highestPrice”: integer, “lowestPrice”: integer, “tradeVolume”: integer, “tradeValue”: integer, “startPrice”: integer, “yesterdayPrice”: integer, “amount”: integer, “isKOSPI”: boolean, "saleGrowthRate": string, "saleGrowthRate": string, "saleGrowthRateAvg": string, "operatingMarginRate": string, "operatingMarginRateAvg": string, "crawledPER": string, "crawledPERAvg": string, "debtRatio": string, "score": integer} ```
   * Success : status 203
- NotAllowedMethod : status 405

#### ``` api/stocks/report/up/stockinfo/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, "rank": integer, “title”: string, “isKOSPI”: boolean, “code”: string, “price”: integer, “yesterdayPrice”: integer, "score": integer} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/report/down/stockinfo/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, "rank": integer, “title”: string, “isKOSPI”: boolean, “code”: string, “price”: integer, “yesterdayPrice”: integer, "score": integer} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/top10/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, "score": integer} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/bottom10/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, "score": integer} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/fiancialstats/stock/:stock_id/ ```
- GET
   * response form(list) : each element :  ``` {"id": id, "stock_id": integer, "quarter" : string, "sales" : string, "operatingProfit": string, "netIncome": string, "operatingMargin": string, "netProfitMargin": string, "PER" : string, "PBR": string, "ROE": string} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/fiancialstats/score/:stock_id/ ```
- GET
   * response form :  ``` {"score": integer} ```
   * Success : status 200
- NotAllowedMethod : status 405

### StockHistory Model
#### ``` api/stocks/price/:stock_id/ ```
- GET
  - response form(list) : each element : `{“stock" : stock_id, "date" : string, "open" : integer, "high" : integer, "low": integer, "close": integer, "volume": integer}`
  - Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/report/up/stockhistory/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, "stockhistory": [{“date”: date(“%Y-%m-%d”), "endPrice": integer, "tradeVolume": integer}]} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/report/down/stockhistory/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, "stockhistory": [{“date”: date(“%Y-%m-%d”), "endPrice": integer, "tradeVolume": integer}, ...]} ```
   * Success : status 200
- NotAllowedMethod : status 405

### Group Model
#### ``` api/groups/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “user”: string, “name”: string, "stocks": [{"id": id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highestPrice”: integer, “lowestPrice”: integer, “tradeVolume”: integer, “tradeValue”: integer, “startPrice”: integer, “yesterdayPrice”: integer, “amount”: integer, “isKOSPI”: boolean, "score": integer, "fs_score": integer}, ...] } ```
   * Success : status 200
- POST
   * request form : ``` {“name”: string} ```
   * response form : ``` {“id”: id, “user”: string, “name”: string} ```
   * KeyError : status 400
   * Success : status 201
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/groups/:group_id/ ```
- PUT
   * request form : ``` {“name”: string} ```
   * response form : ``` {“id”: id, “user”: string, “name”: string} ```
   * NotFound : status 404
   * InvalidUser : status 403
   * KeyError : status 400
   * Success : status 200
- DELETE
   * NotFound : status 404
   * InvalidUser : status 403
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/groups/:group_id/stocks/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string} ```
   * NotFound : status 404
   * InvalidUser : status 403
   * Success : status 200
- POST
   * request form : ``` {“id”: string} ```
   * response form : ``` {“id”: id, “title”: string} ```
   * NotFound : status 404
   * InvalidUser : status 403
   * KeyError : status 400
   * StockAlreadyExists : status 204
   * Success : status 201
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/groups/:group_id/stocks/:stock_id/ ```
- DELETE
   *  NotFound : status 404
   *  Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### Comment Model
#### `api/stocks/:stock_id/comments/`
- GET
  - response form : list : each element : `{"id": id of comment, “stock”: id of stock, "time": DateTime, "content": string, "author": string, "author": string, "author_id": integer}`
  - Success : status 200
- DoesNotExistError : status 404
- NotAllowedMethod : status 405
- POST
  - response form : list :  `{"id": id of comment, “stock”: id of stock, "time": DateTime, "content": string, "author": string, "author": string, "author_id": integer}`
  - KeyError : status 400
  - Success : status 201
- DoesNotExistError : status 404
- NotAllowedMethod : status 405

#### `api/comments/:comment_id/`
- GET
  - response form : list :  `{"id": id of comment, “stock”: id of stock, "time": DateTime, "content": string, "author": string, "author": string, "author_id": integer}`
  - Success : status 200
- DoesNotExistError : status 404
- NotAllowedMethod : status 405
- PUT
  - response form : list :  `{"id": id of comment, “stock”: id of stock, "time": DateTime, "content": string, "author": string, "author": string, "author_id": integer}`
  - KeyError : status 400
  - Success : status 200
- DoesNotExistError : status 404
- NotAllowedMethod : status 405

### News Model
#### ``` api/news/stock/:stock_id/date/:news_date/ ```
- GET
   * response form(list) : each element :  ``` {"id" : id, "title" : string, "press" : string, "link" : string, "date" : string(YYYY-MM-DD)} ```
   * Success : status 200
- NotAllowedMethod : status 405

#### ``` api/stocks/report/up/news/ ```
- GET
   * response form(list) : each element :  ``` {"id" : id, 'news': [{"id" : id, "title" : string, "press" : string, "link" : string, "date" : string(YYYY-MM-DD)}, ...]} ```
   * Success : status 200
- NotAllowedMethod : status 405


#### ``` api/stocks/report/down/news/ ```
- GET
   * response form(list) : each element :  ``` {"id" : id, 'news': [{"id" : id, "title" : string, "press" : string, "link" : string, "date" : string(YYYY-MM-DD)}, ...]} ```
   * Success : status 200
- NotAllowedMethod : status 405




## Implementation Plan

| Page          | Feature                     | Difficulty | Sprints | Challenges     | Assignees      |
| :------------ | :-------------------------- | :--------- | :------ | :------------- | :------------- |
| Pre-login     | sign in                     | 1          | 2       |                | Woo0, Junhyeok |
| Pre-login     | sign up                     | 1          | 2       |                | Woo0, Junhyeok |
| Pre-login     | forget password             | 3          | 4       | Daun, G1       |
| Pre-login     | about stockin               | 0.5        | 5       | Daun, G1       |
| Main          | load stocks by ranking      | 3          | 5       | Woo0, Daun     |
| Main          | load stocks in interests    | 3          | 5       | Woo0, Daun     |
| Report page   | load stocks by ranking      | 2          | 4       | G1, Junhyeok   |
| Detail page   | load stock detail           | 1.5        | 4       | G1, Junhyeok   |
| Detail page   | make graph                  | 3          | 4       | Woo0, G1       |
| Detail page   | add stock to interests      | 1          | 3       | Daun, Junhyeok |
| Detail page   | add or delete comments      | 2          | 3       | Daun, G1       |
| My page       | load Interests' information | 2          | 3       | G1, Junhyeok   |
| My page       | edit group                  | 3          | 5       | Daun, G1       |
| My page       | edit user information       | 1          | 3       | Woo0, Junhyeok |
| About Us page | about stockin               | 0.5        | 5       | Junhyeok       |
| Header        | search stocks               | 2          | 3       | Woo0, G1       |
|               | **set up an ML model**      | 5          | 3,4     | Daun, Junhyeok |
|               | **train model**             | 4          | 3,4     | Daun, Junhyeok |
|               | **set up an ML pipeline**   | 5          | 3,4     | Daun, Junhyeok |

- Dependencies
  - `load stocks by ranking` depends on `ML tasks`
  - `make graph` depends on `ML tasks`
- Risks

1. ML does not show high performance
   > We can try completing service with low-performance model and work on performance simultaneously
2. Our IP might be banned from the API source
   > We should try to limit calls from API to a certain amount

## Testing Plan<br />

- **Unit testing**<br />Every component, reducer, and module should be tested automatically. We will test frontend(react, redux) with Jest and React testing library, and backend(django) with python unit test. These tests should reach 80% coverage.<br />

- **Functional testing**<br />Every API should be tested. We will test frontend(react, redux) with Jest and Enzyme, and backend(django) with python unit test. These tests should reach 80% coverage.<br />

- **Acceptance & integration testing**<br />All user stories should be covered. We will use travis CI for integration test.<br />
