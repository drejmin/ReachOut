# ReachOut
A app for making new connections and reaching out to new people.

# Project Idea and Descriptions
Mental health and connections are hard as we get older. This app will help to set up rooms for mental health connections and positivity. It will allow people to create their own chat room and chat with a multitude of people that they know or would like to know.

# Technology Used
- React for the frontend (still looking at different CSS languages to use)
- Node/Express for endpoints and possible API
- MongoDB for storing app members and their messages
- Socket.io for real time communication

# Restful Routing
| HTTP Verb | URL Path         | Action         | Description                                            |
| --------- | ---------------- | -------------- | ------------------------------------------------------ |
| GET       | /user            | index          | Retrieve a list of all users                           |
| GET       | /user/:id        | show           | Retrieve a specific user by ID                         |
| POST      | /user            | create         | Create a new user                                      |
| PUT       | /user/:id        | update         | Update an existing user by ID                          |
| PATCH     | /user/:id        | partial update | Update part of an existing user by ID (optional)       |
| DELETE    | /user/:id        | destroy        | Delete a specific user by ID                           |
| GET       | /message         | index          | Retrieve a list of all messages                        |
| GET       | /message/:id     | show           | Retrieve a specific message by ID                      |
| POST      | /message         | create         | Create a new message                                   |
| PUT       | /message/:id     | update         | Update an existing message by ID                       |
| PATCH     | /message/:id     | partial update | Update part of an existing message by ID (optional)    |
| DELETE    | /message/:id     | destroy        | Delete a specific message by ID                        |
| GET       | /room            | index          | Retrieve a list of all rooms                           |
| GET       | /room/:id        | show           | Retrieve a specific room by ID                         |
| POST      | /room            | create         | Create a new room                                      |
| PUT       | /room/:id        | update         | Update an existing room by ID                          |
| PATCH     | /room/:id        | partial update | Update part of an existing room by ID (optional)       |
| DELETE    | /room/:id        | destroy        | Delete a specific room by ID                           |

# ERD

# Wireframes

# User Stories
- I want to be able to search for a specific user
- I want to be able to have my own home page
- I want to be able to send and recieve messages in real time
- I want to be able to have a notification for a new message
- I want to be able to join a chat room or create my own room 

# MVP Goals
- Users able to login/signup
- Set up admin and admin role
- User home pages 
- Send/Recieve messages
- Create and join Chat Room
- Search for users

# Stretch Goals
- A chatbot created to talk and help out users
- A resource page for mental health
- Public and private chat rooms
- Ability to share images/gifs
- Disappearing Messages
- A built in calming game
