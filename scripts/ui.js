/****************************************************
 UI
 ****************************************************/

exports.openInNewTab = function (url) {
    sys.logs.info('[slingr] Open in new tab');
    dependencies.utils.ui.openInNewTab(url);
}

exports.openInCurrentTab = function (url) {
    sys.logs.info('[slingr] Open in current tab');
    dependencies.utils.ui.openInCurrentTab(url);
}
