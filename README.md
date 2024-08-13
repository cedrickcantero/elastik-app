# Elastik App

Elastik is an innovative platform that supports, connects, and empowers everyone involved in a child's school journey. This app is part of a challenge to implement core functionalities for teachers, including login, student management, and data display.

## Features

- **Teacher Login:** Secure login for teachers using AWS Cognito.
- **Create Students:** A module for teachers to add students with validation.
- **Display Students:** A module to display a list of students created by the teacher.
- **Remove Students:** Functionality to remove students from the list (if implemented).

## Technologies Used

- **Frontend:** ReactJS
- **UI Library:** CoreUI / DevExtreme
- **Backend:** AWS (Amplify, Cognito, Lambda, DynamoDB, AppSync)
- **Version Control:** Git & GitHub

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- AWS Account with necessary services set up (Cognito, Lambda, DynamoDB)
- Git installed

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/elastik-app.git
   cd elastik-app
   ```

## Setting Up the Project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/elastik-app.git
   cd elastik-app

   ```

2. **For the frontend**

cd frontend
npm install

3. **For the backend**

cd ../backend
npm install

4. **ENV Variables**
   for the env variables ask the author, once you have it, create a .env file in /backend and paste the contents from the file

5. **Once you have the env variables**
    npm run start
it will start both frontend and backend
