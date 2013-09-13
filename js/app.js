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

        var prodIdpLog = logTemplate({
            entities: data['prodaccepted']['saml20-idp'],
            janusUrlPrefix: janusUrlPrefix
        });
        var prodSpLog = logTemplate({
            entities: data['prodaccepted']['saml20-sp'],
            janusUrlPrefix: janusUrlPrefix
        });
        var testIdpLog = logTemplate({
            entities: data['testaccepted']['saml20-idp'],
            janusUrlPrefix: janusUrlPrefix
        });
        var testSpLog = logTemplate({
            entities: data['testaccepted']['saml20-sp'],
            janusUrlPrefix: janusUrlPrefix
        });

        var header = headerTemplate({
            generatedAt: data['generatedAt']
        });

        $("#header").html(header);
        $("#prodIdpLog").html(prodIdpLog);
        $("#prodSpLog").html(prodSpLog);
        $("#testIdpLog").html(testIdpLog);
        $("#testSpLog").html(testSpLog);
    });
});