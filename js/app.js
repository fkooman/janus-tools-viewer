$(document).ready(function () {
    $.when($.ajax("log.json")).then(function (data, textStatus, jqXHR) {
        var logSource = $("#log-template").html();
        var logTemplate = Handlebars.compile(logSource);

        var headerSource = $("#header-template").html();
        var headerTemplate = Handlebars.compile(headerSource);
        
        var idpLog = logTemplate({
            entities: data['saml20-idp'],
            janusUrlPrefix: janusUrlPrefix
        });
        var spLog = logTemplate({
            entities: data['saml20-sp'],
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