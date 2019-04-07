# Authentication

Authentication is the process of verifying a requester's identity.

The steps behind authentication are simple:
1. You register for a website with a set of credentials (usually an email and password), and that record is stored in a database.
2. Later, when you want to log in, you send that set of credentials back to the website.
3. If the credentials you provided match an existing record in the database tyou're allowed in


## How Authentication Works

There are two common user authentication patterns:

* **Username (or email) / Password**: Users register on your site/app with a username and password. On subsequent visits to your site, they login with that username and password, and you verify that they are correct.
* **OAuth2**: Users sign in using a spearate social media account, like Facebook, Twitter, etc. You only need to store that user's identity on that site to log them into your site/app.

> This course will be focusing on username/password authentication method.

## Why Authentication Is Important

There are many reasons you might want authentication for your site/application.
1. If you are storing sensitive information that should be viewable by certain people only.
2. Your application performs transactions.
3. Yuo would like to have personalizations.
4. You are trying to build a unique community of engaged visitors.

When logging in a user by username/email and password, you'll tpically have an endpoint defined on your site that takes a payload with username and password properties and compares them against your database.

However, Doing simple lookup on a username/email and password can be a huge security risk. If someone gets access to your database, they can get access to your user's passwords. This is why you should never store passwords directly (in plain text) in your system.

* Storing passwords in your database allows anyone who gains access to your database full access to everyone of your users - both on your site and potentially others (people use the same password for things).
* You as a devellop of a site really shouldn't have access to sensitive information like passwords anyways (just good practice).

Well built sites **hash** their passwords. **Hashing** is basically a way to encrypt a password in a way that can _never_ be reversed. Password authentication works by transforming passwords into a hash, and storing that hash in the database in place of the plain text password.

Most authentication systems use an algorithm called [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) to hash passwords.


## Token Based Authentication

Once you've determined that a user is allowed to log into the system, we need a way for them to identify themselves to the rest of your application (without having to constantly send their username/password for every request).

#### Token Based Authentication Flow
<img width="857" alt="jwt-token-flow" src="https://user-images.githubusercontent.com/2818462/55676601-35169a80-58a6-11e9-9f98-1733ac2e0c9b.png">

With token based authentication, the login endpoint returns a few pieces of information.
* An **access token** that can be used for subsequent calls to the API
* A **refresh token** that can be used to generate a new _unexpired_ token
* Access point information for where to send the **refresh token**

Access tokens will be passed in the header for all requets to an API. This is how the API will know if the request has permission or not to the API resource being accessed.
