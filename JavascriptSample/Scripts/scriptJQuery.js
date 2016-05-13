$(".update").on("click", "a", function (e) {
    var dataId = $(this).attr("data-id");
    var dataVal = $(this).attr("data-val");
    var dataNow = $(this).attr("data-now");
    var aN = $("<a></a>").attr("data-id", dataId).attr("data-now", dataVal).attr("data-val", "-").addClass("update").text("- に変更");
    var aA = $("<a></a>").attr("data-id", dataId).attr("data-now", dataVal).attr("data-val", "A").addClass("update").text("A に変更");
    var aB = $("<a></a>").attr("data-id", dataId).attr("data-now", dataVal).attr("data-val", "B").addClass("update").text("B に変更");
    $("#" + dataId + " button").removeClass("btn-default").removeClass("btn-primary").removeClass("btn-success");
    $("#" + dataId + " button").text(dataVal + " ").append($("<span></span>").addClass("caret"));
    $("#" + dataId + " ul").empty();
    switch (dataNow) {
        case "A":
            var countA = +$("#A").text();
            $("#A").text(--countA);
            break;
        case "B":
            var countB = +$("#B").text();
            $("#B").text(--countB);
            break;
    }
    switch (dataVal) {
        case "A":
            var countA = +$("#A").text();
            $("#A").text(++countA);
            $("#" + dataId + " button").addClass("btn-success");
            $("#" + dataId + " ul").append($("<li></li>").append(aB));
            $("#" + dataId + " ul").append($("<li></li>").append(aN));
            break;
        case "B":
            var countB = +$("#B").text();
            $("#B").text(++countB);
            $("#" + dataId + " button").addClass("btn-primary");
            $("#" + dataId + " ul").append($("<li></li>").append(aA));
            $("#" + dataId + " ul").append($("<li></li>").append(aN));
            break;
        case "-":
            $("#" + dataId + " button").addClass("btn-default");
            $("#" + dataId + " ul").append($("<li></li>").append(aA));
            $("#" + dataId + " ul").append($("<li></li>").append(aB));
            break;
    }
});
//# sourceMappingURL=scriptJQuery.js.map