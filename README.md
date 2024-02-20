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

### My responsibilities:

Project Sprints: 
I was responsible for the likes functionality, display order on the Feed Page and all styling. I also contributed via pairing to the comments functionality and images upload functionality.

## Functionality Added Since Project Completion



## Challenges/Actions we took to overcome






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
