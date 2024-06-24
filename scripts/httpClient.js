/****************************************************
 Dependencies
 ****************************************************/

let httpReference = dependencies.http;

let httpDependency = {
    put: httpReference.put
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
 * Sends an HTTP PUT request to the specified URL with the provided HTTP options.
 *
 * @param {string} url          - The complete url to send the PUT request to.
 * @param {object} content      - The event
 * @param {string} token        - Token custom or webhook verifier from client side
 * @return {object}             - The response of the PUT request.
 */
exports.put = function(url, content, token) {
    let options = {
        url:  url,
        headers:  {
            token: token ? token : config.get("verificationToken")
        },
        body: content
    };
    sys.logs.debug('[slingr] Sending notification to: ' + url);
    return httpService.put(options);
};
