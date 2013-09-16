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

        var errorLogSource = $("#errorLog-template").html();
        var errorLogTemplate = Handlebars.compile(errorLogSource);

        var idpEntities = {};
        var idpErrors = {};
        var spEntities = {};
        var spErrors = {};

        // separate the entities based on their workflow state
        $.each(data['saml20-idp'], function(k, v) {
            $.each(v.messages, function(k, m) {
                if(20 === m.level) {
                    if(0 <= $.inArray(v.state, showWorkflowErrors)) {
                        if(!idpErrors[v.state]) {
                            idpErrors[v.state] = [];
                        }
                        m.eid = v.eid;
                        idpErrors[v.state].push(m);
                    }
                }
            });
            if (!idpEntities[v.state]) {
                idpEntities[v.state] = [];
            }
            v.entityid = k;
            idpEntities[v.state].push(v);
        });

        // separate the entities based on their workflow state
        $.each(data['saml20-sp'], function(k, v) {
            $.each(v.messages, function(k, m) {
                if(20 === m.level) {
                    if(0 <= $.inArray(v.state, showWorkflowErrors)) {
                        if(!spErrors[v.state]) {
                            spErrors[v.state] = [];
                        }
                        m.eid = v.eid;
                        spErrors[v.state].push(m);
                    }
                }
            });
            if (!spEntities[v.state]) {
                spEntities[v.state] = [];
            }
            v.entityid = k;
            spEntities[v.state].push(v);
        });

        var idpLog = logTemplate({
            type: 'saml20_idp',
            entities: idpEntities,
            janusUrlPrefix: janusUrlPrefix
        });
        var spLog = logTemplate({
            type: 'saml20_sp',
            entities: spEntities,
            janusUrlPrefix: janusUrlPrefix
        });

        var header = headerTemplate({
            generatedAt: data['generatedAt']
        });

        var idpErrorLog = errorLogTemplate({
            errors: idpErrors
        });

        var spErrorLog = errorLogTemplate({
            errors: spErrors
        });

        $("#header").html(header);

        $("#idpErrorLog").html(idpErrorLog);
        $("#spErrorLog").html(spErrorLog);

        $("#idpLog").html(idpLog);
        $("#spLog").html(spLog);
    });
});
