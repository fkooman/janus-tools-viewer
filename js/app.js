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

        var idpEntities = {};
        var spEntities = {};

        // separate the entities based on their workflow state
        $.each(data['saml20-idp'], function(k, v) {
            if (!idpEntities[v.state]) {
                idpEntities[v.state] = [];
            }
            v.entityid = k;
            idpEntities[v.state].push(v);
        });

        // separate the entities based on their workflow state
        $.each(data['saml20-sp'], function(k, v) {
            if (!spEntities[v.state]) {
                spEntities[v.state] = [];
            }
            v.entityid = k;
            spEntities[v.state].push(v);
        });

        var idpLog = logTemplate({
            entities: idpEntities,
            janusUrlPrefix: janusUrlPrefix
        });
        var spLog = logTemplate({
            entities: spEntities,
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
