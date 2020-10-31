# Sprint2 Progress Report

## Implementation of this Sprint
### Frontend
* **Implementation of the overall framework**<br/>
For front-end development , React's development environment was prepared, each basic container, component and url element was created and set. And we made setting of semantic-ui 
<br/>

* **Header**<br />
<kbd><img src = "https://user-images.githubusercontent.com/59424336/97773622-bfafa080-1b94-11eb-8ecf-55bac58d12bd.png" width="100%"></kbd>
<kbd><img src = "https://user-images.githubusercontent.com/59424336/97773620-bde5dd00-1b94-11eb-88f5-04496b5dfbd7.png" width="100%"></kbd>
Header is an element commonly included in all views except prelogin, and provides basic redirect button and searchbox <br />
If you scroll up the page, the header is rendered like the first picture, but if you scroll down, the header is rendered like the second picture, so User can use the searchbox and buttons regardless of the scroll.
<br/>

* **Footer**<br />
<kbd><img src = "https://user-images.githubusercontent.com/59424336/97773791-22ee0280-1b96-11eb-82f0-094307cea667.png" width="100%"></kbd>
The footer provides a button to navigate to other support sites or views, and is rendered common to all pages like the header.
<br/>

* **Search Box**<br /><img src = "https://user-images.githubusercontent.com/59424336/97773815-53ce3780-1b96-11eb-8994-5e69857152b4.png" width="50%" height="50%"><br/>
The searchbox is a component that is included and rendered in the Header. It is used when searching for a specific stock. When text is entered in the textbox, the corresponding  stocks are automatically listed as shown in photos.
<br/>


### Backend
* **Model design** <br />
Before starting the backend development, the entire model to be used in the project was conceived and implemented, and the controller was formulated for how each model would be used.

* **Model implementation** <br />
We implemented a custom user model that handles emails instead of usernames, and implemented http-request processing functions to use this model and perform sign-in, sign-up functions.

* **Crawler** <br />
The crawler is implemented to directly update the model data by crawling real-time prices of all stocks within 1 minute <br />
It can crawl as many stock information as it wants in the past of all stocks and store them directly in the model <br />



### Difficulties <br />
When team members developed their own part with their own thoughts and collaborated on parts with each other, development communication was difficult until the takeover took over. In order to solve this problem, it was decided to unify the commit form, and after each development, they agreed to write a work report every day.

## Test
### Test coverage report
reports screen shot mush show below<Br/>
-The overall coverage metric<Br/>
-The list of classes with lowest coverage. Explain why is the coverage low, and what (if anything) you plan to do about it


## Team contribution
#### Junheok
He composed the Frontend Relations and api of Pre-login page, constructed VIEW and Testing plan in design and planning. And he led the overall project direction, implemented the frontend in collaboration with Woohyoung, mainly coding and testing test codes.

#### Wooyoung
She composed the Frontend Relations and api of Detail Page, drew up Frontend design and Implementation plan in design and planning, And she implemented the frontend part with Junheok, mainy designed and implemented header and footer, and implemented detail page and searchbox.

#### Jiwon
He composed the Frontend Relations and api of MY-page, designed the overall backend model and the api of each model in design and planning. And he implemented the overall framework of the backend and created a custom user and implemented a function that handles http requests for interworking with the sign-in and sign-up functions of the front end.

#### Daun
He composed the Frontend Relations and api of Report, Main page,  implemented a parser that searches for an information source to crawl stock price information, crawls stock information, and stores it directly in the model implemented by Jiwon.

## git revision
https://github.com/swsnu/swpp2020-team15 <Br/>
sprint2 branch <Br/>
리비전버전~~
