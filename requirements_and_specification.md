# stockin': Requirements and Specification


## Document Revision History
   Rev. 1.0 2020-10-17 - initial version

## Project Abstract<br />
**stockin'** is a service that provides customers with a quick, at-a-glance organized information about stocks. Customers are investors who have a difficult time selecting good stocks overwhelmed by tremendous amount of stock information. The service analyzes graphs and financial statements and converts them into scores for easy visual viewing, allowing customers to choose stocks that are good to invest without spending much time on.
In addition, **stockin'** will not only provide predicted information about future stock prices, but will also provide information created in the past to give users credibility. It will attract many customers by providing not only the score created by the service, but also raw objective data and a feature to communicate with other users.


## **Customer**<br />
In general,

 * people who are going to buy or sell stocks
 
More specifically, 

 * people who want to see the stock price graph, price fluctuation table, stock statement, and news information of the stock
 * people who want to see the results of graph & news analysis
 * people who want to know the score of stock calculated by graph & news analysis
 * people who would like to see recommendation based on the score of the stocks
 
can be our potential customers.

## **Competitive Landscape**<br />  
* **Market Competitors**

  * **Kosho**
    * An application-based platform that learns from past stock price changes and predicts future stock price changes
    * Provides past stock price changes similar to the present as the basis for stock price change forecast
    * For certain stocks, stock price change prediction is free, but stock recommendation is provided with a subscription fee

  * **Aim** 
    * Provides investment portfolio that reflects investors' propensity to invest (e.g. asset composition, risk tolerance)
    * Similar form to a fund, an investor's capital is distributed by allocating assets to stocks, bond, etc.
    * No detailed investment information is provided to investors

  * **증권플러스** 
    * Provides basic graph of stock, and a summary of the rate of fluctuation
    * Provides news that may affect the entire stock market and news that is related to specific stocks
    * Instead of relying on AI, information is provided by the user's participation
    * Provides stock trade information of high-yield users and their recommendations for a fee

* **Our Strength**

  * Our services do not delegate investment. User directly does the investing.
The goal of our service is to efficiently provide all the information that can help user’s investment.

  * Our service does not show information abstractly. Rather, it provides all the information of the graph and news analyzed through machine learning.

  * The basic information of stocks is provided by both summary and detail. Through this, user can reduce the amount of time spent searching for stock-related information.

  * Based on the information analyzed through machine learning, stocks are scored and recommended through those scores.

