/****************************************************
 Public API - Generic Functions
 ****************************************************/

exports.utils = {

    /**
     * Converts a given date to a timestamp.
     *
     * @param {number | string} params      - The date to be converted.
     * @return {object}                     - An object containing the timestamp.
     */
    fromDateToTimestamp: function(params) {
        if (!!params) {
            return {timestamp: new Date(params).getTime()};
        }
        return null;
    },

    /**
     * Converts a timestamp to a date object.
     *
     * @param {number} timestamp            - The timestamp to convert.
     * @return {object}                     - The date object representing the timestamp.
     */
    fromTimestampToDate: function(timestamp) {
        return new Date(timestamp);
    },

    /**
     * Gets a configuration from the properties.
     *
     * @param {string} property             - The name of the property to get.
     *                                          If it is empty, return the entire configuration object.
     * @return {string}                     - The value of the property or the whole object as string.
     */
    getConfiguration: function (property) {
        if (!property) {
            sys.logs.debug('[slingr] Get configuration');
            return JSON.stringify(config.get());
        }
        sys.logs.debug('[slingr] Get property: '+property);
        return config.get(property);
    },

    /**
     * Concatenates a path with a param query and its value.
     *
     * @param path                          - The path to concatenate.
     * @param key                           - The name of the param.
     * @param value                         - The value of the param.
     * @returns {string}                    - The concatenated path without coding parameters.
     */
    concatQuery: function (path, key, value) {
        return path + ((!path || path.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
    },

    /**
     * Merges two JSON objects into a single object.
     *
     * @param {Object} json1 - The first JSON object to be merged.
     * @param {Object} json2 - The second JSON object to be merged.
     * @return {Object} - The merged JSON object.
     */
    mergeJSON: mergeJSON,
};

/****************************************************
 Private helpers
 ****************************************************/

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
