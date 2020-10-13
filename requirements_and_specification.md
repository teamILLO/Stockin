# **Please check the grading guidelines before revising the layout**

# stockin': Requirements and Specification
(Borrowed and Adapted from UCB CS169)

## Document Revision History
**Rev. 1.0**
> When: Oct 11, 2020  
> What: Created Document Layout  
> Who:  Junhyeok Park  

## Project Abstract<br />
**stockin'** is a service that provides customers with a quick, at-a-glance organized information about stocks. Customers are investors who have a difficult time selecting good stocks due to the wide variety of stock information. The service analyzes graphs and financial statements and converts them into scores for easy visual viewing, So allowing customers to choose stocks that are good to invest without spending much time on.
In addition, **stokcin'** will not only provide predicted information about future stock prices, but will also disclose information created in the past to give users credibility. It will attract many customers by providing not only the score created by the service, but also raw objective data and a function to communicate with other users.


## **Customer**<br />

* **General Customer**

  * People interested in stocks
  
    * Those who is already having stocks or is willing to start stock trade
    
* **Specific Customer**

  * Beginner of stock market
  
    * Those who have difficulty in selecting, and buy(sell)ing a stock based on a lot of information
    
  * People who don’t make a main job of stocks
  
    * Those who has an understanding of stocks but does not have time to grasp the information
    
  * People who have yet to decide which stock to choose
  
    * Those who have difficulty choosing stocks because there are numerous companies in the stock market

## **Competitive Landscape**<br />  
The most basic but most important information is the graph and Financial Statements, which is objective information in the stock market.
Stockin' provides this with summarized information.
This will reduce the time that users spend searching for this information.

Also, Stockin’ provides news information.
This is subjective information, but it is good information to be able to grasp public opinion and to understand the trends of the companies concerned.
Stockin' categorizes positive and negative articles through NLP and ranks according to the degree of relevant articles to the enterprise.
Eventually users quickly identify them.

By scoring and recommending based on summarized information, users will be able to get help in selecting stocks.

* **Competitive market companies**

  * **Kosho**
    * An application-based platform that learns past stock price changes and predicts future stock price changes
    * Provides past stock price changes similar to the present as the basis for stock price change forecast
    * For certain stocks, stock price change prediction is free, but stock recommendation is provided with a subscription fee

  * **Robo-advisor**
    * Services that make investment decisions and asset allocations through learned algorithms
    * In Korea, most securities companies provide this service for a fee, and among startups, ‘Fint’ and ‘Aim’ are representative
    * The user can know the investment progress of AI, but it does not provide the basis for selecting a stock or the judgment of AI for a specific stock

Through deep learning, they decide where to sell and buy, thereby narrowing the user's judgment.
However, there are so many factors that determine the price of stocks, and it is unpredictable.
Stockin' helps users build know-how and make better judgments without reducing the width of their judgment.
This will allow users to move on to the best judgment they are satisfied with.

So, what's most **distinct from other competitors** is:
  * Reduce the amount of time users spend searching for stock-related information.
  * Do not narrow the user's judgment by processing objective information.
  * The minimum analysis prediction makes it easier to choose among many stock items.

## **User Stories**<br />
This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. Each user story should also have a field called "Sprint" where you specify in which sprint you implemented or plan to implement this feature.
You should list only the user stories for the previous sprints and those for the current sprint.

At the end of this section you should maintain a bullet list of user stories that you plan to get to in future sprints, with only minimal detail for each such story. We expect that in future sprints some of these items will be promoted to full fledged user stories.
(**Must include in the first version, and must be expanded for future sprints**)