## User Stories  
### Pre-login page 
> **Story 1**
> > **Feature:** User wants to sign in
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered and logged out
> >  
> > **Trigger:** User clicks on the "Login" button
> >  
> > **Scenario:**
> > ```
> > 1. User enters own email and password
> > 2. User clicks on the “Login” button
> > 3. If email and password is valid, User should be logged in and redirected to the main page - (1)
> > ```
> > **Exceptions:** 
> > ```
> > (1) When user enters wrong email/password and clicks on the "Login" button, warning message must be appeared.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user enters email/password and clicks on the "Login" button
> > Then user should be logged in
> > And user should be redirected to main-page
> > ```
> > **Sprint: 2**
>
> **Story 2**
> > **Feature:** User wants to sign up
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be unregistered and logged out
> >  
> > **Trigger:** User clicks on the “Sign Up” button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “Sign Up” button
> > 2. “Sign Up” pop-up activates
> > 3. User enters the email/password which user wants to use
> > 4. User makes his/her own email and “Sign Up” pop-up disappears - (1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) User can't use email which already exists
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks on “Sign Up” button
> > Then “Sign Up” pop-up should be appeared
> >
> > When the user enters email user wants to make and clicks on the “OK” button
> > Then “Sign Up” pop-up should be disappeared and new member information should be created
> > ```
> > **Sprint: 2**  
>
> **Story 3**
> > **Feature:** User wants to know more about our service
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be logged-out and in Pre-login Page
> >  
> > **Trigger:** User scrolls
> >  
> > **Scenario:**
> > ```
> > 1. User sees overview information of our service on
> > 2. User can scroll page and see more information according to the degree of scrolling - (1) (2)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user reaches the end of list and scrolls down
> > (2) Nothing happens when user reaches the top of list and scrolls up
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user accesses the site without login
> > Then Pre-login Page should show the overview information of our service
> > 
> > When the user clicks on “About Us” or “Preview” tab
> > Then Pre-login Page should render the information corresponding to the tab
> > ```
> > **Sprint: 2**
>
> **Story 4**
> > **Feature:** User forgets email or password and wants to find it
> >
> > **Actors:** Any users
> >
> > **Precondition:** The user must be registered and logged out
> >
> > **Trigger:** User clicks on the “Find Email/Password" button
> >
> > **Scenario:**
> > ```
> > 1. User clicks on the "Find Email/Password" button
> > 2. User enters his/her information and finds email/password - (1), (2)
> > 3. After that, user can login to the webpage
> > ```
> >
> > **Exceptions:** 
> > ```
> > (1) When user tries to find email/password which doesn't existed, user should be noticed that it doesn't exist.
> > (2) When user enters wrong his/her information, user should be noticed that it is wrong.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks on the "Find Email/Password" button and enters correct information
> > Then user can know his/her email/password information
> > ```
> > **Sprint: 2**

### Post-login page (Main page)
> **Story 1**
> > **Feature:** User wants to surf among top 5 predicted-to-rise/predicted-to-fall stocks without redirection
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the right-pointing/left-pointing arrow placed inside the tab
> >  
> > **Scenario:**
> > ```
> > 1. The page at first does not show all 5 stocks due to lack of space
> > 2. User wants to see differently ranked predictions, so clicks the button - (1) (2)
> > 3. User now can see a sigle new prediction on the right/left that was previously hidden due to lack of space and no longer can see the previously leftmost/rightmost prediction - (3)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) When the 1st ranked prediction is at sight, the left-pointing button does not appear.
> > (2) When the show-more button is at sight, the right-pointing button does not appear.
> > (3) When the 5th ranked prediction is at the rightmost part, the show-more button appears.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that the user is not currently seeing the leftmost or rightmost prediction of the list
> > When the user clicks left-pointing/right-pointing button
> > Then user should see new prediction in left/right direction that was hidden previously
> > ```
> > **Sprint: 4**
>
> **Story 2**
> > **Feature:** User wants to see more highly scored stocks by being redirected to Recommendation Page 
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Show-more" button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks the show-more button
> > 2. User gets redirected to Recommendation Page
> > 3. Depending on which show-more button is clicked, tab to be initially selected on Recommendation Page will be decided.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that user is at the rightmost part of the list
> > When the user clicks the show-more button
> > Then user should be redirected to Recommendation Page
> > And the tab in the Recommendtion Page should be properly active regarding to which show-more button is clicked on
> > ```  
> > **Sprint: 4**
>
> **Story 3**
> > **Feature:** User wants to get more information about the stock by clicking the stock
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the stock that he/she wants to get more information about
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on one of the top 5 stocks
> > 2. User gets redirected to Detail Page of the corresponding stock
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks the stock that he/she wants to get more information about
> > Then user should be on Detail Page of the corresponding stock
> > ```  
> > **Sprint: 4**
>
> **Story 4**
> > **Feature:** User wants to switch between Daily Report tab and My Interests tab
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Daily Report" or "My Interests" tab
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the "Daily Report" or "My Interests" tab
> > 2. Daily Report/My Interests tab is activated - (1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when the target tab is the same as current tab
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that the target tab is different from current tab
> > When the user clicks the target tab
> > Then the target tab should be activated
> > ```  
> > **Sprint: 4**
>
> **Story 5**
> > **Feature:** User wants to go to My Page anytime
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Mypage" button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the "Mypage" button
> > 2. User gets redirected to My Page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks the mypage button
> > Then the user should be redirected to My Page
> > ```  
> > **Sprint: 2**
>
> **Story 6**
> > **Feature:** User wants to logout anytime
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Logout" button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the "Logout" button
> > 2. User gets redirected to Pre-login Page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks the mypage button
> > Then the user should be on My Page
> > ```  
> > **Sprint: 2**
>
> **Story 7**
> > **Feature:** User wants to search for recently searched stock
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the name of one of the recently searched stocks
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the "Search" input
> > 2. User sees what he/she recently searched - (1)
> > 3. User clicks on the name of the stock
> > 4. User gets redirected to the Detail Page of the corresponding stock
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens if the user has no history of searching
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that the user has history of searching
> > When the user clicks on the "Search" input
> > Then theser should see what he/she has recently searched
> >   
> > When the user clicks on the name of one of the recently searched stocks
> > User should be on Detail Page of the corresponding stock
> > ```  
> > **Sprint: 3**
>
> **Story 8**
> > **Feature:** User wants to search for a specific stock they want to get information about
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the name of the stock of one of the suggestions
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the "Search" input
> > 2. User sees what he/she recently searched, but none of them matches what he/she wants to search for - (1)
> > 3. User starts typing the name of the specific stock
> > 4. User sees suggested stocks during typing, and finds what he/she was searching for - (2)
> > 5. User clicks on the name of the stock
> > 6. User gets redirected to the Detail Page of the corresponding stock
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens if the user has no history of searching
> > (2) Nothing happens on empty input
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that the user has history of searching
> > When the user clicks on the "Search" input
> > User should see what he/she has recently searched
> >   
> > When the user types letter in the "Search" input
> > User should see suggestions led by the input
> >
> > When the user clicks on the name of one of the suggested input
> > User should be on Detail Page of the corresponding stock
> > ```  
> > **Sprint: 4**

