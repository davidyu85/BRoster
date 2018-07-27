## BRoster

### Installation
Please clone from this repo, then do a "npm install".

Use "npm start" to run the app locally.

There is a demo page you can view directly, hosted on GitHub pages.
https://davidyu85.github.io/BRoster/

### View Test Result
Please use "npm test" to view the test results and its coverage. The total coverage should be more than 90%

### Objectives met
1. Use React as base library.
2. This app displays the entire week roster information for the employees, using the information from the 4 mock data.
3. This app shows a tabular view as well as a timeline visualisation.
4. The time-data shown in the app is in Perth timezone rather than locally in Brisbane.
5. This app allows modifying shift hours by reassigning the roles (e.g. morning, afternoon or night) and date of the shift.

### Additional Objectives
1. The popular React-Redux is used in this development.
2. A right-side drawer is added to view the additional details of a selected shift (e.g. time in UTC, shift ID).
3. This app would suggests the employee's preference of role-choice via a donut chart - displayed in the drawer.
4. Upon a new shift is edited and saved, auto-scroll is applied to enable the user to view the change quickly.
5. UTC time is also viewable for various functionalities, as the time in Perth is a bit off for the role's description.

### Development Decisions
The main reason for me to adopt Redux into this project is to demonstrate my capability of utilising a popular framework that goes with React. Redux is known to have quite a bit of learning curve, and this app shows that I had overcome such challenges. With Redux, I can structure my code to make a clear distinction between state-changing actions and the usual component functions. Any functions that requires updating the application states are kept in "action.js". Dispatching an action will triggers the "reducer.js" to swap states stored in "store.js" in an immutable fashion. Functions that does not change the application state (e.g. processing function that generates a view) are all kept in components and containers.

Components and containers are similar but differs in way how each represents. Containers used in this instance are usually screens that contains a collection of components. On the other hand, components are individual features (e.g. donut chart, timeline) that can be placed into a container for creating a meaningful UI. Containers are considered "smart elements" that contains state-changing actions and states, connected with "store.js" via "connect()()". Containers are "dumb elements" that does not manage any states, but relies on props passing down from the container to change their view.

I have largely use functional components in this project and exposes them for easier unit testing. Unit testing is done in JEST and Enyzme. The objectives of my test are to ensure the majority of functions behave as intended, plus keeping the testing coverage as high as possible. This ensures most of the parts of the application are tested.

Styled-Components are used heavily for styling. The decision to favor in this module is due to the ability to preprocess the element-style in ES6. Plus, the code is cleaner doing this way without having "className" property polluted in JSX. Nevertheless, some third-party components that are difficult to style via this module, their styles are placed in "style.css".

### Design Decisions
With regards to the design, I believe a table form and a timeline visualisation is best suited for this rostering application. The table view is sorted based on "start_time" for the grouping the shifts. This is useful for grouping people working in the same hours. The time-based data generated in each view are facilitated using the popular MomentJs library.

For not overwhelming the user with information on the table, I had used a drawer to solve this problem. The drawer displays a selected shift's information as well as the employee's preference of role - represented via a donut chart. The prefernce is calculated by the amount of different roles taken by an individual employee.

The ability to edit a shift is located in the drawer. The UI for editing a shift is displayed in the drawer showing a drop-down box for role selection, and a calendar for date picking. The calendar uses UTC timing rather than Perth timezone so that the selections are standarised and accurate with the role description. Nevertheless, upon modifying the data, below the calendar shows the new work-hours in both Perth timezone and UTC. Once the edit is saved, state is updated to change the view in the drawer, and the tabular view will auto-scroll to the row that has been relocated - easier for the users to observe the change.

The timeline visualisation can be accessed by the top navigation menu. I have used React-Calendar-Timeline as a base module for this feature. The challenge in using this module is that it always shows the local-time in Brisbane. In order to meet the required objectives, I have to do a some of string manipulation and date formating on the current time-data to be able to visualise the correct timing in the timeline. 

The timeline becomes useful in visualising the pattern of shift assigned to each employee throughout the week. It is also useful when it comes to see whether an employee has overworked in a day. An overworked employee will have time-blocks overlaid with each other leaving no gaps, which is particularly important for an rostering application. The future work is to able to click on the time-block and jumps to a page that can edit the shift.
