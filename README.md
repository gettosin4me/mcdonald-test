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