## User Stories  
> **Story 0 (EXAMPLE)** **DO NOT DELETE THIS EXAMPLE**
> > **Feature:** Create Tour
> >  
> > **Actors:** Traveler or Guide User  
> >  
> > **Precondition:** The traveler or the guide has to be a registered user and logged in  
> >  
> > **Trigger:** User clicks on the “Create Tour” button  
> >  
> > **Scenario:**
> > ```
> > 1. The page displays a map with all the map markers that the route that the user has created
> > 2. On the left you can find buttons to access all the information of the tour such as: Name of
> > the tour, begin and end times of the tour, description of the tour, description of the
> > places of route, dates in which the tour is available, transportation means. -(1)  
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) The user does not fill out all fields to create the Tour  
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given the user has fill out all the required fields to create the tour
> > When the user clicks on the “Create Tour” Button
> > Then the user should see “Your tour has been created” 
> > ```
### Pre-login page  
> **Story 1**
> > **Feature:** User wants to sign in
> >  
> > **Actors:** Users who is not logged-in  
> >  
> > **Precondition:** The user must be logged-out state and a member of the service 
> >  
> > **Trigger:** User clicks sign in button
> >  
> > **Scenario:**
> > ```
> > 1. User wants to log-in and use the service
> > 2. User enters own ID and password
> > 3. User clicks log-in button
> > 4. User is logged in and redirected to the main page
> > ```
> > **Exceptions:** 
> > ```
> > (1) When user enters wrong id/password and clicks the log-in button, warning message must be appeared.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > After entering id/password and clicking the sign-in button
> > The user state must be logged in and redirected to main-page
> > ```
> **Story 2**
> > **Feature:** User wants to sign up
> >  
> > **Actors:** Users who is not logged-in  
> >  
> > **Precondition:** The user must be logged-out state and not a member of the service
> >  
> > **Trigger:** User clicks sign up button
> >  
> > **Scenario:**
> > ```
> > 1. User wants to sign up and wants to go main page
> > 2. User clicks sign up button
> > 3. Sign up pop-up activate
> > 4. User enters the ID/password which user want to use
> > 5. User makes a own ID and Sign up pop-up disappear
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) User can't use ID which is already existed
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on sign up button sign up pop-up must appear
> > After the user creates an ID that did not exist
> > sign up pop-up mush disappear and new member information should be created
> > ```
> **Story 3**
> > **Feature:** User wants to know more about our service 
> >  
> > **Actors:** Users who is not logged-in  
> >  
> > **Precondition:** The user must be logged-out state  
> >  
> > **Trigger:** User is in pre-login page and can scroll it
> >  
> > **Scenario:**
> > ```
> > 1. User wants to know more about our service
> > 2. User sees initial information of our service
> > 3. User can scroll page and see more information according to the degree of scrolling -(1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user reaches the end of list
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user first enters to the pre-login page
> > user should see introduce information about our page
> >
> > When user scrolls the page
> > user should see more information of our service
> > ```
> **Story 4**
> > **Feature:** User forgets ID or password and wants to find it
> >
> > **Actors:** Any users
> >
> > **Precondition:** The user must be logged-out state and a member of the service
> >
> > **Trigger:** User clicks "Find ID Password" button
> >
> > **Scenario:**
> > ```
> > 1. User want to log-in but forgets own ID or password
> > 2. User clicks "Find ID Password" button
> > 3. User enters his/her information and finds ID/password
> > 4. After that, User can log-in to the webpage
> > ```
> >
> > **Exceptions:** 
> > ```
> > (1) When user tries to find ID/password which doesn't existed, it must notice it that it doesn't exist.
> > (2) When user enters wrong his/her information, it must notice it that it is wrong.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > User clicks "Find ID Password" button
> > User enters correct his/her information
> > User can know his/her ID/password information
> > ```
### Post-login page (Main page)
> **Story 1**
> > **Feature:** Users can surf among top 5 predicted-to-rise/predicted-to-fall stocks without redirection
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
> > User should see new prediction in left/right direction that was hidden previously
> > ```
> **Story 2**
> > **Feature:** Users can see more highly scored stocks by being redirected to Recommendation Page 
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Show-more" button
> >  
> > **Scenario:**
> > ```
> > 1. User surfed among top 5 highly scored stocks and wants to know about other highly scored stocks.
> > 2. User clicks the show-more button
> > 3. User gets redirected to Recommendation Page
> > 4. Depending on which show-more button is clicked, tab to be initially selected on Recommendation Page will be decided.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When the user clicks the show-more button
> > User should be redirected to Recommendation Page
> > The tab in the Recommendtion Page should be properly active regarding to which show-more button is clicked on
> > ```  
> **Story 3**
> > **Feature:** Users can get more information about the stock by clicking the stock
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the stock that he/she wants to get more information about
> >  
> > **Scenario:**
> > ```
> > 1. User surfed among top 5 highly scored stocks and wants to know about one of the stocks
> > 2. User clicks on the corresponding stock
> > 3. User gets redirected to Detail Page of the corresponding stock
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
> > User should be on Detail Page of the corresponding stock
> > ```  
> **Story 4**
> > **Feature:** Users can switch between Daily Report tab and My Interests tab
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Daily Report" or "My Interests" tab
> >  
> > **Scenario:**
> > ```
> > 1. User wants to get information from Daily Report/My Interests tab
> > 2. User clicks on the "Daily Report" or "My Interests" tab
> > 3. Daily Report/My Interests tab is activated - (1)
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
> > The target tab should be activated
> > ```  
> **Story 5**
> > **Feature:** Users can go to My Page anytime
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Mypage" button
> >  
> > **Scenario:**
> > ```
> > 1. User wants to do some jobs related to his/her account at the mypage
> > 2. User clicks on the "Mypage" button
> > 3. User gets redirected to My Page
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
> > User should be redirected to My Page
> > ```  
> **Story 6**
> > **Feature:** Users can logout anytime
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the "Logout" button
> >  
> > **Scenario:**
> > ```
> > 1. User finished getting information from stockin' and wants to logout
> > 2. User clicks on the "Logout" button
> > 3. User gets redirected to Pre-login Page
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
> > User should be on My Page
> > ```  
> **Story 7**
> > **Feature:** Users can search for recently searched stock
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the name of one of the recently searched stocks
> >  
> > **Scenario:**
> > ```
> > 1. User wants to search for a recently searched stock
> > 2. User clicks on the "Search" input
> > 3. User sees what he/she recently searched - (1)
> > 4. User clicks on the name of the stock
> > 5. User gets redirected to the Detail Page of the corresponding stock
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
> > User should see what he/she has recently searched
> >   
> > When the user clicks on the name of one of the recently searched stocks
> > User should be on Detail Page of the corresponding stock
> > ```  
> **Story 8**
> > **Feature:** Users can search for a specific stock they want to get information about
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks on the name of the stock of one of the suggestions
> >  
> > **Scenario:**
> > ```
> > 1. User wants to search for a specific stock
> > 2. User clicks on the "Search" input
> > 3. User sees what he/she recently searched, but none of them matches what he/she wants to search for - (1)
> > 4. User starts typing the name of the specific stock
> > 5. User sees suggested stocks during typing, and finds what he/she was searching for - (2)
> > 6. User clicks on the name of the stock
> > 7. User gets redirected to the Detail Page of the corresponding stock
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
### My page
> **Story 1**
> > **Feature:** User wants to change password 
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the "change password" button. 
> >  
> > **Scenario:**
> > ```
> > 1. User want to change password 
> > 2. User clicks on the “User Information” tab.
> > 3. User clicks on the “change password” button.
> > 4. Change password pop-up will appear, and the user puts a new password and clicks on the confirm button.
> > 5. User's password changed.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > User puts unavailable passwords. 
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user types “text_A” in the pop-up,
> > The user’s password should be changed by “text_A”.
> > When the user types unavailable password(too short or unavailable character),
> > the pop-up should show warning messages.
> > When the user moves to another page without pressing the confirm button,
> > Any member information must be not changed.
> > ```  
> **Story 2**
> > **Feature:** User wants to change nickname
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the “Edit” button.
> >  
> > **Scenario:**
> > ```
> > 1. User want to change nickname 
> > 2. User clicks on the “User Information” tab.
> > 3. User clicks on the “Edit” button.
> > 4. User gets redirected to user information edit page
> > 5. User puts new nickname in the nickname input and clicks on the confirm button.
> > 6. User's nickname changed.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > User puts unavailable nicknames. 
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When there is a user with the same name as input,
> > User should be redirected to edit page with warning messages.
> > When the user moves to another page without pressing the confirm button,
> > Any member information must be not changed.
> > ```  
> **Story 3**
> > **Feature:** User wants to sign out
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the "sign out" button. 
> >  
> > **Scenario:**
> > ```
> > 1. User want to sign out.
> > 2. User clicks on the “User Information” tab.
> > 3. User clicks on the “sign out” button.
> > 4. User should be redirected to sign-out page and the user can accept or dismiss the confirmation.
> > 5. User clicks on the accept button, the user's information changes and redirect to pre-login page.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None 
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks on the sign out button,
> > User should be on sign-out page.
> > When user clicks on the dismiss button on sign-out page,
> > User should be redirected to my page.
> > When the user moves to another page without pressing the confirm button,
> > Any member information must be not changed.
> > ```  
> **Story 4**
> > **Feature:** User want to see informations of all stocks in group
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
> > 2. User can see the chart of others when user clicks on the other group button.
> > 3. User can see a table of the stocks in the first group when user clicks on the “favorites detail” tab.
> > 4. User can see the table of others when user clicks on the other group button.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > If user doesn’t have any group, both tab must show “browse stops to create a group” button to redirect to recommend page.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters  my page, favorites summary tab should represent in default.
> > When user clicks favorites summary / favorites detail tab 
> > User should see selected tab
> > When user doesn’t have any favorites, 
> > User should see a button redirected to recommend page.
> > ```
> **Story 5**
> > **Feature:** User wants to make a new group within him or her favorites
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “make new group” button in edit group page. 
> >  
> > **Scenario:**
> > ```
> > 1. User want to make a new group within him or her favorites
> > 2. User clicks on the “edit group” button.
> > 3. User clicks checkbox beside the stocks.
> > 4. User clicks on the “make new group” button.
> > 5. New group pop-up will appear, and the user can put new group name.
> > 5. User clicks on the accept button, and redirect to my page, then new group appear in the page.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > If there is a group with the same name as the user set, make group name with (number).
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters my page, favorites summary tab should represent in default.
> > When user clicks on the edit button, 
> > user should be on group edit page.
> > When user checks some stocks and clicks on the “make new group” button,
> > User should be redirected to favorite summary tab with new group.
> > When user checks nothing,
> > “make new group” button should be disabled.
> > ```  
> **Story 6**
> > **Feature:** User wants to delete stocks within him or her favorites
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “delete” button in edit group page.
> >  
> > **Scenario:**
> > ```
> > 1. User want to delete stocks within him or her favorites
> > 2. User clicks on the “edit group” button.
> > 3. User clicks checkbox beside the stocks.
> > 4. User clicks on the “delete” button.
> > 5. Delete stock pop-up will appear, and the user can accept or dismiss the confirmation.
> > 6. User clicks on the accept button, the user's favorites list changes and redirect to my page.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters  my page, favorites summary tab should represent in default.
> > When user clicks on the edit button, 
> > user should be on group edit page.
> > When user checks some stocks and clicks on the “delete” button,
> > Pop-up windows should appear and ask the user whether or not to confirm.
> > When user clicks on the “confirm” button,
> > User should be redirected to favorite summary tab, and selected stocks should be seen invisible.
> > When user checks nothing,
> > “delete” button should be disabled.
> > ```  
> **Story 7**
> > **Feature:** user wants to delete a group within him or her favorites
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “delete” button in edit group page. 
> >  
> > **Scenario:**
> > ```
> > 1. User wants to delete a group within him or her favorites
> > 2. User clicks on the “edit group” button.
> > 3. User clicks checkbox beside the group.
> > 4. User clicks “delete” button.
> > 5. Delete group pop-up will appear, and the user can accept or dismiss the confirmation.
> > 6. User clicks on the accept button, the user's favorites list changes and redirect to my page.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters  my page, favorites summary tab should represent in default.
> > When user clicks on the edit button, 
> > user should be on group edit page.
> > When user checks some groups and clicks on the “delete” button,
> > Pop-up windows should appear and ask the user whether or not to confirm.
> > When user clicks on the “confirm” button,
> > User should be redirected to favorite summary tab, and selected stocks should be seen invisible.
> > When user checks nothing,
> > “delete” button should be disabled.
> > ```  
> **Story 8**
> > **Feature:** User wants to add stocks to the group within him or her favorites
> >  
> > **Actors:** any user
> >  
> > **Precondition:** The user must be registered, logged in, and have stocks in favorites
> >  
> > **Trigger:** User clicks on the “add to group” button in edit group page. 
> >  
> > **Scenario:**
> > ```
> > 1. User want to make a new group within him or her favorites
> > 2. User clicks on the “edit group” button.
> > 3. User clicks checkbox beside the stocks.
> > 4. User clicks on the “add to group” button.
> > 5. Select group pop-up will appear, and the user can choose one of the existing groups.
> > 5. User clicks on the accept button, the user's favorites list changes and redirect to my page.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > If a stock already exists in the selected group, take no action.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters  my page, favorites summary tab should represent in default.
> > When user clicks on the edit button, 
> > user should be on group edit page.
> > When user checks some groups and clicks on the “add to group” button,
> > Pop-up windows should appear and ask the user the name of the new group.
> > When user put new name and clicks on the “confirm” button,
> > User should be redirected to favorite summary tab, and selected stocks should be seen invisible.
> > When user checks nothing,
> > “add to group” button should be disabled.
> > ```  
### Report page
> **Story 1**
> > **Feature:** User wants to see rise / fall stocks
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks rise / fall tab 
> >  
> > **Scenario:**
> > ```
> > 1. User wants to see rise / fall stocks
> > 2. User clicks rise / fall tab, should immediately render selected tab
> > 3. User should see block list of selected tab
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user clicks same tab
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters the report page, rise tab should represent in default.
> > When user clicks rise / fall tab 
> > User should see selected tab
> >
> > When user re-enters the report page
> > User should see same tab, same stocks based on user history
> > ```  
> **Story 2**
> > **Feature:** User wants to see another day recommendation
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks date picker
> >  
> > **Scenario:**
> > ```
> > 1. User wants to see another day recommendation report
> > 2. User clicks date picker, pick date user wants to see 
> > 3. User should see picked date report
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user clicks same date
> > (2) Nothing happens when user clicks future date that is yet to come
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters the report page, report should represent current date in default
> > When user clicks date picker
> > User should see selected date report
> >
> > When user re-enters the report  page
> > User should see same date based on user history
> > ```  
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
> > 1. User wants to see more stocks of block list
> > 2. User scrolls the block list
> > 3. User should see stocks according to degree of scrolling
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
> > Given user first enters the report page, report should represent current date in default
> > When user clicks date picker
> > User should see selected date report
> >
> > When user re-enters the report  page
> > User should see same scrolled list based on user history
> > ```  
> **Story 4**
> > **Feature:** User wants to see specific stock in detail
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** User clicks the stock name in block component
> >  
> > **Scenario:**
> > ```
> > 1. User wants to see specific stock in detail
> > 2. User clicks the stock name in block component
> > 3. User should see the stock detail page
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks the stock name in block component
> > Redirect to Detail page and activated
> > user should see detail page
> > ```  
> **Story 5**
> > **Feature:** User wants to see more analysed News in detail
> >  
> > **Actors:** Any users  
> >  
> > **Precondition:** The user must be registered and logged in 
> >  
> > **Trigger:** In block component, user clicks the “more” button next to article list 
> >  
> > **Scenario:**
> > ```
> > 1. User wants to see see analysed News in detail 
> > 2. User clicks the “more” button next to article list 
> > 3. User should see the stock detail page with “news” tab
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user clicks the “more” button next to article list 
> > Redirect to Detail page  with news tab activated
> > user should see detail page with news tab
> > ```  
### Detail page
#### **Overview tab**
> **Story 1**
> > **Feature:** User can see score and overview of particular stock
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks on the specific stock title from other page
> >  
> > **Scenario:**
> > ```
> > 1. User want to know detailed information about a particular stock.
> > 2. User click name of a particular stock on main, recommendation, favorite page.
> > 3. User gets redirected to detail stock page.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > None
> > ```
> >
> > **Acceptance Test:**
> > ```
> > When a user clicks the title of a particular stock, it should be redirected to the detail page of that stock.
> > ```
> >
> **Story 2**
> > **Feature:** User can see past score and overview information of particular stock
> >
> > **Actors:** Any users 
> >  
> > **Precondition:**
> > ```
> > The user must be registered and logged in
> > The user must be already on stock detail page and overview tab.
> > ```
> >
> > **Trigger:** User clicks on the calender button which is next to update date.
> >
> > **Scenario:**
> > ```
> > 1. Users want to know detailed stock information in the past or on a specific date.
> > 2. Users click the calendar button which is next to the update date.
> > 3. Calendar pop-up will appear, and users can choose specific date.
> > 4. User gets detailed stock information on a specific date
> > ```
> > **Exceptions:** 
> > ```
> > User chooses a future date.
> > ```
> >
> > **Acceptance Test:**
> > ```
> > When a user clicks a particular date, then the page should render the information of the particular date.
> > If future date is chosen, warning alert will appear.
> > ```
> >
#### **Price trends tab**
> **Stroy 1**
> > **Feature:** User can see the price trend of a specific stock.
> > 
> > **Actors:** Any users 
> > 
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on stock detail page and Price trends tab.
> > ```
> >
> > **Trigger:** User clicks the Price trends tab on the stock detail page.
> >
> > **Scenario:**
> > ```
> > 1. Users want to know  the price trend of a specific stock.
> > 2. Users click the tab ‘시세동향’ on the stock detail page.
> > 3. Page renders the information of the price trend of a specific stock.
> > ```
> > 
> > ***Exception:***
> > ```
> > None
> > ```
> >
> > **Acceptance Test:**
> > ```
> > When a user clicks the  Price trends tab, then the webpage should render the information of the price trend of a specific stock.
> > If user is already on the ‘시세동향’ tab, nothing is happen.
> > ```
> >
#### **Financial state tab**
> **Stroy 1**
> > **Feature:** User can see the financial state and comparison information of a specific stock.
> > 
> > **Actors:** Any users
> > 
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on stock detail page and Financial state tab.
> > ```
> >
> > **Trigger:** User clicks the Financial state tab on the stock detail page.
> >
> > **Scenario:**
> > ```
> > 1. Users want to know  the financial state of a specific stock.
> > 2. Or users alreay know about the financial information, but don't know how to interpret it.
> > 3. User clicks the Financial state tab.
> > 4. User can see the financial state and financial compare information which is easy to understand.
> > ```
> > 
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When a user clicks the  Financial state tab, then the webpage should render the financial statement of a specific stock.
> > If user is already on the Financial state tab, nothing is happen.
> > ```
> > 
#### **Comment tab**
> **Story 1**
> > **Feature:** Users can view other people's opinions as comments.
> >
> > **Actors:** Any users 
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on stock detail page.
> > ```
> >
> > **Trigger:** User clicks the Comment tab on the stock detailed page.
> > 
> > **Scenario:**
> > ```
> > 1. User want to know other people's opinions or situation about the specific stock.
> > 2. User clicks the Comment tab.
> > 3. User can view other people's opinions as comments.
> > ```
> > 
> > **Exceptions:** 
> > ```
> > None
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When a user clicks the  Comment tab, then the webpage should render the Comments of a specific stock.
> > If user is already on the Comment tab, nothing is happen.
> > ```
> >
> **Story 2**
> > **Feature:** Users can post their on stocks
> > 
> > **Actors:** Any user
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on stock detail page and Comment tab.
> > ```
> >
> > **Trigger:** User enters the content of the comment and clicks the OK button
> >
> > **Scenario:**
> > ```
> > 1. User want to post their opinion about a specific stock.
> > 2. User click the comment tab and then enter their opinion to the comment.
> > 3. User click the OK button and the comment is posted.
> > ```
> >  
> > **Exceptions:** 
> > ```
> > When user clicks the OK button with empty content, warning alert will
> > ```
> >
> > **Acceptance Test:**
> > ```
> > User enters content and click the Ok button, then the comment should be posted.
> > ```
> >
> **Story 3**
> > **Feature:** Users can delete their comments.
> > 
> > **Actors:** Any user
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on stock detail page and Comment tab.
> > The comment that a user wants to delete must be a comment written by that user.
> > ```
> >
> > **Trigger:** User click the delete button next to the comment that the user wants to delete.
> > 
> > **Scenario:**
> > ```
> > 1. User has posted comments on a specific stock.
> > 2. Later, User want to delete the comment written by the user.
> > 3. User enter the Comment tab, and then click the delete button next to the comment.
> > 4. The comment is deleted and should not be rendered.
> > ```
> > 
> > **Exceptions:** 
> > ```
> > There should be no delete button next to comment wriiten by other person.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user click the delete button next to comment written by him,
> > Then the comment should be removed and not be rendered.
> > ```
> >
> **Story 4**
> > **Feature:** Users can edit their comments.
> > 
> > **Actors:** Any user
> >
> > **Precondition:**
> > ```
> > The user must be registered and logged in.
> > The user must be already on stock detail page and Comment tab.
> > The comment that a user wants to edit must be a comment written by that user.
> > ```
> >
> > **Trigger:** User click the edit button next to the comment that the user wants to edit.
> > 
> > **Scenario:**
> > ```
> > 1. User has posted comments on a specific stock.
> > 2. Later, User want to eidt the comment written by the user.
> > 3. User enter the Comment tab, and then click the edit button next to the comment.
> > 4. User enters new content and then click the Ok button.
> > 5. The comment is edited and should be rendered with revised comment.
> > ```
> > 
> > **Exceptions:** 
> > ```
> > There should be no edit button next to comment wriiten by other person.
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > When user click the edit button next to comment written by him,
> > Users enters new content of comment and click the Ok button.
> > Then the comment content should be revised.
> > ```
> >
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
> > 1. User wants to see another day noticeable news
> > 2. User clicks date picker, pick date user wants to see 
> > 3. User should see picked date noticeable news
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) Nothing happens when user clicks same date
> > (2) Nothing happens when user clicks future date that is yet to come
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > Given user first enters the detail page with news tab, provided news should represent current date in default
> > When user clicks date picker
> > User should see selected date report
> >
> > When user re-enters the detail page, news tab
> > User should see same date news based on user history
> > ```  
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
> > 1. User wants to see news including specific keyword or sentence.
> > 2. User clicks on the “search” input
> > 3. User starts typing the keyword or sentence of the article
> > 4. User sees articles produced by user input in same page
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
> > User should see produced list of article led by the input
> > ```
> **Story 3**
> > **Feature:** User wants to read specific article in detail
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks the title of specific article
> >  
> > **Scenario:**
> > ```
> > 1. User wants to read specific article in detail
> > 2. User clicks on the title of specific article 
> > 3. User should be given new page with article link
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
> > User should be given new page with article link
> > ```
> **Story 4**
> > **Feature:** User wants to see more news that is not represented in current page
> >  
> > **Actors:** Any users 
> >  
> > **Precondition:** The user must be registered and logged in
> >  
> > **Trigger:** User clicks article list navigator 
> >  User clicks next vector button
> > User clicks specific number button
> >
> > **Scenario:**
> > ```
> > 1. User wants to see more news that is not represented in current page
> > 2. User clicks next vector button placed in bottom of the article list
> > 3. User should be given next new article list based on current number of list
> >
> > 1. User wants to see more news that is not represented in current page
> > 2. User clicks number button placed in bottom of the article list
> > 3. User should be given new article list based on the number user clicked
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
> > When user clicks on the next/prev vector button
> > User should be given new article list based on the button result
> >
> > When user clicks on the number button
> >User should be given new article list based on the number user clicked
> > ```
## **User Interface Requirements**<br />
Describes any customer user interface requirements including graphical user interface requirements. Here you should have sketches or mockups for the main parts of the interface. To save time you may want to use scanned drawings of interface mockups here, instead of Photoshop drawings.

