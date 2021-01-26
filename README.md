# test-setup

This repo contains a broken server setup you are expected to fix. The server then needs to give the correct responses to the below questions. 

To run the server, invoke
```
$npm install
$npm start
```

Steps to perform:

### 1. Fork this repo

### 2. Debug the errors which are causing the server to crash at initialization.

### 3. Build a rules engine based one the following parameters:
    
- wallet_balance
- number_of_deposits
- depositted_users

You have an excel sheet attached with the repo (SegmentData.csv) where the values of the params are given with user ids.

NOTE : The excel has limited records. While completing the tasks, consider it is being used by millions of users. Try making it as scalable, dynamic, optimized as possible.


# Use Case:

We build a rule say "depositted_users AND number_of_deposits > 30".
We should be able to test any user_id against this rule it check if the user is belong to this group or not.

These rules could used to target offers to relavent users.

Note:
You are free to use any npm library that makes the implementation easier.

---

## Task 3(a):
Make a system where we can easily store data using the columns mentioned in the Excel. 
Make Sure (GET, PUT, DELETE) operations are fast. 
The given data set has data for 20 users. 
Consider these operations are happening for ~ 1 million users. 
Give us particular api points which can be used to (GET, PUT, DELETE) data from the system.

## Task 3(b): 
Design the system in such a way that we can build rules using the parameters mentioned below 
(wallet_balance,number_of_deposits, depositted_users) with some specific operators ( “AND”, “OR”, “>”, “<”, “=” ). 

I can make any number /type dynamic queries with provided parameters and operators

~~~~ 
- CONDITION CAN BE LIKE 
  - Deposited users and whose wallet balance is greater than 30. (i.e depositted_users AND number_of_deposits > 30)
  - Users who have not deposited but have wallet_balance > certain amount. (i.e depositted_users == false AND number_of_deposits > 30) or (NOT deposited_users AND number_of_deposits > 30)
  - ETC….
  ~~~~

Note: Request can not contain anything other than the operators and parameters. You can use the operators and parameters in any order. Your api should automatically work if new operators and params are added.
~~~
Request could be of the form like
{
  expr:"depositted_users AND number_of_deposits > 30",
  user_id: 1234
}

Respose should be:
{
  value: true/false
}
~~~

Hints and advisory for problem 3: 

1. Wherever possible, using ready to use NPM libraries instead of writing code from scratch, will be preferred and rewarded with higher points. 
2. We clearly need a place to dump all the user data, and either a Database like Postgres or Redis can be used for it. However, using Redis makes the solution more elegant, easy and scalable. However, if not comfortable with Redis, database based solutions can also be used.

      

## General fundaes:
1. You are free to use any publicly available npm library
2. This code was tested in `node v8.1.0` and `npm v5.0.3`. Please update node/npm before starting.
3. You may need to remove the node modules folder and reinstall. Perform by:
```
$rm -rf node_modules/
$npm install
```


## Solution
Use  `npm start` to start the application 

USERS MODULE
Use below apis to manage users

GET     /user/{user_id}
Response: details of user

DELETE  /user/{user_id}

PUT     /user/{user_id}
Request:
min one parameter is required
{
	"has_depositted":true,
	"wallet_balance":1200,
	"number_of_deposits":5
}

you can use above PUT API to add new user by providing all fields 

RE MODULE
`````
Use below API to validate users for given expression

POST  /checkUser

Request:
{
  "expr": "depositted_users AND number_of_deposits < 30 AND wallet_balance > 1000 AND wallet_balance < 1200 ",
  "user_id": 1
}

## Note:
1. Maintain space between each operator and operand
2. list of available operators - ["AND", "OR", "NOT", ">", "<", "=="]. To add more operators add it to config file.
3. list of available operators - ["depositted_users", "number_of_deposits", "wallet_balance"]

