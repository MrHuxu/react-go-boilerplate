# React Go Boilerplate

## Description

A boilerplate for fastly building web application based on React & Go.

## Requirements


1. Linux or Mac OS
2. Node.js (7.10.0 or higher)
3. Go (1.8.1 or higher)

## Features

- Frontend

  - [x] Components powered by [React](https://github.com/facebook/react)
  - [x] State management powered by [Redux](https://github.com/reactjs/redux)
  - [x] Stylesheet management powered by [Radium](https://github.com/FormidableLabs/radium)
  - [x] Fully-featured router management powered by [react-router](https://github.com/ReactTraining/react-router)
  - [x] Hot reload powered by [react-hot-loader](https://github.com/gaearon/react-hot-loader) (module level hot reload only for stateful component)

- Backend

  - [x] Web framework powered by [Gin](https://github.com/gin-gonic/gin)
  - [x] Hot reload powered by another [Gin](https://github.com/codegangsta/gin)

## Usage

1. Clone the repo and install all dependencies:


        github.com/MrHuxu/react-go-boilerplate && cd $GOPATH/src/github.com/MrHuxu/react-go-boilerplate

        go get github.com/codegangsta/gin
        npm install

2. Run server:

    - Development mode

          # execute the command below
          # go visit http://localhost:8283 in your browser
          # editing any file will let the server or frontend reload

          npm run dev

    - Production mode

          # execute the command below
          # all assets will be compiled to server/public/bundle.js
          # go visit http://localhost:13109 in your browser

          npm run prd