# `AirBnB`

## Database Schema Design

![Screen Shot 2022-07-05 at 10 21 41 AM](https://user-images.githubusercontent.com/32751992/177382417-9c06afd0-8825-49c5-bf1a-7886d6f2e628.png)

## API Documentation

## All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

## Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /users/currentUser
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com"
    }
    ```

## Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "demo@user.io",
      "password": "password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

## Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Get all Properties

Returns all the properties.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /properties
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Properties":[
        {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ]
    }
    ```

## Get all Properties owned by the Current User

Returns all the Properties owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /users/currentUser/properties
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Properties": [
        {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ]
    }
    ```

## Get details of a Property from an id

Returns the details of a Property specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /properties/:propertyId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "numReviews": 5,
      "avgStarRating": 4.5,
      "images": [
        "image url"
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Property

Creates and returns a new property.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /properties
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    }
    ```

## Edit a Property

Updates and returns an existing property.

* Require Authentication: true
* Require proper authorization: Property must belong to the current user
* Request
  * Method: PUT
  * URL: /properties/:propertyId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Property

Deletes an existing property.

* Require Authentication: true
* Require proper authorization: Property must belong to the current user
* Request
  * Method: DELETE
  * URL: /properties/:propertyId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: user/currentUser/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "propertyId": 1,
          "review": "This was an awesome spot!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "Property": {
            "id": 1,
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "name": "App Academy",
            "price": 123
          },
          "images": [
            "image url"
          ]
        }
      ]
    }
    ```

## Get all Reviews by a Property's id

Returns all the reviews that belong to a property specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /properties/:propertyId/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "propertyId": 1,
          "review": "This was an awesome spot!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "images": [
            "image url"
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Review for a Property based on the Property's id

Create and return a new review for a Property specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /properties/:propertyId/reviews
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome spot!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "propertyId": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Review from the current user already exists for the Property
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this property",
      "statusCode": 403
    }
    ```

## Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /reviews/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome spot!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "propertyId": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Get all of the Current User's Bookings

Return all the bookings that the current user has made.

* Require Authentication: true
* Request
  * Method: GET
  * URL: users/currentUser/bookings
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Bookings": [
        {
          "id": 1,
          "propertyId": 1,
          "Property": {
            "id": 1,
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "name": "App Academy",
            "price": 123,
            "previewImage": "image url"
          },
          "userId": 2,
          "startDate": "2021-11-19",
          "endDate": "2021-11-19",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

## Get all Bookings for a Property based on the Property's id

Return all the bookings for a Property specified by id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /properties/:propertyId/bookings
  * Body: none

* Successful Response: If you ARE NOT the owner of the property.
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Bookings": [
        {
          "propertyId": 1,
          "startDate": "2021-11-19",
          "endDate": "2021-11-19"
        }
      ]
    }
    ```

* Successful Response: If you ARE the owner of the property.
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Bookings": [
        {
          "User": {
            "id": 2,
            "firstName": "John",
            "lastName": "Smith"
          },
          "id": 1,
          "propertyId": 1,
          "userId": 2,
          "startDate": "2021-11-19",
          "endDate": "2021-11-19",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Booking from a Property based on the Property's id

Create and return a new booking from a Property specified by id.

* Require Authentication: true
* Require proper authorization: Property must NOT belong to the current user
* Request
  * Method: POST
  * URL: properties/:propertyId/bookings
  * Body: start date and end date from the user to determine what dates to make the booking for

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "propertyId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-19",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Booking conflict
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Sorry, this property is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    }
    ```

## Edit a Booking

Update and return an existing booking.

* Require Authentication: true
* Require proper authorization: Booking must belong to the current user
* Request
  * Method: PUT
  * URL: /bookings/:bookingId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "startDate": "2021-11-19",
      "endDate": "2021-11-19"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "propertyId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-19",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error response: Couldn't find a Booking with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Booking couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Can't edit a booking that's past the end date
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Past bookings can't be modified",
      "statusCode": 400
    }
    ```

* Error response: Booking conflict
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Sorry, this property is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    }
    ```

## Delete a Booking

Delete an existing booking.

* Require Authentication: true
* Require proper authorization: Booking must belong to the current user or the
  Property must belong to the current user
* Request
  * Method: DELETE
  * URL: /bookings/:bookingId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Booking with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Booking couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Can't delete a booking that's past the start date
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 400
    }
    ```

## Add an Image to a Property based on the Property's id

Create and return a new image for a Property specified by id.

* Require Authentication: true
* Require proper authorization: Property must belong to the current user
* Request
  * Method: POST
  * URL: /properties/:propertyId/image
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "imageableId": 1,
      "imageableType": "Spot",
      "url": "image url",
    }
    ```

* Error response: Couldn't find a Property with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Property couldn't be found",
      "statusCode": 404
    }
    ```

## Add an Image to a Review based on the Review's id

Create and return a new image for a review specified by id.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: POST
  * URL: /reviews/:reviewId/image
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "imageableId": 1,
      "imageableType": "Review",
      "url": "image url",
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Cannot add any more images because there is a maximum of 10
  images per resource
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 400
    }
    ```

## Delete an Image

Delete an existing image.

* Require Authentication: true
* Require proper authorization: Image must belong to the current user through
  the image's imageableId and imageableType
* Request
  * Method: DELETE
  * URL: /images/:imageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find an Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Image couldn't be found",
      "statusCode": 404
    }
    ```

## Add Query Filters to Get All Properties

Return Properties filtered by query parameters.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /properties?
  * Query Parameters
    * page: integer, minimum: 0, maximum: 10, default: 0
    * size: integer, minimum: 0, maximum: 20, default: 20
    * minLat: decimal, optional
    * maxLat: decimal, optional
    * minLng: decimal, optional
    * maxLng: decimal, optional
    * minPrice: decimal, optional, minimum: 0
    * maxPrice: decimal, optional, minimum: 0
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Properties":[
        {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ],
      "page": 2,
      "size": 25
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "page": "Page must be greater than or equal to 0",
        "size": "Size must be greater than or equal to 0",
        "maxLat": "Maximum latitude is invalid",
        "minLat": "Minimum latitude is invalid",
        "minLng": "Maximum longitude is invalid",
        "maxLng": "Minimum longitude is invalid",
        "minPrice": "Maximum price must be greater than 0",
        "maxPrice": "Minimum price must be greater than 0"
      }
    }
    ```