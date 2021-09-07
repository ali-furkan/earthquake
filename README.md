# Earthquake API

First of all, this repo is a [Kandilli](http://sc3.koeri.boun.edu.tr/eqevents) wrapper api. This repo has no commercial meaning. It just increases accessibility for web services.

Project developed with [Nest.js](https://nestjs.com). Sample publish project [here](https://earthquake.alifurkan.co)

Also You can deploy with Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ali-furkqn/earthquake)

## 📦 Setup

- First, Check your machine has nodejs. You can download [here](https://nodejs.org/en/)
- Clone this project
```sh
    git clone https://github.com/ali-furkqn/earthquake
    cd earthquake
```
- Download the project dependencies
```sh
    npm install
```
- Copy `env.example` and paste it as `.env` fill the fields ( You can also skip this step )
- Finally you can start the project
    - To start as development mode: `npm run start:dev`
    - To start as production mode:
        - Build the project: `npm run build`
        - Start the project: `npm run start:prod`

**Note:** You can also run with Docker if you know docker

## LICENSE

This repo licensed under the [MIT license](./LICENSE)
