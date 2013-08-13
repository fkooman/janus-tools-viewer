$(document).ready(function () {
    $.when($.ajax("log.json")).then(function (data, textStatus, jqXHR) {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        var idpLog = template({
            entities: data['saml20-idp'],
            janusUrlPrefix: janusUrlPrefix
        });
        var spLog = template({
            entities: data['saml20-sp'],
            janusUrlPrefix: janusUrlPrefix
        });
        $("#idpLog").html(idpLog);
        $("#spLog").html(spLog);
    });
});