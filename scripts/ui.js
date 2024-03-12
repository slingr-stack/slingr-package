/****************************************************
 UI
 ****************************************************/

exports.openInNewTab = function (params) {
    sys.logs.info('[ui] Open in new tab');
    sys.logs.info('[ui] User id: '+JSON.stringify(sys.context.getCurrentUserRecord().id()));
    sys.ui.sendMessage({
        scope: 'uiService:slingr.ui',
        name: 'openInNewTab',
        config: {
            url: params.url,
        }
    });
}

exports.openInCurrentTab = function (params) {
    sys.logs.info('[ui] Open in new tab');
    sys.logs.info('[ui] User id: '+JSON.stringify(pkgConfig.id));
    sys.ui.sendMessage({
        scope: 'uiService:ui.ui',
        name: 'openInCurrentTab',
        config: {
            url: params.url,
        }
    });
}
