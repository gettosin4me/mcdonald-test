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

##### Request Body
```javascript

{
	"name": "onyeka driver",
	"address": "Kwaye",
	"phone_number": "07035038934",
	"association": "5ddd44d1cd9c6ebbe0dcaa60",
	"password": "123456"
}

```

##### Response

```json

{
  "current_url": "localhost/drivers",
  "message": "Successfully Created",
  "data": {
    "name": "onyeka driver",
    "phone_number": "07035038934",
    "account_number": "9766423725",
    "account_balance": "0",
    "deleted_at": null,
    "address": "Kwaye",
    "association": {
      "name": "NURTW Onipanu",
      "address": "Lagos",
      "_id": "5ddd44d1cd9c6ebbe0dcaa60",
      "created_at": "2019-11-26T15:29:21.706Z",
      "updated_at": "2019-11-26T15:29:21.706Z",
      "__v": 0,
      "id": "5ddd44d1cd9c6ebbe0dcaa60"
    },
    "created_at": "2019-11-26T18:34:05.272Z",
    "updated_at": "2019-11-26T18:34:05.272Z",
    "id": "5ddd701d531dc35706454508"
  },
  "status": "Success"
}

```

#### POST http://localhost:{port}/associations - endpoint to profile associations

##### Request Body

```json

{
    "name": "NURTW Onipanu",
    "address": "Lagos"
}

```

##### Response


```json

{
  "current_url": "localhost/associations",
  "message": "Successfully Created",
  "data": {
    "name": "NURTW Onipanu",
    "address": "Lagos",
    "created_at": "2019-11-26T15:29:21.706Z",
    "updated_at": "2019-11-26T15:29:21.706Z",
    "id": "5ddd44d1cd9c6ebbe0dcaa60"
  },
  "status": "Success"
}

```

#### PUT http://localhost:{port}/associations/:id - endpoint to update association

##### Request Body

```json

{
    "name": "NURTW Onipanu",
    "address": "Lagos1"
}

```

##### Response


```json

{
  "current_url": "localhost/associations/5ddd3dc0d6f252a33d432779",
  "message": "Successfully Updated",
  "data": {
    "name": "NURTW Onipanu",
    "address": "Lagos1",
    "created_at": "2019-11-26T14:59:12.337Z",
    "updated_at": "2019-11-26T15:12:41.586Z",
    "id": "5ddd3dc0d6f252a33d432779"
  },
  "status": "Success"
}

```


#### POST http://localhost:{port}/drivers/save - endpoint to save daily

##### Request Body

```json

{
	"amount": 3000,
	"driver_id": "5ddd5119ffa585e627914f68"
}

```

##### Response

```json

{
  "current_url": "localhost/drivers/save",
  "message": "Successfully Updated",
  "data": {
    "balance_as_at_now": "",
    "updated_account_balance": "",
    "status": "pending",
    "deleted_at": null,
    "amount": "3000",
    "driver": {
      "name": "onyeka driver2",
      "phone_number": "07035038934",
      "account_number": "3750970909",
      "account_balance": "8000",
      "password": "$2b$08$ULPS0TnLgtB4zcBW4wNlVOruK25DhAyBA.wSnH/9ZVZdYBnRLhFLG",
      "deleted_at": null,
      "_id": "5ddd5119ffa585e627914f68",
      "address": "Kwaye",
      "association": "5ddd44d1cd9c6ebbe0dcaa60",
      "created_at": "2019-11-26T16:21:45.230Z",
      "updated_at": "2019-11-26T18:24:34.052Z",
      "__v": 0,
      "id": "5ddd5119ffa585e627914f68"
    },
    "created_at": "2019-11-26T18:27:07.669Z",
    "updated_at": "2019-11-26T18:27:07.669Z",
    "id": "5ddd6e7bc643644fa315ff98"
  },
  "status": "Success"
}

```

#### PUT http://localhost:{port}/transactions/:id - endpoint to update transactions

##### Request Body

```json

{
	"driver_id": "5ddd5119ffa585e627914f68",
	"amount": 3000,
	"status": "success"
}

```

##### Response

```json

{
  "current_url": "localhost/transactions/5ddd6e7bc643644fa315ff98",
  "message": "Successfully Updated",
  "data": {
    "balance_as_at_now": "8000",
    "updated_account_balance": "11000",
    "status": "success",
    "deleted_at": null,
    "amount": "3000",
    "driver": {
      "name": "onyeka driver2",
      "phone_number": "07035038934",
      "account_number": "3750970909",
      "account_balance": "11000",
      "password": "$2b$08$ULPS0TnLgtB4zcBW4wNlVOruK25DhAyBA.wSnH/9ZVZdYBnRLhFLG",
      "deleted_at": null,
      "_id": "5ddd5119ffa585e627914f68",
      "address": "Kwaye",
      "association": "5ddd44d1cd9c6ebbe0dcaa60",
      "created_at": "2019-11-26T16:21:45.230Z",
      "updated_at": "2019-11-26T18:27:14.767Z",
      "__v": 0,
      "id": "5ddd5119ffa585e627914f68"
    },
    "created_at": "2019-11-26T18:27:07.669Z",
    "updated_at": "2019-11-26T18:27:14.757Z",
    "transaction_date": "2019-11-26T18:27:14.756Z",
    "id": "5ddd6e7bc643644fa315ff98"
  },
  "status": "Success"
}

```

#### GET http://localhost:{port}/drivers/:id/transactions/ - endpoint to retrieve transactions and saving history

##### Request Params

```json

    {
        "id": "5ddd6e7bc643644fa315ff98"
    }

```

##### Response

```json

{
  "current_url": "localhost/drivers/5ddd5119ffa585e627914f68/transactions",
  "message": "success.fetched",
  "data": {
    "balance": "11000",
    "history": {
      "data": [
        {
          "balance_as_at_now": "0",
          "updated_account_balance": "5000",
          "status": "success",
          "deleted_at": null,
          "amount": "5000",
          "driver": "5ddd5119ffa585e627914f68",
          "created_at": "2019-11-26T16:50:29.939Z",
          "updated_at": "2019-11-26T17:28:30.357Z",
          "transaction_date": "2019-11-26T18:27:14.756Z",
          "id": "5ddd57d5f129dfff13095abc"
        },
        {
          "balance_as_at_now": "5000",
          "updated_account_balance": "8000",
          "status": "success",
          "deleted_at": null,
          "amount": "3000",
          "driver": "5ddd5119ffa585e627914f68",
          "transaction_date": "2019-11-26T18:27:14.756Z",
          "created_at": "2019-11-26T17:52:25.701Z",
          "updated_at": "2019-11-26T18:24:34.037Z",
          "id": "5ddd6659c9e03f330ce76bf5"
        },
        {
          "balance_as_at_now": "8000",
          "updated_account_balance": "11000",
          "status": "success",
          "deleted_at": null,
          "amount": "3000",
          "driver": "5ddd701d531dc35706454508",
          "created_at": "2019-11-26T18:27:07.669Z",
          "updated_at": "2019-11-26T18:27:14.757Z",
          "transaction_date": "2019-11-26T18:27:14.756Z",
          "id": "5ddd6e7bc643644fa315ff98"
        }
      ],
      "meta": {
        "total_items": 3,
        "limit": 20,
        "total_page": 1,
        "page": 1
      }
    }
  },
  "status": "Success"
}

```