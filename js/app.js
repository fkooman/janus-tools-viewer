$(document).ready(function () {
    $.when($.ajax("log.json")).then(function (data, textStatus, jqXHR) {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        var idpLog = template({
            entities: data['saml20-idp']
        });
        var spLog = template({
            entities: data['saml20-sp']
        });
        $("#idpLog").html(idpLog);
        $("#spLog").html(spLog);
    });
});