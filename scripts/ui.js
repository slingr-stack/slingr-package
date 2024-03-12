/****************************************************
 UI
 ****************************************************/

exports.openInNewTab = function (url) {
    sys.logs.info('[ui] Open in new tab');
    var userId = sys.context.getCurrentUserRecord().id();
    sys.logs.info('[ui] User id: '+JSON.stringify(userId));
    sys.ui.sendMessage({
        scope: 'uiService:slingr.uiManagement',
        name: 'openInNewTab',
        target: 'users',
        targetUsers: [userId],
        url: url,
    });
}

exports.openInCurrentTab = function (url) {
    sys.logs.info('[ui] Open in new tab');
    var userId = sys.context.getCurrentUserRecord().id();
    sys.logs.info('[ui] User id: '+JSON.stringify(userId));
    sys.ui.sendMessage({
        scope: 'uiService:uiManagement',
        name: 'openInCurrentTab',
        target: 'users',
        targetUsers: [userId],
        url: url,
    });
}
