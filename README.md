<p align="center">
  <a href="" rel="noopener">
 <img src="https://firebasestorage.googleapis.com/v0/b/bank-app-662c8.appspot.com/o/Chimoney.png?alt=media&token=300712b1-609a-4ac6-86b2-93f916ce442b" alt="Project logo"></a>
</p>
<h3 align="center">ChiMoney</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](http://hackathon.url.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> This Project is a simple bank app with the chimoney Api integration
    <br> 
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Dependencies / Limitations](#limitations)
- [Future Scope](#future_scope)
- [Setting up a local environment](#getting_started)
- [Live Server](#live_server)
- [Usage](#usage)
- [Technology Stack](#tech_stack)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## 🧐 Problem Statement <a name = "problem_statement"></a>

The task was to build a simple deployed web application that allows users to create and manage their accounts, send and receive payments, and view transaction history. The application should be built using React with Next.js (or similar frameworks) on the frontend and Node.js with Express on the backend. Firestore/Supabase (for simplicity or another DB of your choice) will be used as the database, and the application should be deployed using Vercel/Render/Heroku/AWS/GCP etc. It should be live and viewable and have CI/CD.

- IDEAL: The desired state of the project after implementation should be one of efficiency, effectiveness, and improved outcomes. The environment should be streamlined, with understandable ui so users can easily navigate through the application.
  The solution should result in increased productivity, reduced errors, and faster turnaround times. It should also lead to cost savings and improved customer satisfaction.

## 💡 Idea / Solution <a name = "idea"></a>

The goal is to develop a React application featuring a user-friendly dashboard for viewing transactions, making payments to other users, and creating an authentication system. Users will be required to sign in before accessing their accounts, and upon signing in, they will receive a test balance for exploring and testing the application's functionalities.

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

This project utilizes a Firestore database in conjunction with the Chimoney API and a React application for the client side. However, navigating the Chimoney API documentation proved challenging due to the lack of clear instructions. And at a point in development i noticed that the output data changed when calling the get user endpoint that took some time to figure out, Cause i was using the wallet balance with type:`chi`.

## 🚀 Future Scope <a name = "future_scope"></a>

I had considered incorporating a customer care feature, but implementing this would necessitate the use of websockets. Unfortunately, the free tier backend services do not support websockets. However, this feature can be integrated at a later stage. and also adding a save feature where user can set how many percent they would liked saved every given month.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Install node on your local machine if you've not you can check the documentation on how to install
```

```
Install a reliable code editor like vs code or others to view the code
```

```
Install git
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

Create a new folder in your local machine
After you are done with the installations you'll clone the github repo
in your terminal of your vs code

```
git clone https://github.com/vhiz/chimoneyBankApp.git .

```

in the main directory of the project you'll install the dependencies

```
npm install
```

then you'll start the development server using

```
npm run dev
```

you'll then go to your browser and enter the url given in your terminal which is

```
http://localhost:5173
```

## 🌄 Live Server <a name = "live_server"></a>

if you don't want to start a development server you can go to the live server


See [demo](https://chimoney-bank-app.vercel.app/)


and you can use the following credentials for testing both for the live and local server

```
user1:
email : vhiz@gmail.com,
password:123456

user2:
email : janet@gmail.com,
password:123456
```

## 🎈 Usage <a name="usage"></a>

first you have to register and you do that with your email phone password and name
<img src="https://firebasestorage.googleapis.com/v0/b/bank-app-662c8.appspot.com/o/register.png?alt=media&token=6e904cbc-ee7a-4770-9975-b385211f921b" alt="Register page"></a>

you'll then login 
<img src="https://firebasestorage.googleapis.com/v0/b/bank-app-662c8.appspot.com/o/login.png?alt=media&token=072aa370-1926-448d-b898-373ff470f1b5" alt="Login page"></a>

after login you'll be directed to the dashboard
<img src="https://firebasestorage.googleapis.com/v0/b/bank-app-662c8.appspot.com/o/Chimoney.png?alt=media&token=300712b1-609a-4ac6-86b2-93f916ce442b" alt="Dashboard"></a>

before making any transaction you are required to set transaction pin
<img src="https://firebasestorage.googleapis.com/v0/b/bank-app-662c8.appspot.com/o/setpin.png?alt=media&token=ba36ee37-a1fa-4257-ba1b-6c37f675e52f" alt="Dashboard"></a>

after your pin is set you can start transaction.

## ⛏️ Built With <a name = "tech_stack"></a>

- [Firebase](https://firebase.google.com/) - Database
- [React](https://react.dev/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [ChiMoney](https://chimoney.readme.io/reference/introduction) - Transaction Api

## ✍️ Authors <a name = "authors"></a>

- [@victor mgbeahurike](https://github.com/vhiz) - Initial work

