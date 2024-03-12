service.openInNewTab = function (message) {
    var url = message.url;
    window.open(url, '_blank').focus();
}

service.openInCurrentTab = function (message) {
    var url = message.url;
    window.open(url, '_self').focus();
}
