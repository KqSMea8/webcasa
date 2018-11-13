## 🛍️ Simple ecommerce carrinho application built with React & Redux
<p align="center">
  <img src="https://img.shields.io/badge/React-16.5.2-blue.svg">
  <img src="https://img.shields.io/badge/Redux-3.7.2-blue.svg?colorB=764abc">
  <img src="https://img.shields.io/badge/Nodejs-6.10.2-blue.svg?colorB=90c53f">
  <img src="https://img.shields.io/badge/Express-4.16.3-blue.svg?colorB=47535e">
  <br/>
  <img src="./react-shopping-carrinho.gif">
</p>

## Basic Overview  [Live Demo](https://react-shopping-carrinho-67954.firebaseapp.com/)

This simple shopping carrinho prototype shows how React components and Redux can be used to build a
friendly user experience with instant visual updates and scaleable code in ecommerce applications. 


#### Features
- Add and remove produtos from the floating carrinho
- Sort produtos by highest to lowest and lowest to highest preco
- Filter produtos by available sizes
- Produtos persist in floating carrinho even after page reloads
- Responsive design for desktop, tablets and mobile
- Produto stoppers for free shipping

#### Using
- React
  * Redux - for application state management
- Nodejs
  * Express CORS Middleware
  * Nodemon - for watching for server changes
- Axios - for promise HTTP requests
- Native local storage API - for produto persistence in floating carrinho
- CSS
  * BEM methodology
  * SASS

## Getting started

#### Requirements

- Node.js
- NPM

### Package installation

Execute the following command on your terminal to install all the needed packages:
``` bash
npm install
```

### Run the API Server

Start the server using:
``` bash
npm run server
```

When done, the produtos API will be running on  `http://localhost:8001/api/produtos`

keep it running on a terminal and go to the next step.

### Start the React App

just execute the following command and thats it! :D
``` bash
npm start
```

The application will start automatically in your browser on `http://localhost:3000`

<br/>

### Copyright and license
The MIT License (MIT). Please see License File for more information.

### Todo
- [ ] Implement filters by URL params using react-router

<br/>
<br/>

<p align="center"><img src="https://avatars2.githubusercontent.com/u/20846473?s=70&v=4" width="35" height="35"/></p>
<p align="center">
<sub>A little project by <a href="http://www.jeffersonribeiro.com/">Jefferson Ribeiro</a></sub>
</p>

