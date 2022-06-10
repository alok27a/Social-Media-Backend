# Social-Media-Backend

> Backend of a Social Media app created using Node, Express and MongoDB

## Quick Start

```bash
# Install dependencies
npm install

# Edit the default.json file with your mongoURI and baseUrl
# Use production.json in production env

# Run
npm start 
OR 
nodemon .\index.js
```

## Endpoints for authentication 

### POST api/auth/register

{
    "username": "xxx",
    "email": "xxx@gmail.com",
    "password": "xxx1234"
}

### POST api/auth/login
{
    "email": "xxx@gmail.com",
    "password": "xxx1234"
}

## Endpoints for user 

### GET api/users/get/:id
Desc: To get user details

### PUT api/users/:id
Desc: To update user details

### DEL api/users/get/:id
{
  "userId":"xxxxxxxx"
}<br>
Desc: Delete a user

### PUT api/users/:id/follow
{
  "userId":"xxxxxxxx"
}<br>
Desc: Follow a user

### PUT api/users/:id/unfollow
{
  "userId":"xxxxxxxx"
}<br>
Desc: Unfollow a user

## Endpoints for post 

//TODO
