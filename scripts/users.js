
// write operations

/**
 * Creates a new instance of an empty user record object. It doesn't store anything in the database.
 *
 * @returns {sys.data.Record} - a new user record instance.
 */
exports.new = function() {
    return sys.data.createRecord('sys.users');
};

/**
 * Creates a new user record into the database.
 *
 * @param {sys.data.Record} user - The user to be stored.
 * @returns {sys.data.Record} - Returns created user record.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.create = function(user) {
    if (!user || user.__class__ !== 'Data') {
        new sys.exceptions.ScriptException(sys.exceptions.BAD_REQUEST_ERROR, 'Invalid user').throw();
    }
    return sys.data.save(user);
};

/**
 * Updates an existing user in the database.
 *
 * @param {sys.data.Record} user - The user to be modified.
 * @returns {sys.data.Record} - Modified user record.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.update = function(user) {
    if (!user || user.__class__ !== 'Data') {
        new sys.exceptions.ScriptException(sys.exceptions.BAD_REQUEST_ERROR, 'Invalid user').throw();
    }
    return sys.data.save(user);
};

/**
 * Deletes a user from the database.
 *
 * @param {sys.data.Record} user - The user to be deleted.
 * @returns {sys.data.Record} - The deleted record.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.remove = function(user) {
    return sys.data.remove(user);
};

// read operations

/**
 * Finds a user by its ID.
 *
 * @param {string} userId - ID of the user to find.
 * @returns {sys.data.Record} - a user record or null if not found.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.findById = function(userId) {
    return sys.data.findById('sys.users', userId);
};

/**
 * Finds one user record.
 *
 * @param {sys.data.Query} query - Filtering rules to be applied to the search.
 * @returns {sys.data.Record} - A single user record.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.findOne = function(query) {
    return sys.data.findOne(query);
};

/**
 * Finds a list of users.
 *
 * @param {sys.data.Query} query - Filtering rules to be applied to the search.
 * @returns {sys.commons.ResultSet} - An iterator of records found.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.find = function (query) {
    return sys.data.find(query);
};

/**
 * Creates a new query instance for the users entity.
 *
 * @returns {sys.data.Query} - A new query instance.
 */
exports.createQuery = function () {
    return sys.data.createQuery('sys.users');
};

// actions

/**
 * Changes the status of specified user to active.
 *
 * @param {sys.data.Record} user - User to be activated.
 * @returns {sys.data.Record} - Returns specified user with its status changed to active.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.activate = function(user) {
    return sys.users.activate(user);
};

/**
 * Changes the status of specified user to inactive.
 *
 * @param {sys.data.Record} user - User to deactivate.
 * @returns {sys.data.Record} - Returns user with its status changed to inactive.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.deactivate = function(user) {
    return sys.users.deactivate(user);
};

/**
 * Resets the password of a specific user. In case the user is blocked then it will be reactivated.
 *
 * @param {sys.data.Record} user - User to reset his password.
 * @param {Object} options - Configuration options for operation like if the user should be notified by email.
 * @returns {Object} An object containing reset password code and app link to change user password settings.
 * @throws {sys.exceptions.ScriptException} if a runtime error happened.
 */
exports.resetPassword = function(user, options) {
    return sys.users.resetPassword(user, options);
};

// user gropus utilities

/**
 * Checks if user belongs to the specified group.
 *
 * @param {sys.data.Record} user - User record to verify groups.
 * @param {string} groupIdOrNameOrLabel - Id, name or label of the group to check.
 * @returns {boolean} true if user belongs to specified group.
 */
exports.containsGroup = function(user, groupIdOrNameOrLabel) {
    return sys.users.containsGroup(user, groupIdOrNameOrLabel);
};

/**
 * Adds a group to user.
 *
 * @param {sys.data.Record} user - User record to add a group.
 * @param {string} groupIdOrNameOrLabel - The id, name or label of the group to be added.
 * @param {boolean} primary - Flag to indicate that group to be added is primary.
 * @throws {Error} if specified group does not exist.
 */
exports.addGroup = function(user, groupIdOrNameOrLabel, primary) {
    return sys.users.addGroup(user, groupIdOrNameOrLabel, primary);
};

/**
 * Deletes a group from the user.
 *
 * @param {sys.data.Record} user - User record to remove group.
 * @param {string} groupIdOrNameOrLabel - The id, name or label of the group to be removed.
 */
exports.removeGroup = function(user, groupIdOrNameOrLabel) {
    return sys.users.removeGroup(user, groupIdOrNameOrLabel);
};

// helpers
// TODO: move this to a new package

let isEmpty = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return true;
    }
    if (typeof obj === 'string' && (!obj || !obj.trim())) {
        return true;
    }
    if (Array.isArray(obj) && obj.length == 0) {
        return true;
    }
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        for (var name in obj) {
            return false;
        }
        return true;
    }
    return false;
};

let isNotEmpty = function (obj) {
    return !isEmpty(obj);
};

let isNumber = function (numberValue) {
    return !isNaN(parseFloat(numberValue)) && isFinite(numberValue);
};

let isInteger = function (n, options) {
    if (options && options.allowString && typeof n === 'string') {
        var oldN = n;
        n = parseInt(n);
        return oldN === '' + n && Number(n) === n && n % 1 === 0;
    } else {
        return Number(n) === n && n % 1 === 0;
    }
};

let isBoolean = function (booleanValue) {
    return booleanValue == true || booleanValue == false;
};

let isObject = function (value) {
    return !isEmpty(value) && typeof (value) === 'object';
};

let isString = function (value) {
    return (typeof value === 'string');
};

let isFunction = function (object) {
    let getType = {};
    return !isEmpty(object) && getType.toString.call(object) === '[object Function]';
};






