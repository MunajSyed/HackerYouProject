# HTTP
[Resource](http://www.ntu.edu.sg/home/ehchua/programming/webprogramming/http_basics.html): These are some pretty technical docs on the basics of HTTP.

## HTTP Request Structure
![http-request-packet-basics-diagram][http-request]

[http-request]: https://user-images.githubusercontent.com/2818462/53857159-24bb8900-3fa3-11e9-9f5b-ab86e4956b1f.png "Basic image of http packet"

> HTTP Requests have four major components:

* **URL** - What external location we are making the request to. Could be to `http://pokeapi.co/api/v2/` to get a list of pokemon, for example.
* **Method** - What we want to DO at that external location:
  * **GET** - When we want to RETRIEVE data about a resource
  * **POST** - We want to CREATE some new data at the URL we provided
  * **PUT** - We want to REPLACE the resource at the URL we provided with a new resource we are providing
  * **PATCH** - We want to UPDATE the resource
  * **DELETE** - We want to REMOVE the resource
* **Headers** Headers typically contain additional information about the request that is coming through. Headers can contain anything, but usually include:
  * **Accept** Let's the server know which types of data the client can understand - usually we set this as JSON.
  * **Content-Type** - What format the request the client is sending is structured in, this can be `application/JSON` if we're sending JSON, or `application/x-www-form-encoded` for sending form data.
* **Body** - In addition to Headers, your request can also have a 'body', which contains additional details about what the client would like the server to do. In a POST request, the body will contain information about the resource you are creating.

## HTTP Response Structure
![http-response-packet-basics-diagram][http-response]

[http-response]: https://user-images.githubusercontent.com/2818462/53858057-8a5d4480-3fa6-11e9-9593-4e903b8ebd3e.png "Basic image of http response packet"

> HTTP Responses have three major components:

* **Status Code** -
  > https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

  > https://httpstatuses.com/

* **Headers** -
  > https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

* **Body** -
  > https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages

## Exercises

> We're going to use a tool to help us make API requests. This tool will help us visualise what we're doing.

### Task 1
> Download and install our API tool

API Tool: [Insomnia](https://insomnia.rest/)

#### Installation
> Homebrew
```shell
$ brew update
$ brew install insomnia
```

> Website Download Link
```
https://insomnia.rest/download
```

### Task 2
> 1) Create a new workspace
> 2) Create our first request


#### **Extra:**
These are some other services that allow you to play with API's and HTTP verbs.
- https://reqres.in/
- https://jsonplaceholder.typicode.com/
