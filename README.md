### Author: Akomolafe Tosin

## Requirements
1.  Rabbitmq
2.  Node v10

## Steps to run the project
### clone project
### create a .env file
### npm start - start project
### node app/queues/consumers/interest/calculation/index.js - run queue

## Note
#### cron job run every monday by 12am - calculate interest

#### cron job push task to queue and rabbitmq process it

### routes

#### POST http://localhost:{port}/drivers - endpoint to profile driver
#### POST http://localhost:{port}/associations - endpoint to profile associations
#### PUT http://localhost:{port}/associations/:id - endpoint to update association
#### POST http://localhost:{port}/drivers/save - endpoint to save daily
#### PUT http://localhost:{port}/transactions/:id - endpoint to update transactions
#### GET http://localhost:{port}/drivers/:id/transactions/ - endpoint to retrieve transactions and saving history