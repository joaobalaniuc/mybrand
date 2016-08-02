$(document).ready(function () {

    abort = false; // cancelar searching?

    if (typeof localStorage.chosen === "undefined") {
        localStorage.chosen = "com,com.br,net,org,co.uk,club,us,aero";
    }
    var chosen = localStorage.chosen;
    var chosenArr = chosen.split(",");
    //console.log(chosenArr);

    $.each(chosenArr, function (i, val) {
        //console.log(val);
        //==============
        // #index page
        //==============
        var html = "";
        html += '<li data-num="' + i + '" data-tld="' + val + '"><a class="item-link"><div class="item-content"><div class="item-inner">';
        html += '<div class="item-title">';
        html += '<img class="loading" src="img/reload.svg" style="vertical-align:middle;display:none" />';
        html += '<i style="color:#666" class="none fa fa-circle-o"></i> <i class="fa fa-check-circle-o yes" style="display:none"></i> <i class="fa fa-exclamation-circle no" style="display:none"></i> <i class="fa fa-question-circle-o question" style="display:none"></i>';
        html += ' &nbsp; <span class="string"></span><span class="tld">.' + val + '</span></div>';
        html += '</div></div></a></li>';
        $('#result').append(html);
        //==============
        // #replace page
        //==============
        var html = "";
        html += '<li data-num="' + i + '" data-tld="' + val + '"><a class="item-link"><div class="item-content"><div class="item-inner">';
        html += '<div class="item-title">';
        html += ' &nbsp; <span class="string"></span><span class="tld">.' + val + '</span></div>';
        html += '</div></div></a></li>';
        $('#replace').append(html);
    });
    //console.log(tldCat);
    var html = "";
    for (i = 0; i < tKeys.length; i++) {
        k = tKeys[i];

        //console.log(tldCat[k]);
        html += '<li class="accordion-item"><a href="#" class="item-link item-content"><div class="item-inner"><div class="item-title">';
        html += '<i class="fa fa-' + tldIco[k] + '"></i> &nbsp; ' + k.toUpperCase();
        html += '</div></div></a>';
        html += '<div class="accordion-item-content"><div class="list-block"><ul>';

        var dom = tldCat[k];
        dom = dom.split(",");
        $.each(dom, function (i, val) {
            if (chosenArr.indexOf(val) > -1) {
                var color = "color-cyan";
                var ico = "circle-o";
            }
            else {
                var color = "color-white";
                var ico = "";
            }
            html += '<li class="swipeout" data-tld="' + val + '"><div class="swipeout-content"><a href="#replace" class="item-link item-content"><div class="item-inner ' + color + '" style="padding-left:30px;background:none;padding-right:15px">';
            html += '.' + val + ' <i class="fa fa-' + ico + '"></i>';
            html += '</div></a></div>';
            //html += '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" class="demo-forward bg-blue">Forward</a></div>';
            html += '<div class="swipeout-actions-right"><a href="#" data-tld="' + val + '" class="demo-actions bg-cyan">Use</a><a href="#" class="demo-mark bg-green">Fav</a></div>';
            html += '</li>';
        });
        html += '</ul></div></div></li></ul></div>';
    }
    $('#bycat').html(html);
    var html = '';
    for (key in tldx) {
        if (chosenArr.indexOf(key) > -1) {
            var color = "color-cyan";
            var ico = "circle-o";
        }
        else {
            var color = "color-white";
            var ico = "";
        }
        html += '<li class="swipeout" data-tld="' + key + '"><div class="swipeout-content"><a href="#replace" class="item-link item-content"><div class="item-inner ' + color + '" style="background:none;padding-right:15px">';
        html += '.' + key + ' <i class="fa fa-' + ico + '"></i>';
        html += '</div></a></div>';
        //html += '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Reply</a><a href="#" class="demo-forward bg-blue">Forward</a></div>';
        html += '<div class="swipeout-actions-right"><a href="#" data-tld="' + key + '" class="demo-actions bg-cyan">Use</a><a href="#" class="demo-mark bg-green">Fav</a></div>';
        html += '</li>';
    }
    $('#listall').html(html);
});
$$(document).on('click', '#search_loading', function (e) {
    searchCancel();
});
$$(document).on('click', '#search', function (e) {

    searchReset();

    var str = $('#string').val();

    if (str.length < 3) {
        return false;
    }

    $('#search').hide();
    $('#search_loading').show();
    $('#string').prop("disabled", true);
    abort = false;
    domainSearch(0);
});
$$(document).on('keyup', '#string', function (e) {

    var str = $('#string').val();

    str = str.replace(/ /g, "").trim().toLowerCase();

    $("#result [data-tld]").each(function () {
        var tld = $(this).attr("data-tld");
        $(this).find(".string").html(str);
        //$(this).find(".tld").html(str + "." + tld);
        $(this).removeClass("color-lightgreen").removeClass("color-deeporange");
        $(this).find("i").hide();
        $(this).find("i.none").show();
    });



});
$(window).on("load", function () {
    //alert(dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    //loadingHide();
});
$$(document).on("submit", "form", function (e) {
    e.preventDefault();
    return false;
});
$$(document).on('pageBeforeInit', '*', function (e) {
    //alert(1);
    //$('#toolbar').show();
    //getSession();
});
$$(document).on('pageBack', '*', function (e) {
    //$('#toolbar').show(); // back from messages
});
myApp.onPageInit('*', function (page) {
    //
});
//========================================
// SEARCH DOMAIN , CANCEL & RESET FORM
//========================================
function domainSearch(i) {
    var tld = $("#result [data-tld]:eq(" + i + ")").attr("data-tld");
    if (typeof tld === "undefined") {
        $('#search_loading').hide();
        $('#search').show();
        $('#string').prop("disabled", false);
        return false;
    }
    var $elem = $("#result [data-tld]:eq(" + i + ")");
    $elem.find("i").hide();
    $elem.find(".loading").show();

    var str = $('#string').val();
    str += "." + tld;
    console.log(i + " => " + str);

    xhr = $.ajax({
        url: localStorage.server + "/json.search.php",
        data: {
            'query': str,
            'output': "object"
        },
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 15000
    })
            .always(function () {
                $elem.find(".loading").hide();
                $elem.removeClass("color-lightgreen").removeClass("color-deeporange");
                if (typeof abort === "undefined" || abort === false) {
                    domainInterval = setTimeout(function () {
                        domainSearch(parseInt(i + 1));
                    }, 300);
                }
                else {
                    abort = false;
                }
            })

            .fail(function () {
                $elem.find("i.question").show();
            })

            .done(function (res) {
                console.log(res);
                var reg = res.regrinfo.registered;
                if (reg === "yes") {
                    $elem.find("i.no").show();
                    $elem.removeClass("color-lightgreen").addClass("color-deeporange");
                }
                else {
                    $elem.find("i.yes").show();
                    $elem.addClass("color-lightgreen").removeClass("color-deeporange");
                }
            });

}
function searchReset() {
    $("[data-tld]").removeClass("color-lightgreen").removeClass("color-deeporange");
    $("i.yes").hide();
    $("i.no").hide();
    $("i.question").hide();
    $("i.none").show();
    searchCancel();
}
function searchCancel() {
    $('#search_loading').hide();
    $('#search').show();
    $('#string').prop("disabled", false);
    if (typeof xhr !== "undefined") {
        xhr.abort();
    }
    if (typeof domainInterval !== "undefined") {
        abort = true;
        clearTimeout(domainInterval);
    }
}
//========================================
// Change TLD
//========================================
// 1. click on general list
$$(document).on('click', '.tld_list .swipeout', function (e) {
    sessionStorage.replaceTLD = $(this).attr("data-tld");
    console.log("new replace = " + sessionStorage.replaceTLD);
});
// 2. click on replace list
$$(document).on('click', '#replace li', function (e) {
    var num = $(this).attr("data-num");
    sessionStorage.replaceTLD_old = $(this).attr("data-tld");
    mainView.router.load({pageName: 'index'});
    domainChange(num);
});
function domainChange(i, tld) {
    var virG = "", tld;
    localStorage.chosen = "";
    //
    searchReset();
    //
    $("[data-num=" + i + "]")
            .attr("data-tld", sessionStorage.replaceTLD)
            .find(".tld")
            .html("." + sessionStorage.replaceTLD);
    //
    console.log("old=" + sessionStorage.replaceTLD_old + ", new=" + sessionStorage.replaceTLD);
    // update color list
    $("[data-tld='" + sessionStorage.replaceTLD_old + "']")
            .find(".color-cyan")
            .removeClass("color-cyan")
            .addClass("color-white")
            .find("i")
            .remove("i");
    //
    $("[data-tld='" + sessionStorage.replaceTLD + "']")
            .find(".color-white")
            .removeClass("color-white")
            .addClass("color-cyan")
            .find("i")
            .addClass("fa-circle-o");

    // refresh array local
    $("#replace [data-num]").each(function (index) {
        tld = $(this).find(".tld").text();
        if (typeof tld !== "undefined") {
            tld = tld.slice(1); // remove "."
            localStorage.chosen += virG + tld;
            virG = ",";
        }
    });
    console.log("new chosen = " + localStorage.chosen);
}