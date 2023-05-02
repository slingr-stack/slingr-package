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
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
user.field('company').val('ACME');
pkg.slingr.users.update(user);
```

#### Remove existing user
To remove an existing user:
```js
let removedUser = pkg.slingr.users.remove(user);
```
This is a complete flow example to delete a user:
```js
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
pkg.slingr.users.remove(user);
```

#### Find user by ID
Finds a user by its ID. To look up a user by ID the following sentence can be used:
```js
let user = pkg.slingr.users.findById('644c0fbb0cda1f395232bbf5');
```

#### Find one user
Finds a user using filtering rules. To look up a user by filtering rules the following sentence can be used:
```js
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
```

#### Find users
Finds a list of users. To find a list of users the following sentences can be used:
```js
let query = pkg.slingr.users.createQuery();
query.field('status').equals('ACTIVE');
let users = pkg.slingr.users.find(query);
while (users.hasNext()) {
    let user = users.next();
    log(user.label());
}
```

#### Activate user
Changes the status of specified user to active.
```js
let inactiveUser = pkg.slingr.users.findById('644c0fbb0cda1f395232bbf5');
let activeUser = pkg.slingr.users.activate(inactiveUser);
```

#### Deactivate user
Changes the status of specified user to inactive.
```js
let activeUser = pkg.slingr.users.findById('644c0fbb0cda1f395232bbf5');
let inactiveUser = pkg.slingr.users.deactivate(inactiveUser);
```

#### Reset user password
Resets the password of a specific user. In case the user is blocked then it will be reactivated.
```js
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
pkg.slingr.users.resetPassword(user);
```

#### User contains group
Checks if user belongs to the specified group.
```js
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
if (pkg.slingr.users.containsGroup('admins')) {
    // do something
}
```

#### User add group
Adds a group to a user.
```js
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
pkg.slingr.users.addGroup(user, 'admins', true);
pkg.slingr.users.update(user);
```

#### User remove group
Deletes a group from the user.
```js
let query = pkg.slingr.users.createQuery();
query.field('email').equals('rolando.mesa@slingr.io');
let user = pkg.slingr.users.findOne(query);
pkg.slingr.users.removeGroup(user, 'admins');
pkg.slingr.users.update(user);
```



