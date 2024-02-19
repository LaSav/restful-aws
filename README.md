# RESTful Event Planner App Deployed on AWS

A fullstack web application using Node, MySQL, React, EC2 & RDS.

Making this so my friends and I can schedule a full Diplomacy game.

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

## TODO:

- Change to SQLite
- Containerization
