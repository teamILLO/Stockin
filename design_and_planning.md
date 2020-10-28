# stockin': Design and Planning

## Document Revision History
   Rev. 1.0 YYYY-MM-DD - initial version

## System Architecture<br />
<img src = "https://user-images.githubusercontent.com/59424336/97473797-bb199b00-198e-11eb-8bc3-7718f18359f6.png" width="70%">


***
## Design Details(When finished, erase this)<br />
In this section go those important facets that are not at the level of “architecture,” such as descriptions of critical algorithms, protocols, and key invariants. Also, wherever possible items should be linked back to your specification. Ideally, you can match up everything in the specification with where it is implemented in the design.

We expect that once this document is completed you will split into subteams to implement the various major components. To be ready for such a split, you need to have a precise idea of how the components are interacting, and how you are going to start implementing them. A complete class-level design might not be always possible so early, but you need to specify at least the API among the major components. Use UML when appropriate.

If there are messages sent between clients and servers, you should identify **what messages and what data they contain, and in what format, and in what order they should be sent.**

We expect to see a more refined design for the features to be included in the current sprint, and perhaps a more rough design for the features to be implemented in future sprints.  

If you have considered alternative designs, please describe briefly your reasons for choosing the final design.
***

## Model
This is django-specific model diagram. Actually, since only models we deal with in development are Django ORM ones, we described it in class-like diagram rather than relational UML. 
When representing class relations, three line connected class matches to “many”, one line connected class matches to “one”.
That is, “Group” model and “Stock” model is “many to many” relationship.

