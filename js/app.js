$(document).ready(function () {
    var getHashParameters = function () {
        var hashParams = {};
        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
            q = window.location.hash.substring(1);
        while (e = r.exec(q))
           hashParams[d(e[1])] = d(e[2]);

        return hashParams;
    }

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

    $.when($.ajax("log.json")).then(function (data, textStatus, jqXHR) {
        var logSource = $("#log-template").html();
        var logTemplate = Handlebars.compile(logSource);

        var headerSource = $("#header-template").html();
        var headerTemplate = Handlebars.compile(headerSource);

        var hashParameters = getHashParameters();

        var idpList = {};
        $.each(data['saml20-idp'], function(k, v) {
            if(!hashParameters.state || hashParameters.state === v['state']) {
                // filter by log
                if(hashParameters.log) {
                    var newMessages = [];
                    $.each(v['messages'], function(k2, v2) {
                        if(hashParameters.log === v2.module) {
                            newMessages.push(v2);
                        }
                    });
                    v.messages = newMessages;
                }

                // filter by level
                if(hashParameters.level) {
                    var newMessages = [];
                    $.each(v.messages, function(k2, v2) {
                        if(hashParameters.level <= v2.level) {
                            //alert(v2.level + ' added...');
                            newMessages.push(v2);
                        }
                    });
                    v.messages = newMessages;
                }

                if(0 !== v.messages.length) {
                    idpList[k] = v;
                }
            }
        });

        var spList = {};
        $.each(data['saml20-sp'], function(k, v) {
            if(!hashParameters.state || hashParameters.state === v['state']) {
                // filter by log
                if(hashParameters.log) {
                    var newMessages = [];
                    $.each(v.messages, function(k2, v2) {
                        if(hashParameters.log === v2.module) {
                            newMessages.push(v2);
                        }
                    });
                    v.messages = newMessages;
                }

                // filter by level
                if(hashParameters.level) {
                    var newMessages = [];
                    $.each(v.messages, function(k2, v2) {
                        if(hashParameters.level <= v2.level) {
                            //alert(v2.level + ' added...');
                            newMessages.push(v2);
                        }
                    });
                    v.messages = newMessages;
                }

                if(0 !== v.messages.length) {
                    spList[k] = v;
                }
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
