# This codebase was initially cloned from Makers Acebook MERN Project Seed

This is my cloned version of the project repo to continue development at project completion.
I was responsible for the likes functionality, display order on the Feed Page and all styling. I also contributed via pairing to the comments functionality and images upload functionality.

We worked in a team of 5 on this project using the MERN stack and testing with Jest and Cypress. The aim was to create a Facebook clone from a legacy codebase in under 2 weeks, further practice version control and working in a team with agile methodology. Additionally, I developed more confidence with React and JSX, particularly using asynchronous operations inside useEffect hooks to trigger re-renders at the correct time. As a team we elected to work the full stack, responsible for our feature in both back and front end. Group Members were Ray Brown, Harry Rhodes, Dave O'Donnell, Perran Thomas and Liza Tarasova.




## Quickstart Setup for Local

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### Set up your project

1. Fork this repository
2. Rename your fork to `acebook-<team name>`
3. Clone your fork to your local machine
4. Install Node.js dependencies for both the `frontend` and `api` directories.
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```

> You might get warning messages about the installed dependencies at this point. You can ignore them, as long as the installation process doesn't fail. If the setup fails at this point, don't wait for too long and reach out to your coach.

5. Install an ESLint plugin for your editor. For example: [`linter-eslint`](https://github.com/AtomLinter/linter-eslint) for Atom.
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

### How to run the server and use the app (as a human)

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

After logging in, you won't see much but you can create posts using PostMan and they should then show up in the browser if you refresh the page.

### How to run automated tests

The automated tests run by sending actual HTTP requests to the API. Therefore, before anything, you'll need to start the backend server in test mode (so that it connects to the test DB).

**Note the use of an environment variable for the JWT secret**

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=YOURSECRETHERE npm run start:test
```

You should leave this running in a terminal.

Then, you can either run tests for the backend or the frontend following the steps below. 

#### Running tests for the backend

Run the tests in a new terminal session:

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=YOURSECRETHERE npm run test
```

####  Running tests for the frontend

Start the front end in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=YOURSECRETHERE npm start
```

Then run the tests in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=YOURSECRETHERE npm run test
```

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`


