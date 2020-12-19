# Car Listing Marketplace

## How to Usage

```bash
$ git clone git@github.com:KevinH2810/elastic-search.git
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
localhost:{port}/v1/Login/
# [POST] - to register
localhost:{port}/v1/Login/register
# [GET, POST, PUT, DELETE]
localhost:{port}/v1/Citizen/
```

## Login

---
### [POST] - /v1/Login/Register
you can register a new user in here by supplying the username and password as request query (Params).

```Params - username & password```

---
### [GET] - /v1/Login/

Used to login and generate the JWTtoken
the token are available for 24 Hours by supplying username and password.
as request query (Params).

```Params - username & password```

## Citizen

---
### [GET] - /v1/Citizen/

Used to add Citizen to the database.
you can supply username and money, JWT token are needed in the header as Bearer Token to validate the user that's gonna input the data.

```
Params :

search
```

---
### [POST] - /v1/Citizen/
Get the list of all available tokens.

```
Params 
(Body - x-www-form-urlencoded):

Name
Email
PhoneNumber
Address
City
State
Country
CompanyName
JobTitle
JobDescription
JobType
```

---
### [PUT] - /v1/Citizen/
Get the list of all available tokens.

```
Params 
(Body - x-www-form-urlencoded):

id [must](_id: of the data, can be acquired when search the data)
Name
Email
PhoneNumber
Address
City
State
Country
CompanyName
JobTitle
JobDescription
JobType
```

---
### [DELETE] - /v1/Citizen/
Get the list of all available tokens.

```
Params:

id [must](_id: of the data, can be acquired when search the data)
```