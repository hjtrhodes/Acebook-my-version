# ACEBOOK 
### (Initially cloned from Makers Acebook Project Seed)

## Live Deployment
Click here to see the deployment: [Acebook](https://acebook-mo3r.onrender.com/login)

## Functionality Demo - Opens on Youtube
[![Video](https://img.youtube.com/vi/t2ITyMQkPe0/0.jpg)](https://www.youtube.com/watch?v=t2ITyMQkPe0&t=106s)

## Project Description
This is my cloned version of the project repo to continue development at project completion - details of my work after project completion can be found below in 'Functionality Added Since Project Completion'

This was my second project at Makers. We worked in a team of 5 developers using an Agile process. The aim was to create a Facebook clone from a legacy codebase in under 2 weeks and further practice version control using GitHub. As a result of this project I developed more confidence with React, understanding the relationships between front and back end and particularly using asynchronous operations inside useEffect hooks to trigger re-renders at the correct time. As a team we elected to work the full stack, responsible for our feature in both back and front end and regularly knowledge share at daily standups.

- Project Timeline: 14 days to MVP
- Main Language: Javascript
- Additional Language since project completion: Typescript
- Tech Stack: React, Express, Node.js, MongoDB
- Testing: Cypress, Jest
- Other Technologies: TailwindCSS, Multer, PostCSS, Vite, Bcrypt

### Planning: Understanding the Codebase and User Stories
As we were starting from a seed codebase we spent some time mapping the relationships between components and files to get a better collective understanding of how it was working. 

Initial Diagram:
![Initial Diagram](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708423983/Demo%20Videos/RelationshipDiagram_aoyohj.png "Initial Diagram")

After more investigation:
![More Detailed Diagram](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708423983/Demo%20Videos/AllComponents_ugqngb.png "More Detailed Diagram")

Understanding Token Creation
![Understanding Token Creation](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708423982/Demo%20Videos/TokenGenerator_l7j5ly.png "Understanding Token Creation")

Then we created User Stories to inform our decison on what MVP would look like
![User Stories](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708423982/Demo%20Videos/User_Stories_p3xopz.png "User Stories")

### Agile Working using Trello
We turned our user stories into tickets and populated the Trello Board
![Trello Board](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708423331/Demo%20Videos/AcebookTrello_obyoyf.png "Trello Board")

## Final Acheived MVP Functionality:
- Locally Hosted MongoDB Database
- Login: Must be unique email and correct password
- Signup: All fields must be completed, email must be correct format, password must be certain length and contain special character
- Post: User can make a post with text
- Image Upload: User can add an image to their post - the image is held in the database using Multer
- Comments: User could add a comment to a post (comment was part of Post component)
- Likes: User can Like/Unlike a Post
- Search: User can search for the content of a post
- Profile Page: User can view their own profile which will diplay only their posts
- NavBar: Simple navbar navigation

### My responsibilities:

Project Sprints:
- Individual responsibilities: Likes, Feed Page display - ensuring it was correctly ordered, all styling
- Supported others by pair programming on: Comments, Image upload

## Functionality Added Since Project Completion

- [x] Database transferred to CloudDB Atlas
- ✅ Project Deployed on Render.com
- ✅ Password Security: Passwords are bcrypt hashed on signup before being stored in database
- ✅ Comments and Comment are now their own component
- ✅ Comment is a separate backend model, has its own routes and controllers
- ✅ Comment Schema has functionality for nested comments
- ✅ User can delete comments
- ✅ User can delete Posts
- ✅ Refactored Likes functionality to simplify it and make less fetch requests, updated Post Model to contain Likes Array of UserIds
- ✅ Post Schema now contains user and comment objects schemas
- ✅ .populate mongoose method added to backend Post and comment functions
- ✅ Search now displays in a Modal and allows you to search for users, it will autofill users based on text
- ✅ Public Profile Pages - User can view other people profiles which contain only their posts
- ✅ Profile Picture Upload
- ✅ Profile picture now displays on posts and navBar
- ✅ New NavBar
- ✅ Installed TailwindCSS and overhauled all styling, removing and replacing all CSS styling
- ✅ All pages are fully responsive to different screen sizes
- ✅ Conditional Rendering added to comments

## Challenges/Actions we took to overcome

Rerendering:
- Forcing certain elements of the web page to rerender was a learning curve. This was difficult in relation to comments and likes functionality. We researched, knowledge shared and pair programmed to understand using/passing/managing state, async functions and useEffect hooks to force rerenders when certain actions take place.  

Too many API requests:
- Often our components were trying to do too much, for example performing a GET request to the api when the data needed was already available in an object that could be passed as a prop. This was the case with Likes functionality and since going back to improve the project I have refactored much of the codebase to utilise OOP rather than overusing fetch requests. 

Components containing too much functionality:
- Some components contained too much functionality, specifically the Post component which was also holding all of the comments functionality. This meant the two had to come as a pair, you could not have a Post without a comment and vice versa. This is bad design and we discussed it during the project but didn't have the necessary skills or time to improve it at the time. Since project completion I have refactored this component, overhauling all comments functionality both back and front end to create a more streamlined, flexible and maintainable structure which adheres more accurately to SOLID principles. 



## How to setup in local env
### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/)
   ```

### Set up your project

1. Fork this repository
2. Clone your fork to your local machine
3. Install Node.js dependencies for both the `frontend` and `api` directories.
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```

5. Install an ESLint plugin for your editor.
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
7. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### How to run the server and use the app

1. Start the server application (in the `api` directory)

  **Note the use of an environment variable for the JWT secret**

   ```
   ; cd api
   ; JWT_SECRET=YOURSECRETHERE npm start
   ```
2. Start the front end application (in the `frontend` directory)

  In a new terminal session...

  ```
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/signup` to create a new user.

Then, after signing up, you should be able to log in by going to `http://localhost:3000/login`.

```
