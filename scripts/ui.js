/****************************************************
 UI
 ****************************************************/

/**
 * Use a UI Message to open a link in a new tab.
 */
exports.openInNewTab = function (url) {
    sys.logs.info('[slingr] Open in new tab');
    dependencies.utils.ui.openInNewTab(url);
};

/**
 * Use a UI Message to open a link in the current tab.
 */
exports.openInCurrentTab = function (url) {
    sys.logs.info('[slingr] Open in current tab');
    dependencies.utils.ui.openInCurrentTab(url);
};
