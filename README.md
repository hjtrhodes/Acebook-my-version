# ACEBOOK 
### (Initially cloned from Makers Acebook Project Seed)

## Live Deploy
Click here to see the deployment: [Acebook](https://acebook-mo3r.onrender.com/login)

## Functionality Demo
Click to open on Youtube
[![Video](https://img.youtube.com/vi/t2ITyMQkPe0/0.jpg)](https://www.youtube.com/watch?v=t2ITyMQkPe0&t=106s)

This is my cloned version of the project repo to continue development at project completion.
I was responsible for the likes functionality, display order on the Feed Page and all styling. I also contributed via pairing to the comments functionality and images upload functionality.

We worked in a team of 5 on this project using the MERN stack and testing with Jest and Cypress. The aim was to create a Facebook clone from a legacy codebase in under 2 weeks, further practice version control and working in a team with agile methodology. Additionally, I developed more confidence with React and JSX, particularly using asynchronous operations inside useEffect hooks to trigger re-renders at the correct time. As a team we elected to work the full stack, responsible for our feature in both back and front end. Group Members were Ray Brown, Harry Rhodes, Dave O'Donnell, Perran Thomas and Liza Tarasova.

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