![image](https://user-images.githubusercontent.com/26567209/97430265-f9e22d80-195b-11eb-8510-f276bd6b5d18.png)

## View
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
   - If the user clicks on one of the results, he/she is navigated to Detail Page of the corresponding stock.
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
- If you click on My Interests button, brief quadrant chart on information of stocks pre-selected is displayed.
- If you click on My Interests Detail button, detailed chart of pre-selected stocks is displayed.
   -If you click on All button, detailed chart of all the pre-selected stocks is displayed.
   -If you click on a button for specific group, detailed chart of the stocks in the group is displayed.
   -If you click on Edit button, group manager is displayed instead of the chart.
      - If you click on make new group button, you can create a new group.
      - If none of the checkboxes of the stocks is checked, then add to group button is deactivated.
      - If you click on add to group button when activated, checked stocks will be added to the group


## Controller
<img src = "https://user-images.githubusercontent.com/59424336/97441314-edfe6780-196b-11eb-9fb6-6672c8eb5490.jpg" width="70%">


## Implementation Details
### Frontend design
**Write Here**

https://github.com/swsnu/swpp2019-team10/wiki/Design-and-Implementation 참고<br/>

### Backend design
| Model | API | GET | POST | PUT | DELETE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| User | ```api/users/signup ``` | X | Create user | X | X |
| | ``` api/users/signin ``` | X | User login check | X | X |
| | ``` api/users/signout ``` | User logout | X | X | X |
| | ``` api/users/:user_id ``` | Get user info | X | Edit user info | X |
| Group | ``` api/groups/ ``` | Get user's group list | Create group | X | X |
| | ``` api/groups/:group_id ``` | X | X | Update group name | Delete group |
| | ``` api/groups/:group_id/stocks ``` | Get user's all stock | Add stocks | X | X |
| | ``` api/groups/:group_id/stocks/:stock_id ``` | X | X | X | Delete stock |
| Stock | ``` api/stocks/ ``` | Get stock list | X | X | X |
| | ``` api/stocks/:stock_id ``` | Get stock info | X | X | X |
| | ``` api/stocks/history/:stockhistory_date ``` | Get stock history list of date | X | X | X |
| | ``` api/stocks/history/:stockhistory_id ``` | Get specified stockhistory info | X | X | X |
| News | ``` api/news/stock/:stock_id/date/:news_date ``` | Get news list of specified date | X | X | X |
| | ``` api/news/:news_id ``` | Get news info | X | X | X |
| Report | ``` api/reports/date/:report_date ``` | Get report list of specified date | X | X | X |
| | ``` api/reports/date/:report_date/stock/:stock_title ``` | Get report of specified stock & date | X | X | X |
| FinancialStat | ``` api/financialstats/stock/:stock_id ``` | Get financial statement of specified stock | X | X | X |

### User Model
#### ``` api/users/signup ```
- POST
   * request form : ``` {“email”: string, "nickname": string, “password": string} ```
   * response form : ``` {“email”: string, "nickname": string, “password": string} ```
   * KeyError : status 400
   * Success : status 201
- NotAllowedMethod : status 405

#### ``` api/users/signin ```
- POST
   * request form : ``` {“email”: string, "nickname": string, “password": string} ```
   * response form : ``` {“email”: string, "nickname": string, “password": string} ```
   * KeyError : status 400
   * Success : status 201
- NotAllowedMethod : status 405

#### ``` api/users/signout ```
- GET
   * Success : status 204
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/users/:user_id ```
- GET
   * response form : ``` {“email”: string, "nickname": string, “password": string} ```
   * Success : status 200
- PUT
   * require form : ``` {“email”: string, "nickname": string, “password": string} ```
   * response form : ``` {“email”: string, "nickname": string, “password": string} ```
   * KeyError : status 400
   * Success : status 201
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### Group Model
#### ``` api/groups/ ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “user”: string, “name”: string} ```
   * Success : status 200
- POST
   * request form : ``` {“name”: string} ```
   * response form : ``` {“id”: id, “user”: string, “name”: string} ```
   * KeyError : status 400
   * Success : status 204
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/groups/:group_id ```
- PUT
   * request form : ``` {“name”: string} ```
   * response form : ``` {“id”: id, “user”: string, “name”: string} ```
   * KeyError : status 400
   * Success : status 204
- DELETE
   *  NotFound : status 404
   *  Success : status 204
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/groups/:group_id/stocks ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string} ```
   * Success : status 200
- POST
   * request form : ``` {“id”: string} ```
   * response form : ``` {“id”: id, “title”: string} ```
   * KeyError : status 400
   * Success : status 201
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/groups/:group_id/stocks/:stock_id ```
- DELETE
   *  NotFound : status 404
   *  Success : status 204
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### Stock Model
#### ``` api/stocks/ ```
- GET
   * response form : list : each element :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/stocks/:stock_id ```
- GET
   * response form : ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### StockHistory Model
#### ``` api/stocks/history/:stockhistory_date ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “date”:date(“%Y-%m-%d”),  “updown” : integer} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/stocks/history/:stockhistory_stock_id ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “date”:date(“%Y-%m-%d”),  “updown” : integer} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### News Model
#### ``` api/news/stock/:stock_id/date/:news_date ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “date”:date(“%Y-%m-%d”),  “time” : time(%H-%m-%s), “title”: string, “content”:text} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/news/:news_id ```
- GET
   * response form :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “date”:date(“%Y-%m-%d”),  “time” : time(%H-%m-%s), “title”: string, “content”:text} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### Report Model
#### ``` api/reports/date/:report_date ```
- GET
   * response form(list) : each element :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “date”:date(“%Y-%m-%d”),  “rank”: integer, “stockin_score”: integer,  “news_analysis_result”: integer, “content”:text} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

#### ``` api/reports/date/:report_date/stock/:stock_title ```
- GET
   * response form :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “date”:date(“%Y-%m-%d”),  “rank”: integer, “stockin_score”: integer,  “news_analysis_result”: integer, “content”:text} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

### FinancialStat Model
#### ``` api/fiancialstats/stock/:stock_id ```
- GET
   * response form :  ``` {“id”: id, “title”: string, “code”: string, “sector”: string, “price”: integer, “highest_price”: integer, “lowest_price”: integer, “trade_volume”: integer, “trade_value”: integer, “start_price”: integer, “yesterday_price”: integer, “amount”: integer, “is_kospi”: boolean, “quarter”: date(“%Y-%m-%d”), “sales”: integer, “operating_profit”: integer, “net_income”: integer, “operating_margin”: float, “net_profit_margin”: float, “roe”: float, “debt_ratio”: float, “quick_ratio”: float, “reserve_ratio”: float, “eps”: integer, “per”: float, “bps”: integer, “dyr”: float, “dpr”: float} ```
   * Success : status 200
