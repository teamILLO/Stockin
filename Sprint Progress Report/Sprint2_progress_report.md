# Sprint2 Progress Report

## Implementation of this Sprint
### Frontend
* **Header, Footer**<br />

* **Sign-in**<br />

* **Sign-up**<br />

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
He composed the Frontend Relations and api of Pre-login page, constructed VIEW and Testing plan in design and planning, and implements the frontend part of sprint2 with Wooyoung.

#### Wooyoung
She composed the Frontend Relations and api of Detail Page, drew up Frontend design and Implementation plan in design and planning, and implements the frontend part of sprint2 with Junheok.

#### Jiwon
He composed the Frontend Relations and api of MY-page, designed the overall backend model and the api of each model in design and planning. And e implemented the overall framework of the backend and created a custom user and implemented a function that handles http requests for interworking with the sign-in and sign-up functions of the front end.

#### Daun
He composed the Frontend Relations and api of Report, Main page,  implemented a parser that searches for an information source to crawl stock price information, crawls stock information, and stores it directly in the model implemented by Jiwon.

## git revision
https://github.com/swsnu/swpp2020-team15 <Br/>
sprint branch <Br/>
리비전버전~~
