service.openInNewTab = function (message) {
    var config = message.config;
    var url = config.url;
    window.open(url, '_blank').focus();
}

service.openInCurrentTab = function (message) {
    var config = message.config;
    var url = config.url;
    window.open(url, '_self').focus();
}
