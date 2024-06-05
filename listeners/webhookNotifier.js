/****************************************************
 Listeners
 ****************************************************/

listeners.webhookNotifier = {
    label: 'Catch app events',
    type: 'dynamicData',
    callback: function(event, record, oldRecord) {
        let _package = pkg.slingr;
        let config = JSON.stringify(_package.utils.getConfiguration());
        if (config.enableWebhook) {
            if (config.webhooksType === 'fixed') {
                const webhooks = config.webhooks;
                for (var i in webhooks) {
                    _package.httpClient.put(webhooks[i].url, {
                        event: event,
                        record: record,
                        oldRecord: oldRecord
                    });
                }
            } else {
                let records = sys.data.find(config.webhooksEntity, {});
                while (records.hasNext()) {
                    let data = records.next();
                    _package.httpClient.put(data.field(config.webhooksUrlField).val().toString(), {
                            event: event,
                            record: (record ? record.toJson() : null),
                            oldRecord: (oldRecord ? oldRecord.toJson() : null)
                        },
                        data.field(config.webhooksVerificationTokenField).val().toString()
                    );
                }
            }
        }
    }
};
