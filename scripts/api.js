/****************************************************
 Dependencies
 ****************************************************/

let httpReference = dependencies.http;

let httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    delete: httpReference.delete,
    head: httpReference.head
};

let httpService = {};

/**
 *
 * Handles a request with retry from the platform side.
 */
function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    return requestFn(options, callbackData, callbacks);
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (let key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Sends an HTTP GET request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the GET request to.
 * @param {object} httpOptions  - The options to be included in the GET request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the GET request. [optional]
 * @return {object}             - The response of the GET request.
 */
exports.get = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.get(Slingr(options), callbackData, callbacks);
};

/**
 * Sends an HTTP POST request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the POST request to.
 * @param {object} httpOptions  - The options to be included in the POST request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the POST request.
 */
exports.post = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.post(Slingr(options), callbackData, callbacks);
};

/**
 * Sends an HTTP PUT request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the PUT request to.
 * @param {object} httpOptions  - The options to be included in the PUT request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the PUT request.
 */
exports.put = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.put(Slingr(options), callbackData, callbacks);
};

/**
 * Sends an HTTP DELETE request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the DELETE request to.
 * @param {object} httpOptions  - The options to be included in the DELETE request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the DELETE request. [optional]
 * @return {object}             - The response of the DELETE request.
 */
exports.delete = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.delete(Slingr(options), callbackData, callbacks);
};

/**
 * Sends an HTTP HEAD request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the HEAD request to.
 * @param {object} httpOptions  - The options to be included in the HEAD request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the HEAD request. [optional]
 * @return {object}             - The response of the HEAD request.
 */
exports.head = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.head(Slingr(options), callbackData, callbacks);
};

/****************************************************
 Private helpers
 ****************************************************/

function checkHttpOptions (path, options) {
    options = options || {};
    if (!!path) {
        if (isObject(path)) {
            // take the 'path' parameter as the options
            options = path || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = path;
            } else {
                // create html package
                options = {
                    path: path,
                    body: options
                }
            }
        }
    }
    return options;
}

function isObject (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

let stringType = Function.prototype.call.bind(Object.prototype.toString)

/****************************************************
 Configurator
 ****************************************************/

let Slingr = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setAuthorization(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    let url = options.path || "";
    const API_URL = "https://"+config.get('appName')+".slingrs.io/"+config.get('appEnv')+"/runtime/api"
    options.url = API_URL + url;
    sys.logs.debug('[slingr] Set url: ' + options.path + "->" + options.url);
    return options;
}

function setRequestHeaders(options) {
    let headers = options.headers || {};
    if (config.get("authenticationMethod") === "apiKey") {
        sys.logs.debug('[slingr] Set header apikey');
        headers = mergeJSON(headers, {"Authorization": "API-Key " + config.get("text")});
    }
    headers = mergeJSON(headers, {"Content-Type": "application/json"});

    options.headers = headers;
    return options;
}

function mergeJSON (json1, json2) {
    const result = {};
    let key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
