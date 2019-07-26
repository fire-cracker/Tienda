# NodeJs Project

[![Build Status](https://travis-ci.com/oyedejipeace/Tienda.svg?token=C7qrnLuS7xqsUSoZ57Au&branch=develop)](https://travis-ci.com/oyedejipeace/Tienda)


## Table of Contents

* [Project Overview](#Project-Overview)
* [Features](#Features)
* [Built with](#built-with)
* [APP Link](#APP-link)
* [API Documentation](#API-Documentation)
* [API End Points](#API-End-Points)
* [Known Issues](#Known-issues)
* [Installation](#Installation)
* [Test](#Test)
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


## APP Link
[Link](https://fire-cracker-tienda.herokuapp.com/) to app on heroku.


## API Documentation
POSTMAN API documentation  [here](https://documenter.getpostman.com/view/5148818/SVYjV3mH/)

## API End Points
<table>
	<tr>
		<th>HTTPS</th>
		<th>ENDPOINT</th>
		<th>DESCRIPTION</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/customers</td> 
		<td>User Registration</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>customers/login</td> 
		<td>Login Cutomer</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/customers/facebook</td> 
		<td>Social login</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/customers</td> 
		<td>Update Cutomer account</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/customers/address</td> 
		<td>Update Cutomer Address</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/customers/creditcard</td> 
		<td>Update Customer credit card detail</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/products/</td> 
		<td>Fetch all products</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/products/inCategory/:categoryId</td> 
		<td>Fetches products based on Category</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/products/inDepartment/:department</td> 
		<td>Fetches products based on Department</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/products/search</td> 
		<td>Search for products</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/products/:productId/details</td> 
		<td>Get details of a product</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/shoppingcart/add</td> 
		<td>Adds product to Shopping Cart</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/orders</td> 
		<td>Create an order</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/stripe/charge</td> 
		<td>Create charge with Stripe</td>
	</tr>
</table>  

 
 ## Known issues
Everything works as expected; However:
- This project is just a backend app, i.e. no frontend implementation.


## Installation
- $ git clone `https://github.com/oyedejipeace/tienda.git`
- $ cd tienda
- $ npm i , to install dependencies
- Create .env file using the .env.sample file as a guide
- $ npm start:dev, to start the server
Once the server starts-up, you can query the api at `http://localhost:5000/` using the end points stated above.

## Test
- $ npm test

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using `https://github.com/oyedejipeace/tienda.git`

> Make Contributions

> 🔃 Create a new pull request using `https://github.com/oyedejipeace/tienda/compare`

## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license](https://oyedejipeace.github.io/tienda/LICENSE.md)**
- Copyright 2018 © <a href="https://github.com/oyedejipeace/tienda" target="_blank">Tienda</a>