### My page
> **Story 1**
> > **Feature:** User wants to change password 
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the "change password" button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “User Information” tab
> > 2. User clicks on the “change password” button
> > 3. Change password pop-up will appear
> > 4. User puts a new password and clicks on the confirm button - (1)
> > 4. User's password is changed
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) User puts unavailable passwords
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user types “text_A” in the pop-up
> > The user’s password should be changed by “text_A”
> >
> > When the user types unavailable password(too short or unavailable character)
> > Then the pop-up should show warning messages
> >
> > When the user moves to another page without pressing the confirm button
> > Then any member information must be not changed
> > ```  
> > **Sprint: 2**  
> >
> **Story 2**
> > **Feature:** User wants to change nickname
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the “Edit” button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “User Information” tab
> > 2. User clicks on the “Edit” button
> > 3. User gets redirected to user information edit page
> > 4. User puts new nickname in the nickname input and clicks on the confirm button - (1)
> > 5. User's nickname is changed
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) User puts unavailable nicknames
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When there is a user with the same name as input
> > Then user should be redirected to edit page with warning messages
> > 
> > When the user moves to another page without pressing the confirm button
> > Then any member information should not be changed
> > ```  
> > **Sprint: 2** 
> >
> **Story 3**
> > **Feature:** User wants to sign out
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the "sign out" button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “User Information” tab
> > 2. User clicks on the “sign out” button
> > 3. User should be redirected to sign-out page and the user can accept or dismiss the confirmation
> > 4. User clicks on the accept button, the user's information changes and redirect to pre-login page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None 
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the sign out button
> > Then user should be on sign-out page
> >
> > When user clicks on the dismiss button on sign-out page
> > Then user should be redirected to my page
> >
> > When the user moves to another page without pressing the confirm button
> > Then any member information must be not changed
> > ```  
> > **Sprint: 2**  
> >
> **Story 4**
> > **Feature:** User want to see information of all stocks in group
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the right-pointing/left-pointing arrow placed inside the tab
> >  
> > **Scenario:**
> > ```
> > 1. The page at first show a quadrant chart of the stocks in the first group
> > 2. User can see the chart of others when user clicks on the other group button
> > 3. User can see a table of the stocks in the first group when user clicks on the “favorites detail” tab
> > 4. User can see the table of others when user clicks on the other group button
> > ```
> >  
> > **Exceptions:** 
> > ```
> > If user doesn’t have any group, both tab must show “browse stops to create a group” button to redirect to Report Page
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user enters my page, favorites summary tab should represent in default
> > When user clicks favorites summary / favorites detail tab 
> > Then user should see selected tab
> >
> > When user doesn’t have any favorites, 
> > Then user should see a button redirected to Report Page
> > ```
> > **Sprint: 5**  
> >
> **Story 5**
> > **Feature:** User wants to make a new group within his or her favorites
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “make new group” button in edit group page.
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “edit group” button
> > 2. User clicks checkbox beside the stocks
> > 3. User clicks on the “make new group” button
> > 4. New group pop-up will appear
> > 5. User puts new group name and clicks on the accept button - (1)
> > 6. User gets redirected to My Page, then new group appears in the page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) If there is a group with the same name as the user set, show warning and make group name with (number)
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the edit button
> > Then user should be on group edit page
> >
> > When user checks some stocks and clicks on the “make new group” button
> > Then user should be redirected to favorite summary tab with new group
> >
> > When user checks nothing
> > Then “make new group” button should be disabled
> > ```  
> > **Sprint: 4**  
> >
> **Story 6**
> > **Feature:** User wants to delete stocks within his or her favorites
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “delete” button in edit group page
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “edit group” button
> > 2. User clicks checkbox beside the stocks
> > 3. User clicks on the “delete” button
> > 4. Delete stock pop-up will appear, and the user can accept or cancel the confirmation
> > 5. User clicks on the accept button
> > 6. User's favorites list changes and gets redirected to my page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the edit button
> > Then user should be on group edit page
> >
> > When user checks some stocks and clicks on the “delete” button
> > Then pop-up windows should appear and ask the user whether or not to confirm
> >
> > When user clicks on the “confirm” button
> > Then user should be redirected to favorite summary tab, and selected stocks should be invisible
> >
> > When user checks nothing
> > Then “delete” button should be disabled
> > ```  
> > **Sprint: 4**  
> >
> **Story 7**
> > **Feature:** User wants to delete a group within his or her favorites
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “delete” button in edit group page
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “edit group” button
> > 2. User clicks checkbox beside the group
> > 3. User clicks “delete” button
> > 4. Delete group pop-up will appear, and the user can accept or dismiss the confirmation
> > 5. User clicks on the accept button, the user's favorites list changes and gets redirected to my page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the "edit" button
> > Then user should be on group edit page
> >
> > When user checks some groups and clicks on the “delete” button
> > Then pop-up window should appear and ask the user whether or not to confirm
> >
> > When user clicks on the “confirm” button
> > Then user should be redirected to favorite summary tab, and selected stocks should be invisible
> >
> > When user checks nothing
> > Then “delete” button should be disabled
> > ```
> > **Sprint: 4**  
> >
> **Story 8**
> > **Feature:** User wants to add stocks to the group within his or her favorites
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “add to group” button in edit group page
> > 
> > **Scenario:**
> > ```
> > 1. User clicks on the “edit group” button
> > 2. User clicks checkbox beside the stocks
> > 3. User clicks on the “add to group” button
> > 4. Select group pop-up will appear, and the user can choose one of the existing groups
> > 5. User select a group and clicks on the accept button - (1)
> > 6. The user's favorites list changes and redirect to my page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) If a stock already exists in the selected group, take no action
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the edit button
> > Then user should be on group edit page
> >
> > When user checks some groups and clicks on the “add to group” button
> > Then pop-up windows should appear and ask the user the name of the new group
> >
> > When user put new name and clicks on the “confirm” button
> > Then user should be redirected to favorite summary tab, and selected stocks should be seen invisible
> >
> > When user checks nothing
> > Then “add to group” button should be disabled
> > ```  
> > **Sprint: 4**  
> > 
> **Story 9**
> > **Feature:** User wants to know more about our service
> >  
> > **Actors:** Any users
> >  
> > **Precondition:** The user must be logged-in and in My Page
> >  
> > **Trigger:** User scrolls
> >  
> > **Scenario:**
> > ```
> > 1. User sees overview information of our service on
> > 2. User can scroll page and see more information according to the degree of scrolling - (1) (2)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user reaches the end of list and scrolls down
> > (2) Nothing happens when user reaches the top of list and scrolls up
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks on the “AboutUs” tab
> > Then the user should see the overview information of our service
> >
> > When the user scrolls the page
> > Then user should see more information according to the degree of scrolling
> > ```
> > **Sprint: 2**

