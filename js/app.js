$(document).ready(function () {
    $.when($.ajax("log.json")).then(function (data, textStatus, jqXHR) {
        Handlebars.registerHelper("logMessage", function (message, level) {
            message = Handlebars.Utils.escapeExpression(message);
            var out;
            if (10 === level) {
                out = '<span class="text-warning">' + message + '</span>';
            } else if (20 === level) {
                out = '<span class="text-danger">' + message + '</span>';
            } else {
                out = '<span>' + message + '</span>';
            }

            return new Handlebars.SafeString(out);
        });

        var logSource = $("#log-template").html();
        var logTemplate = Handlebars.compile(logSource);

        var headerSource = $("#header-template").html();
        var headerTemplate = Handlebars.compile(headerSource);

        var idpList = {};
        $.each(data['saml20-idp'], function(k, v) {
            if(-1 !== filterState.indexOf(v['state'])) {
                idpList[k] = v;
            }
        });

        var spList = {};
        $.each(data['saml20-sp'], function(k, v) {
            if(-1 !== filterState.indexOf(v['state'])) {
                spList[k] = v;
            }
        });

        var idpLog = logTemplate({
            entities: idpList,
            janusUrlPrefix: janusUrlPrefix
        });
        var spLog = logTemplate({
            entities: spList,
            janusUrlPrefix: janusUrlPrefix
        });

        var header = headerTemplate({
            generatedAt: data['generatedAt']
        });

        $("#header").html(header);
        $("#idpLog").html(idpLog);
        $("#spLog").html(spLog);
    });
});
