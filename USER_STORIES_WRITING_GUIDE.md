## Writing guides for user stories

**Please write and revise the user stories following the guides written below.

#### 1. Please use **same names for same components**, at least in parts you have written.
```
detail page, stock detail page, detail stock page, stock detailed page, stock_detail page >> Detail Page
```

#### 2. Buttons, Tabs, and other components that show text when rendered must be written in the following form:
```
"<TEXT THAT COMPONENT SHOWS>" <component_type>

ex) "Login" button, "Preview" tab
```

#### 3. Buttons, Tabs, and other components that do not show text when rendered must be written in the following form:
```
<NAME_OF_COMPONENT> <component_type>

ex) left-arrow button, calendar button
```

#### 4. Usage of **click** without **on** is prohibited
```
Then the user should click the "Logout" button (X)
Then the user should click on the "Logout" button (O)
User should see information regarding to the button user clicked (X)
User should see information regarding to the button user clicked on (O)
```

#### 5. Please write every component's names and types according to Figma flowchart
```
That is, every component name should be the same as the UI design in Figma.
If you are not sure of the name of the button/tab/other stuffs, please go to Figma and find answer.
If the component is not named, please name yourself and change the component name in Figma by yourself.
```
