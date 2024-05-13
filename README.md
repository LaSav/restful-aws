# RESTful Event Planner App Deployed on AWS

A fullstack web application using Node, MySQL, React, EC2 & RDS.

Making this so my friends and I can schedule a full Diplomacy game.

## Running this App Locally:

`git clone https://github.com/LaSav/restful-aws`

### Add environment variables:

In root .env file:

```
MYSQL_USERNAME = username for MySQL database
MYSQL_DATABASE = Name of the MySQL database
MYSQL_PASSWORD = Password for the MySQL database user
MYSQL_ROOT_PASSWORD = Root password for MySQL database
JWT_SECRET = Secret key for JWT authentication
```

### Run with NPM

Install dependencies: `npm install`
Run Server: `npm run server`
Run Client: `npm run client`

### Run with Docker

Build the docker images: `docker-compose build`
Start the docker containers: `docker-compose up`

## Users can:

- Create an Event
- Can be in multiple Events
- Attend an Event

## Events have:

- Title
- Description
- Members
- Deadline
- Available Spaces

## Future Features:

- User 'Friends'
- Invite users by email or phone number.
- Create events with recurring dates by days of the week.
- Profile pictures
- Add location

## Considerations and Future Optimizations

Currently I am re-fetching data on the client upon successful mutations. Future data persistence using redux state will be considered if refetching the data server side proves to be optimal. Or if I can figure out how to send back the appropriate data.

## Bugs:

- Nav link stays highlighted when on another page.
- Refresh token or expiration handling for JWT.

## TODO:

- Fix undefined user on docker start. Only errors when you remain logged in and stop the containers.
- Add 'Cancel' on edit event page
- CI/CD
