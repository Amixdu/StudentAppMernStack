# Startup Instructions

Name: Amindu Kumarasinghe <br>
Email: amixxdu@gmail.com <br>
App Hosted On Heroku: https://studentapplicationmern.herokuapp.com/ <br>

Prerequisites:<br>
NodeJS: https://nodejs.org/en/download/<br>
Docker: https://docs.docker.com/get-docker/<br> <br>


## Project Information

Frontend - ReactJS <br>
Backend - NodeJS + Express <br>
Database - MongoDB <br>
Authentication - JWTs <br> <br>


## Project Setup

### Step 1
Clone the repo using: <br> `git clone https://github.com/Amixdu/StudentAppMernStack.git` <br>
And go into the directory using `cd StudentAppMernStack`
<br><br>

### Step 2
In the project directory, run the command `docker-compose up` to get everything started up (run `docker-compose build --no-cache` if any issues arise) <br><br>


### Step 3
Access the app at http://localhost:3000/

```diff
- IMPORTANT:  Please ensure ports 3000 and 8000 are free
```

<br>

### Note
#### Running without docker:
First run `npm install` then run `npm start` on both the frontend directory and the backend directory seperately. <br> Then access localhost the app through the link in step 3
<br><br>

## Using The App

Sample admin account for convenince (not first time login): <br>
email: admin1@gmail.com <br>
pw: password <br><br>

Sample student account for convenince (not first time login): <br>
email: student1@gmail.com <br>
pw: password <br><br>


### Adding an admin
An initial admin seeder file can be run by following these steps:<br>
1. Move to the backend directory <br>
2. Run `node admin_seeder.js` <br>
3. This will create an admin with the email 'admin@gmail.com'<br>
4. Use this email with the password `password` for a first time login, where you can fill up the information and reset the password
<br><br>

### Adding students
1. Login as an admin <br>
2. Click the `Add Students` button on the top left <br>
3. Enter a valid email adress and click create<br>
4. An email will be sent to the entered email with a login link and a password<br>
5. Login using the password, and fill up user information and reset the password<br><br>


### Completion
10/11 Development tasks completed (unit testing not done)



