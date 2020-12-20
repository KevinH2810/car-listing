# Car Listing Marketplace

## How to Usage

```bash
$ git clone git@github.com:KevinH2810/car-listing.git
# clone the repository to your computer

$ yarn install or npm install
# install dependencies using yarn or npm

$ yarn start or npm start
# start the app using yarn or npm
```
After clonning the repository, open the folder and rename ```.env.example``` to ```.env``` and setting the value to your desired settings
## Routes

### available routes on this apps are

```bash
# [GET] - to Login
localhost:{port}/login/
# [POST] - to register
localhost:{port}/Login/register
# [GET, POST, PUT, DELETE]
localhost:{port}/v1/Citizen/
```

## Login

### [GET] - /

Login via Facebook oAuth. will generate JWTToken from username + userid supplied by facebook.
the token are available for 24 hour.

After you got the JWT token, you can use the token as the bearer token in Postman to test the routes.

## Brand

---
### [GET] - /Brand/

Used to get Brand Names from Database
you dont have to supply parameters.

---
### [POST] - /Brand/addBrand
used to add Brand name to the database
you can supply brand name, JWT token are not needed in the header

```
Params 
(Body - x-www-form-urlencoded):
 
brandName
```

---

## Color

---
### [GET] - /color/

Used to get color Names from Database
you dont have to supply parameters.

---
### [POST] - /color/addColor
used to add color name to the database
you can supply color name, JWT token are not needed in the header

```
Params 
(Body - x-www-form-urlencoded):
 
colorName
```
---

## Fuel
---
### [GET] - /fuel/

Used to get fuel Names from Database
you dont have to supply parameters.

---
### [POST] - /fuel/addFuel
used to add fuel name to the database
you can supply fuel name, JWT token are not needed in the header

```
Params 
(Body - x-www-form-urlencoded):
 
fuelName
```
---

## Car Model
---
### [GET] - /model/

Used to get all car models from Database.
you dont have to supply parameters.

---
### [GET] - /model/MyCar

Used to get car model from user that logged in from database.
you have to supply token Bearer to get the userId.

---
### [GET] - /model/:id

Used to get car model using id that logged in from database.
you have to supply token id on the url.

---
### [POST] - /model/addCar
used to add car Model for specific user. 
you can supply fuel name, JWT token are needed in the header to supply the userId

```
Params 
(Body - x-www-form-urlencoded):
 
model
brandId
year
colorId
fuelId
engine
```

---
### [PUT] - /model/updateCar
update the information of car Model.
require JWT token in header to validate userId

```
Params 
(Body - x-www-form-urlencoded):

modelid [must](_id: of the data, can be acquired when search the data)
modelName
brandId
year
colorId
fuelId
engine
```

---
### [DELETE] - /model/deleteCar
Delete a car model by id.
require JWT Token header for authorization.

```
Params 
(Body - x-www-form-urlencoded):

modelId [must](_id: of the data, can be acquired when search the data)
```

## Car Availability
---
### [GET] - /listing/

Used to get all car availability from Database.
you can supply parameter, if empty it will default takes today date and availability true

```params date & status (1 for available, 0 for unavailable) (Date Format YYYY-MM-DD)```

---
### [POST] - /listing/addAvail
used to add car availability dates and status. 
JWT token are needed in the header to supply the userId and validate

```
Params 
(Body - x-www-form-urlencoded):
 
date
price
modelId
```
Date Format in YYYY-MM-DD

---
### [PUT] - /model/updateCar
update the information of car Model.
require JWT token in header to validate userId

```
Params 
(Body - x-www-form-urlencoded):

modelid [must](_id: of the data, can be acquired when search the data)
modelName
brandId
year
colorId
fuelId
engine
```

---
### [DELETE] - /model/deleteCar
Delete a car model by id.
require JWT Token header for authorization.

```
Params:

modelId [must](_id: of the data, can be acquired when search the car model )
```