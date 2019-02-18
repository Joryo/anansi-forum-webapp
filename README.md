<p align="center">
  <img width="250" src="https://raw.githubusercontent.com/joryo/anansi-forum-webapp/master/public/big-logo-vertical.png">
</p>

A web client for [Anansi Forum API](https://github.com/Joryo/anansi-forum-api), run on [React](https://reactjs.org/).

## Installation

### Needs
This web client work with [Anansi Forum API](https://github.com/Joryo/anansi-forum-api).

### Configuration
Edit the '.env.template' file with your personnal configuration before running the app and rename it '.env'.

**Parameters**

* REACT_APP_API_URL: The api endpoint to call. Write here the URL of your [Anansi Forum API](https://github.com/Joryo/anansi-forum-api) server.
* REACT_APP_SITENAME: The name of your forum. It will be visible as title on the browser.

### Serve the webapp

Make sure you have [Node.js](https://nodejs.org/), [yarn](https://yarnpkg.com/fr/docs/install) and [serve](https://www.npmjs.com/package/serve) installed.

1. Clone or Download the repository

  ```
  $ git clone https://github.com/Joryo/anansi-forum-webapp.git
  $ cd anansi-forum-webapp
  ```
2. Install Dependencies

  ```
  $ yarn install
  ```
2. Edit configuration file ```.env.template``` with your config (see [Configuration](#configuration)) and rename the file to ```.env```

3. Build the application

  ```
  $ yarn build
  ```
4. Serve the application on port 8080 for example

  ```
  $ serve -l 8080
  ```
Your app should now be running on [localhost:8080](http://localhost:8080/).