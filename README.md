# Nextjs App Role Bbased

## Goal

- There are some cases when in a web application we need to allow or not some functionalities or actions based on user role permissions.
- The purpose of this repo is to implement a solution for this "problem" on a Nextjs App.

## Requirements

- Docker and Docker compose (For MongoDB container)
- Nodejs +20
- Yarn
- Auth0 (Regular Web Application + Machine to Machine)

## ESlint + Prettier

### If you use VS Code

- You'll need to install the official extensions:
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### If you use Webstorm (like me)

#### ESlint

- Open Settings and enable Eslint with automatic configuration: `Settings -> Languages & Frameworks -> Javascript -> Code Quality Tools -> ESLint` and thick `Run eslint --fix on save`.

- Open Settings and enable Prettier with automatic configuration: `Settings -> Languages & Frameworks -> Javacript -> Prettier` and thick `Run on save`.

## What was used here

- Typescript
- Nextjs 14 (page router)
- React 18
- Mantine (For UI Components)
- Docker & Docker Compose
- MongoDB

## How to run

### First steps

- Get the MongoDB server up an running before the Nextjs App, we need to run `docker compose up`.
- Install dependencies for the Nextjs app just by running `yarn`.

### Ready to go!

- Now just need to run `yarn dev`, the app will be exposed at http://localhost:3000.

### Database client manager

- For this I'm using Mongo Express running at http://localhost:8081.
- In order to access to the manager the credentials are `admin` as username and `pass` as password.
