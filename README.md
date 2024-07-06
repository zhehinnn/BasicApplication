This is an app with basic functionalities, featuring a Login page, where users can either login or sign up, as well as a profile page, featuring an About Me, where users can create a description of themselves.

The description can be changed and saved either as a final copy, or saved as a draft. Saving it as a draft will mean that when it is opened again, the draft will pop up.

Some level of security is done through the usage of express-session middleware, and only using a setter of the isLoggedIn variable, accessing and changing the original variable is not possible.

The frontend includes the usage of React with CSS integration, showing a simple display of design, where the Navigation Bar can be navigated and can be seen which page is currently active. The color palette was chosen based on the creator's personal preference, and does not adhere to any specific standards.

The backend is done using Node.js, in which MySQL is integrated into. Each button serves a different function, and all interactions between the webpage and MySQL database is done through the server.js file, including the establishment of connections between MySQL and the application, as well as modifying and creating new rows.