# Slingr package

## Overview

Set of utilities to help with application development in the Slingr low code platform.

## Quick start

Once you have installed the package you can start using user helpers like this:

```js

```

## Javascript API

The following utilities are available in this package.

### Users management

This is a set of utilities that allows to manage users data.

#### Create a new user

In order to create a new user record in the database the following sentence can be used:
```js
let createdUser = pkg.slingr.users.create(user);
```
This is a complete flow example to create a user:
```js
let user = pkg.slingr.users.new();
user.field('firstName').val('Rolando');
user.field('lastName').val('Mesa');
user.field('email').val('rolando.mesa@slingr.io');
user.field('company').val('ABC');
pkg.slingr.users.addGroup(user, 'Admins', true);
pkg.slingr.users.create(user);
```

#### Update existing user
To update an existing user in the database:
```js
let updatedUser = pkg.slingr.users.update(user);
```
This is a complete flow example to update a user:
```js
let query = app.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = app.slingr.users.findOne(query);
user.field('company').val('ACME');
app.slingr.users.update(user);
```

#### Remove existing user
To remove an existing user:
```js
let removedUser = pkg.slingr.users.remove(user);
```
This is a complete flow example to delete a user:
```js
let query = app.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = app.slingr.users.findOne(query);
app.slingr.users.remove(user);
```

#### findById

