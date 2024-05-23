# Nextjs App role based

## Goal

- There are some cases when in a web app we need to support user roles and based on those show/hide some components and/or, allow or not allow some functionalities.
- The purpose of this repo is to implement a solution for a web app role based.

## Requirements

- Docker and Docker compose (For MongoDB container)
- Nodejs +20
- Corepack
- Yarn 3.8.2
- Auth0

## What was used here

- Typescript
- Nextjs 14
- React
- Mantine (For UI Components)
- MongoDB

## Initialize project

- Since this project is using `yarn@3.8.2` with corepack enabled, you need to initialize the project like so:
```shell
$ ./init.sh
```

- This step needs to be executed just once.

## How to run

### First steps

- Get the MongoDB server up an running before the Nextjs App, we need to run `docker compose up`.
- Install dependencies for the Nextjs app just by running `yarn`.

### Ready to go!

- Now just need to run `yarn dev`, the app will be running at http://localhost:3000.