# **Please check the grading guidelines before revising the layout**

# stockin': Requirements and Specification
(Borrowed and Adapted from UCB CS169)

## Document Revision History
**Rev. 1.0**
> When: Oct 11, 2020  
> What: Created Document Layout  
> Who:  Junhyeok Park  

## Project Abstract<br />
**stockin'** is a service that provides customers with a quick, at-a-glance organized information about stocks. Customers are investors who have a difficult time selecting good stocks due to the wide variety of stock information.



**Document Revision History**<br />
Your first version of this document is version 1.0. When you evolve this document for future sprints of your project you will increment the minor version number (e.g., 1.1, 1.2, ...). We do not expect that you will have to increment the major version number in the course of this semester. For every version after the initial version, you should list a short bullet list with the main changes and extensions that you made to the document:

       Rev. 1.0 YYYY-MM-DD - initial version

## **Customer**<br />
A brief description of the customer for this software, both in general (the population who might eventually use such a system) and specifically for this document (the customer(s) who informed this document).  (**Must include in the first version**)  
**WRITE BELOW HERE**


## **Competitive Landscape**<br />  
Briefly identify the competitors in this market, and list the main ways in which your project is going to be different.
(**Must include in the first version**)  
**WRITE BELOW HERE**

## **User Stories**<br />
This section will include the specification for your project in the form of user stories. For each user story, you should have at least a Feature and one or more Scenarios, each of which can have one or more Acceptance Tests. Acceptance Tests list one or more acceptance tests with concrete values for the parameters, and concrete assertions that you will make to verify the postconditions. Each user story should also have a field called "Sprint" where you specify in which sprint you implemented or plan to implement this feature.
You should list only the user stories for the previous sprints and those for the current sprint.

At the end of this section you should maintain a bullet list of user stories that you plan to get to in future sprints, with only minimal detail for each such story. We expect that in future sprints some of these items will be promoted to full fledged user stories.
(**Must include in the first version, and must be expanded for future sprints**)

## User Stories  
### Pre-login page  
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
> **Story 1**
> > **Feature:** WRITE HERE
> >  
> > **Actors:** WRITE HERE 
> >  
> > **Precondition:** WRITE HERE 
> >  
> > **Trigger:** WRITE HERE 
> >  
> > **Scenario:**
> > ```
> > 1. WRITE HERE -(1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) The user does not fill out all fields to create the Tour  
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > WRITE HERE
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
> > **Feature:** WRITE HERE
> >  
> > **Actors:** WRITE HERE 
> >  
> > **Precondition:** WRITE HERE 
> >  
> > **Trigger:** WRITE HERE 
> >  
> > **Scenario:**
> > ```
> > 1. WRITE HERE -(1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) WRITE HERE 
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > WRITE HERE
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
> **Story 1**
> > **Feature:** WRITE HERE
> >  
> > **Actors:** WRITE HERE 
> >  
> > **Precondition:** WRITE HERE 
> >  
> > **Trigger:** WRITE HERE 
> >  
> > **Scenario:**
> > ```
> > 1. WRITE HERE -(1)
> > ```
> >  
> > **Exceptions:** 
> > ```
> > (1) The user does not fill out all fields to create the Tour  
> > ```
> > 
> > **Acceptance Test:**
> > ```
> > WRITE HERE
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