- AuthenticateError : status 401
- NotAllowedMethod : status 405

## Implementation Plan
Break down each user story described in your requirements document into programming tasks. Determine the difficulty of each task, and try to estimate the number of developer-days that the tasks should take. Try to also determine dependencies among tasks. Then, you should list all of the tasks to be done in the current sprint, a preliminary assignment of tasks to people in the group, estimates of the time for each task, dependencies between tasks, and a preliminary division into sprints (e.g., which features are implemented in the first sprint, second sprint, and so on). The plan should be designed to get some prototype system running as quickly as possible and then growing towards to the full project over a sequence of sprints. Please pay extra attention to the dependency relationships between tasks; you will almost certainly run into the situation where one bit isn't done but everything else is waiting for it. In that case, you want to know exactly where resources need to go, and how urgent each bit is (hint: NOT proportional to its size or importance in the whole system).

Try to identify the major risks for the project in general and the plan in particular. Explain what the risks are and discuss how you plan to mitigate them.

| Page | Feature | Difficulty | Sprints | Assignee | Challenges |
|:--------|:--------|:--------|:--------|:--------|:--------|
| Sign up | sign up | 0.5 | 2 | X | |
| Login | ~~log in~~ | 0.5 | 2 | X | |
|  | write here | 0.5 | 2 | X | |
|  | ~~write here~~ | 0.5 | 2 | X | |

## Testing Plan<br />
In this section goes a brief description of how you plan to test the system. Thought should be given to how mostly automatic testing can be carried out, so as to maximize the limited number of human hours you will have for testing your system. The effort you put early on on automated testing will pay off when you have to ensure that you are not breaking existing functionality in future sprints.
Consider the following kinds of testing:

- **Unit testing**: explain for what modules you plan to write unit tests, and what framework you plan to use.<br />
- **Functional testing**: What APIs you plan to test? How will you test them? What tools you will use? Will you write mocks?<br />
- **Acceptance & integration testing**: how do you plan to test the user interface and scenarios?<br />

**Write Here**

***
## Registering Issues<br />
You have to register Github issues regarding tasks for design, implementation, and testing and mark them with milestones.

## Design and planning document grading guidelines<br />
These are the grading guidelines that staff will use to evaluate your document.

| Max points  | Design |
|-------------|--------|
| 8 | Are all parts of the document in agreement with the product requirements? |
| 10 | Is the architecture of the system described, with the major components and their interfaces? |
| 10 | Are all the external interfaces to the system specified in detail? |
| 10 | Are the major internal interfaces (e.g., client-server) specified in detail? |
| 8 | Is there sufficient detail in the design to start Iteration 1? |
| 4 | Is there reasonable detail in the design for features in future iterations? |
| | **Planning** |
| 8 | Is the plan for Iteration 1 sufficiently complete to start the implementation ? |
| 4 | Are the subteams identified and has enough thought been given to parallelization of effort and team dependencies? |
| 4 | Is there a discussion of the risks associated with this plan?  |
| 4 | Are the testing activities scheduled at the appropriate times? |
| | **Testing** |
| 5 | Does the design take into account testability of the various units, components, and subsystems ? |
| 4 | Is there a discussion of how unit testing will be done? |
| 6 | Is there a discussion of how functional (API) testing will be done automatically? |
| 4 | Is there a discussion of how acceptance/integration testing will be done? |
| | **Clarity** |
| 4 | Is the solution at a fairly consistent and appropriate level of detail? |
| 4 | Is the solution clear enough to be turned over to an independent group for implementation and still be understood? |
| 5 | Is the document making good use of semi-formal notation (UML, diagrams, etc) |
| 4 | Is the document identifying common architectural or design patterns, where appropriate? |
| 4 | Is the document carefully written, without typos and grammatical errors? |
***
