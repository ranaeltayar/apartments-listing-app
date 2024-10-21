# Apartment Listing App

This is a simple apartment listing application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides functionalities to view, create, and manage apartment listings, along with details about amenities and property types.

## Features

- **View Listings:** Users can browse through a list of available apartments with essential details.
- **Listing Details:** Each listing has a detailed view that displays images, descriptions, price, and more.
- **Responsive Design:** The application is designed to be responsive and user-friendly across various devices.
- **API Integration:** The frontend communicates with a backend API to fetch data and manage listings.
- **Containerization:** The application can be run using Docker for easy deployment.

## Technology Stack

- **Frontend:** React, Next.js, Chakra UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **State Management:** React hooks
- **Styling:** CSS-in-JS with Chakra UI

## APIs

The application communicates with the following backend APIs:

1. **GET /api/units:** Retrieve all apartment listings.
2. **GET /api/units/:id:** Get details of a specific apartment by its ID.
3. **POST /api/units:** Create a new apartment listing.

## Postman Collection

A Postman collection is included for testing the backend APIs. The table below summarizes the endpoints included in the collection:

| Method | Endpoint            | Description                       |
|--------|---------------------|-----------------------------------|
| GET    | /api/units          | Retrieve all apartment listings    |
| GET    | /api/units/:id      | Get details of a specific listing  |
| POST   | /api/units          | Create a new apartment listing     |

You can use the provided collection and environment to easily call the three backend APIs.

## Docker Setup

The application is containerized and can be run with Docker Compose. Use the following command to start all services:

```bash
 docker compose up --build
