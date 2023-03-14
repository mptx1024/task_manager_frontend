# MERN Task Manager built with React, Redux RTK Query, MUI 5, Nodejs and Firebase Auth

### Web

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTIyYWQ2NzBjNThiMzZiYzMzOWI4ZGE2ZmM1MGQ4YTQ2NDZkMDBkNiZjdD1n/aNBKcmKwhsaakNrhMN/giphy.gif)

### Mobile

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzRkZDgxMjFjY2I3NDFkNjFhZjBmOTk2OTVmNGQxZTEyMmE2MDZhMCZjdD1n/W9k8QGNVqPO7bQ17US/giphy.gif)

## Check out [live demo](https://task-manager003.vercel.app/)

## [_This is the frontend repo. For backend repo please [click here](https://github.com/fjiasigmoid/todo_backend)_]

🚀 Task Manager integrated with caching techniques to optimize UI performance

## Features

-   Create and modify task with Due date, Priority and Project
-   Mobile responsiveness & Dark theme
-   Filter by Priority, Date, Projects, and Overdue
-   Solcial and anonymous login

## Highlights

-   ### Frontend

    -   [Redux RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching and cache management
    -   [Opimistic update strategy](https://itnext.io/caching-in-a-pwa-when-to-use-optimistic-vs-pessimistic-d627a5943990)
        -   Update cache in parallel with running queries, allowing instant UI response to user
    -   [Automated re-fetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching) with tagging system
        -   Optimize data fetching and reduce unnecessary network requests
    -   Persistent login
        -   Restore app state & data after refreshing pages
    -   Integrate with [Firebase Auth](https://firebase.google.com/products/auth)
        -   Social and anonyous login
    -   Dark mode with [MUI v5](https://mui.com/material-ui/customization/dark-mode/)

-   ### Backend

    -   JWT token authentication
    -   Automatically create & destroy template tasks and anonymous user records

## Getting started

<span style="color:red">(To run the app you also need to install the [backend repo](https://github.com/fjiasigmoid/task_manager_backend))</span>

### Requirements

1. nodejs and npm
2. Firebase authentication:

-   The app uses [Firebase auth client SDK](https://firebase.google.com/docs/firestore/client/libraries) (for both social or anonymous login). You need to create a Firebase app and get credentials. It's free and easy. You can follow this [tutorial](https://medium.com/nerd-for-tech/how-to-add-firebase-to-your-javascript-project-1cb998b51856).
-   Once the project is created, [download or copy your project's config credentials](https://support.google.com/firebase/answer/7015592#zippy=%2Cin-this-article)

### Install

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/fjiasigmoid/task_manager_frontend.git my-project-name
cd my-project-name
npm install
```

Create an .env file on the root directory. Copy paste below code in it and repace 'your_firebase_credentials' with your Firebase credentials:

```
NODE_ENV=development

#Your backend server endpoint (see backend repo link)
REACT_APP_API_END_POINT = http://localhost:3500/api/v1

#Your Firebase credentials
REACT_APP_FIREBASE_API_KEY=your_firebase_credentials
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_credentials
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_credentials
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_credentials
REACT_APP_FIREBASE_MESSAGINGSENDER_ID=your_firebase_credentials
REACT_APP_FIREBASE_APP_ID=your_firebase_credentials
```

Run locally with live reload:

```
npm start
```

Open http://localhost:3000 with browser to see your project✨

### App structure

```
.
├── README.md            # README file
├── next.config.js       # Next JS configuration
├── public               # Public folder
├── src
│   ├── api              # Redux store and apiSlice
│   ├── components       # Shared components used across the entire app. Footer, Layout, etc.
|   │    ├── nav         # Navigation bar and side bar components
|   │    ├── page        # Page components for filter options in the side bar
|   │    ├── muiTemplate # MUI templates used across the entire app
|   │    └── assets      # Svg icons
│   └── features         # Feature components and api hooks related to a specific feature
│       ├── auth         # Login and auth components
│       ├── todo         # Todo components
        ├── project      # Todo components
        └── util         # Utility folder
```

### Deploy to Vercel

Deploy this frontend on Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffjiasigmoid%2Ftask_manager_frontend&demo-url=https%3A%2F%2Ftask-manager003.vercel.app%2F)

-   Don't for get to place firebase credentials in Environment Variable.
-   You would also need to deploy the [backend](https://github.com/fjiasigmoid/task_manager_backend.git)

Made with ♥ by [fjiaSigmoid](https://github.com/fjiaSigmoid)
