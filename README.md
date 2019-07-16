# NodeJs Project

[![Build Status](https://travis-ci.com/oyedejipeace/Node.svg?token=C7qrnLuS7xqsUSoZ57Au&branch=develop)](https://travis-ci.com/oyedejipeace/Node)


## Table of Contents

* [Project Overview](#Project-Overview)
* [Features](#Features)
* [Built with](#built-with)
* [API End Points](#API-End-Points)
* [Known Issues](#Known-issues)
* [Installation](#Installation)
* [Contributing](#contributing)
* [License](#License)

## Project Overview
**NodeJs Project** is the backend of build of an e-commerce system which allows users to search, add items to their shopping cart, create orders, and checkout successfully.it was built from scratch using `mysql` , `sequelize` , `JavaScript` and `Node.js`

## Features

- Users can register/login using website custom forms, or through facebook,
- Users can search items through search box
- Users can see item details by selecting a specific item
- Users can add items to their shopping carts
- Users can update personal profiles with shipping addresses and other info
- Items are displayed properly based on the selected department and category
- Users can view all items when entering the website.


## Built with
- `sql`
- `mysql`
- `sequelize`
- `JavaScript`
- `Node.js`
- `Express framework`

##### Middle Wares
- `body-parser`
- `morgan`

## API End Points
- `POST /customers`                          -   User Registration
- `POST customers/login`                     -   Login User
- `PUT /customers`                           -   Update User account
- `GET /customers/facebook`                  -   Social login
- `GET /products/`                           -   Fetches all available products
- `GET /products/inCategory/:categoryId`     -   Fetches products based on Category
- `GET /products/inDepartment/:department`   -   Fetches products based on Department
- `GET /products/search`                     -   Search for products
- `GET /products/:productId/details`        -   Get details of a product
- `POST /shoppingcart/add`               -   Adds product to Shopping Cart

 
 ## Known issues
Everything works as expected; However:
- the building of the project is not yet complete, i.e. more features are being added.


## Installation
- $ git clone `https://github.com/oyedejipeace/Node.git`
- $ cd Node
- $ npm i , to install dependencies
- $ npm start, to start the server
Once the server starts-up, you can query the api at `http://localhost:5000/` using the end points stated above.

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using `https://github.com/oyedejipeace/Node.git`

> Make Contributions

> 🔃 Create a new pull request using `https://github.com/oyedejipeace/Node/compare`

## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license](https://oyedejipeace.github.io/Node/LICENSE.md)**
- Copyright 2018 © <a href="https://github.com/oyedejipeace/Node" target="_blank">Node Project</a>