### Report page
> **Story 1**
> > **Feature:** User wants to switch and see "To Buy / To Sell" tab
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the “To Buy / To Sell” tab
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “To Buy / To Sell” tab
> > 2. “To buy / To sell” tab is activated - (1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user clicks on the same tab
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that user first enters the report page, to buy tab should represent in default
> > When the user clicks on the “To Buy / To Sell” tab 
> > Then user should see selected tab
> >
> > When the user re-enters the report page
> > Then user should see same tab, same stocks based on user history
> > ``` 
> > **Sprint: 5**  
> >
> **Story 2**
> > **Feature:** User wants to see another day reports
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the calendar button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the calendar button, pick date user wants to see
> > 2. User gets redirected to picked date report - (1), (2)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user clicks on the same date
> > (2) Nothing happens when user clicks on the future date that is yet to come
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that user first enters the report page, report should represent current date in default
> > When the user clicks calendar button
> > Then user should see selected date report
> >
> > When the user re-enters the report  page
> > Then user should see same date based on user history
> > ```  
> > **Sprint: 5**  
> >
> **Story 3**
> > **Feature:** User wants to see more stocks of  block list
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User scrolls the page
> >  
> > **Scenario:**
> > ```
> > 1. User scrolls the block list
> > 2. User should see stocks according to degree of scrolling - (1), (2)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user reaches end of the list
> > (2) Nothing happens when user reaches top of the page
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that user first enters the report page, top of the list should represent in default
> > When the user scrolls the page
> > Then user should see more stock blocks according to the degree of scrolling
> >
> > When the user re-enters the report  page
> > Then user should see same scrolled list based on history
> > ```  
> > **Sprint: 5**  
> >
> **Story 4**
> > **Feature:** User wants to see specific stock in detail
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the “Stock Name” button in block component
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “Stock Name” button in block component
> > 2. User should see the stock detail page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks on the “Stock Name” button in block component
> > Then user should be redirected to detail page
> > ```  
> > **Sprint: 5**  
> >
> **Story 5**
> > **Feature:** User wants to see more analysed News in detail
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the right-arrow button next to the article list 
> >  
> > **Scenario:**
> > ```
> > 1. User clicks the right-arrow button next to the article list 
> > 2. User should see the detail page with “News” tab
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks the right-arrow button next to article list 
> > Then user should be redireced to the detail page  with "News" tab
> > ```  
> > **Sprint: 3**  
> >
> **Story 6**
> > **Feature:** User wants to search & see specific stock
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the search box input, sequentially clicks on the search result button
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the search box input
> > 2. User starts typing complete or partial name of the stock
> > 3. User clicks on the search result button - (1)
> > 4. User sees stock produced by input in the same page - (2)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens on empty input
> > (2) No stock list produced when there’s no stock matches.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that the user types letter in the search box input
> > When the user clicks on the search result button
> > Then user should see produced block component led by the input
> > ```  
> > **Sprint: 5**  
> >
### Detail page
#### **Overview tab**
> **Story 1**
> > **Feature:** User want to see score and overview of particular stock
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the specific stock title from other page
> >  
> > **Scenario:**
> > ```
> > 1. User click title of a particular stock on the other page
> > 2. User gets redirected to Detail Page.
> > 3. User can see the overview information of the stock clicked
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> >
> > **Acceptance Test:**
> > ```
> > When a user clicks the title of a particular stock
> > Then it should be redirected to the Detail Page of that stock
> > ```
> > **Sprint: 4**
> >
> **Story 2**
> > **Feature:** User want to see past score and overview information of particular stock
> >
> > **Actors:** Any users 
> >  
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on Detail Page and overview tab
> > ```
> >
> > **Trigger:** User clicks on the calendar button which is next to update date
> >
> > **Scenario:**
> > ```
> > 1. Users click the calendar button which is next to the update-date
> > 2. Calendar pop-up will appear, and users can choose specific date - (1)
> > 3. User gets detailed stock information on a specific date
> > ```
> > **Exceptions:** 
> > ```
> > (1) User should not choose a future date.
> > ```
> >
> > **Acceptance Test:**
> > ```
> > Given user already click the calendar button and Calendar pop-up appeared
> > When user clicks specific date on Calendar
> > Then the page should render the overview information of the particular date
> > ```
> > **Sprint: 3**
#### **Price trends tab**
> **Stroy 1**
> > **Feature:** User want to see the price trend of a specific stock.
> > 
> > **Actors:** Any users 
> > 
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on Detail page and Price trends tab
> > ```
> >
> > **Trigger:** User clicks the Price trends tab on the stock detail page
> >
> > **Scenario:**
> > ```
> > 1. Users click the Price-trends tab on the stock detail page.
> > 2. Page renders the information of the price trend of a specific stock
> > ```
> > 
> > ***Exception:***
> > ```
> > None
> > ```
> >
> > **Acceptance Test:**
> > ```
> > Given user is already on Detail Page and not on Price-trends tab 
> > When a user clicks the  Price-trends tab
> > Then page should render the information of the price trend of a specific stock
> > ```
> > **Sprint: 3**
#### **Financial state tab**
> **Stroy 1**
> > **Feature:** User want to see the financial state and comparison information of a specific stock
> > 
> > **Actors:** Any users
> > 
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on Detail Page and Financial state tab
> > ```
> >
> > **Trigger:** User clicks the Financial state tab on the stock detail page
> >
> > **Scenario:**
> > ```
> > 1. User clicks the Financial state tab
> > 2. User can see the financial state and financial compare information which is easy to understand
> > ```
> > 
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user is already on Detail Page and not on Financial-state tab 
> > When a user clicks the Financial-state tab, 
> > Then page should render the financial statement of a specific stock
> > ```
> > **Sprint: 3**
#### **Comment tab**
> **Story 1**
> > **Feature:** Users want to see other people's opinions
> >
> > **Actors:** Any users 
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on Detail Page
> > ```
> >
> > **Trigger:** User clicks the Comment tab on the Detail Page
> > 
> > **Scenario:**
> > ```
> > 1. User clicks the Comments tab.
> > 2. User can see other people's opinions as comments
> > ```
> > 
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user is already on Detail page and not on Comments tab 
> > When a user clicks the Comments tab
> > Then Detail Page should render the comments of a specific stock
> > ```
> > **Sprint: 2**
> >
> **Story 2**
> > **Feature:** Users want to post comments to a specific stock
> > 
> > **Actors:** Any user
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on Detail Page and Comment tab
> > ```
> >
> > **Trigger:** User enters the content of the comment and clicks the OK button
> >
> > **Scenario:**
> > ```
> > 1. User enters their opinion to the comment
> > 2. User click the OK button - (1)
> > 3. New comment is posted
> > ```
> > **Exceptions:** 
> > ```
> > (1) When user clicks the "OK" button with empty content, warning alert will appear
> > ```
> >
> > **Acceptance Test:**
> > ```
> > User enters content and click the "OK" button, then the comment should be posted
> > ```
> > **Sprint: 2**
> >
> **Story 3**
> > **Feature:** User wants to delete their comment
> > 
> > **Actors:** Any user
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on stock detail page and Comment tab
> > The comment that a user wants to delete must be written by that user
> > ```
> >
> > **Trigger:** User clicks the "Delete" button next to the comment that the user wants to delete.
> > 
> > **Scenario:**
> > ```
> > 1. User has posted comments on a specific stock
> > 2. User clicks the "Delete" button next to the comment - (1) 
> > 3. The comment is deleted and not rendered
> > ```
> >
> > **Exceptions:** 
> > ```
> > (1) "Delete" button does not appear to the comments written by other people
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks the "Delete" button next to comment written by him/her
> > Then the comment should be removed and not be rendered
> > ```
> > **Sprint: 2**
> >
> **Story 4**
> > **Feature:** Users want to edit their comments
> > 
> > **Actors:** Any user
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on Detail Page and Comment tab
> > The comment that a user wants to edit must be written by that user
> > ```
> >
> > **Trigger:** User click the "Edit" button next to the comment that the user wants to edit.
> > 
> > **Scenario:**
> > ```
> > 1. User has posted comments on a specific stock
> > 2. User clicks the "Edit" button next to the comment
> > 3. User enters new content and then click the Ok button
> > 4. The comment is edited and rendered with revised comment
> > ```
> > 
> > **Exceptions:** 
> > ```
> > There should be no "Edit" button next to comment wriiten by other person
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks the "Edit" button next to comment written by him/her and enters new content of comment and click the "OK" button
> > the comment content should be revised
> > ```
> > **Sprint: 2**
#### **News tab**
> **Story 1**
> > **Feature:** User wants to see another day noticeable news
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks date picker
> >  
> > **Scenario:**
> > ```
> > 1. User clicks the News tab.
> > 2. User can the news about the specific stock
> > ```
> >  
> > **Exceptions:** 
> > ```
> > Nothing happens when user clicks same date
> > Nothing happens when user clicks future date that is yet to come
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters the Detail Page with news tab, provided news should represent current date in default
> > When user clicks date picker
> > Then user should see selected date report
> >
> > When user re-enters the Detail Page, news tab
> > Then user should see same date news based on user history
> > ```  
> > **Sprint: 3**
> >
> **Story 2**
> > **Feature:** User wants to see news including specific keyword or sentence
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks input search
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the “search” input
> > 2. User starts typing the keyword or sentence of the article
> > 3. User sees articles produced by user input in same page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens on empty input
> > (2) No article list produced when there’s no article matches.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given that the user types letter in the “search” input
> > Then user should see produced list of article led by the input
> > ```
> > **Sprint: 3**
> >
> **Story 3**
> > **Feature:** User wants to read specific article in detail
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the title of specific article
> >  
> > **Scenario:**
> > ```
> > 1. User clicks on the title of specific article 
> > 2. User should be given new page with article link
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the title of specific article
> > Then user should be given new page with article link
> > ```
> > **Sprint: 3**
> >
> **Story 4**
> > **Feature:** User wants to see more news that is not represented in current page
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks article list navigator 
> > User clicks next vector button
> > User clicks specific number button
> >
> > **Scenario:**
> > ```
> > 1. User clicks next vector button or number button placed in bottom of the article list
> > 2. User should be given next new article list based on current number of list
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens if user clicks the next/prev vector button in end/start of the article list
> > (2) Nothing happens if the user clicks the same number when user sees that number article list
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the next/prev vector button or number button
> > Then user should be given new article list based on the button result
> > ```
> > **Sprint: 3**
## **User Interface Requirements**<br />
![Sketch (3)](https://user-images.githubusercontent.com/54826729/96331273-f2d33980-1096-11eb-9bfb-7191aa0cc66f.png)


This document was written with reference to UCB CS169
