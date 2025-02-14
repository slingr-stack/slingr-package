
# Overview

Repo: [https://github.com/slingr-stack/slingr-package](https://github.com/slingr-stack/slingr-package)

This is a package that enables integration between Slingr applications and add a set of utilities to help with app development.

This [package](https://platform-docs.slingr.io/dev-reference/data-model-and-logic/packages/) allows direct access to the 
[Runtime Rest API](https://platform-docs.slingr.io/dev-reference/rest-apis/apps-api/).

Some features available in this package are:

- Uses user/password and api token authentication mechanisms.
- Helpers for API methods.
- UI messages for redirect on local app.

## Configuration

For using the UI functions, it is not necessary to connect to an external app. 
However, if you choose to do so, you must configure which app you will connect to.

### App name
**Name**: `appName`
**Type**: text
**Mandatory**: false

### App env
**Name**: `appEnv`
**Type**: text
**Mandatory**: only if a appName is defined
**Values** dev, staging, prod

### Authentication method

**Name**: `authorizationMethod`
**Type**: text
**Mandatory**: only if a appName is defined
**Values** userPassword, apiKey

### User

**Name**: `user`
**Type**: text
**Mandatory**: only if a appName is defined and authorizationMethod is equals to userPassword

### Password

**Name**: `password`
**Type**: text
**Mandatory**: only if a appName is defined and authorizationMethod is equals to userPassword

### API key
This token could be generated on builder [API Token](https://platform-docs.slingr.io/dev-reference/environment-settings/api-tokens/) 
or in scripts [OTP Code](https://platform-docs.slingr.io/dev-reference/scripting/sys.auth/#createtokenidoremailuser-code)

**Name**: `apiKey`
**Type**: text
**Mandatory**: only if a appName is defined and authorizationMethod is equals to apiKey

# Javascript API

You can make `GET`,`POST`,`DELETE`,`PUT` and `HEAD` requests to the Runtime API.

```javascript
log(JSON.stringify(pkg.slingr.api.testConnection()));
log(JSON.stringify(pkg.slingr.api.get('/data/entityName/count')));
log(JSON.stringify(pkg.slingr.api.post('/data/entityName'), {body: {att1: 'val1'}}));
log(JSON.stringify(pkg.slingr.api.getLogs()));
log(JSON.stringify(pkg.slingr.api.getJobs()));
```

## Dependencies
* Utils Package
* HTTP Service

# About Slingr

SLINGR is a low-code rapid application development platform that accelerates development, 
with robust architecture for integrations and executing custom workflows and automation.

[More info about Singr](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