Just like for the User Stories section, you need to list here only the parts of the user interface that are applicable to the previous sprints and the current one.
(**Must include in the first version, and must be expanded for future sprints**)


**Requirements grading guidelines:**<br />
These are the grading guidelines that staff will use to evaluate your document.


| Max Points | Content |
|------------|---------|
| 5 | Do the requirements state the customers needs? |
| 5 | Competitive analysis |
| 5 | Do the requirements avoid specifying a design (customer-specified design elements are allowed) ? |
| 5 | Do you believe all parts are possible to implement? |
| 5 | Is the project scope big enough? |
|   | **Completeness** |
| 20| Are the user stories written in sufficient detail to allow for design and planning? |
| 5 | Do the user stories have acceptance tests ? |
| 5 | Do the user stories mention error conditions and required behavior ? |
| 5 | Are there sufficient user stories for the first iteration? |
| 5 | Is there a discussion of the stories for future iterations ? |
| 20 | Are the User Interface Requirements given with some detail? Are there some sketches, mockups?|
| | **Clarity** |
| 5 | Is the document carefully written, without typos and grammatical errors? |
| 5 | Is each part of the document in agreement with all other parts? |
| 5 | Are all items clear and not ambiguous? (Minor document readability issues should be handled off-line, not in the review, e.g. spelling, grammar, and organization).|
