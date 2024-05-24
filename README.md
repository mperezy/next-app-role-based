# Nextjs App role based

## Goal

- There are some cases when in a web app we need to support user roles and based on those show/hide some components and/or, allow or not allow some functionalities.
- The purpose of this repo is to implement a solution for a web app role based.

## Requirements

- Docker and Docker compose (For MongoDB container)
- Nodejs +20
- Yarn
- Auth0 (Regular Web Application + Machine to Machine)

## What was used here

- Typescript
- Nextjs 14
- React
- Mantine (For UI Components)
- MongoDB

## How to run

### First steps

- Get the MongoDB server up an running before the Nextjs App, we need to run `docker compose up`.
- Install dependencies for the Nextjs app just by running `yarn`.

### Ready to go!

- Now just need to run `yarn dev`, the app will be exposed at http://localhost:3000.