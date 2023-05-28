# eFuse-backend CRUD with MongoDB and Redis Caching

This repository contains a Node.js and Express application that demonstrates CRUD (Create, Read, Update, Delete) operations on two collections, users and posts, using MongoDB. It also utilizes Redis for caching GET APIs. The application is containerized using Docker Compose, making it easy to set up and run.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js 
- MongoDB 
- Redis 
- Docker

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository
2. run command docker-compose build
3. run command docker-compose up -d


## API Endpoints
The following are the available API endpoints:

## Users Collection
- GET /users: Get all users.
- GET /users/:id: Get a specific user by ID.
- POST /users: Create a new user.
- PUT /users/:id: Update a user by ID.
- DELETE /users/:id: Delete a user by ID.

## Posts Collection
- GET /posts: Get all posts.
- GET /posts/:id: Get a specific post by ID.
- POST /posts: Create a new post.
- PUT /posts/:id: Update a post by ID.
- DELETE /posts/:id: Delete a post by ID.

##Caching with Redis
All the GET APIs in the application are cached using Redis. This improves performance by serving the response from the cache instead of making a database query when the same request is made again within a certain time period.

##Contributing
Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request to the repository.

##License
This project is licensed under the MIT License.
