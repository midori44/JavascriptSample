$(".update").on("click", "a", function (e) {
    let dataId: string = $(this).attr("data-id");
    let dataVal: string = $(this).attr("data-val");
    let dataNow: string = $(this).attr("data-now");

    let aN = $("<a></a>").attr("data-id", dataId).attr("data-now", dataVal).attr("data-val", "-").addClass("update").text("- に変更");
    let aA = $("<a></a>").attr("data-id", dataId).attr("data-now", dataVal).attr("data-val", "A").addClass("update").text("A に変更");
    let aB = $("<a></a>").attr("data-id", dataId).attr("data-now", dataVal).attr("data-val", "B").addClass("update").text("B に変更");
    $("#" + dataId + " button").removeClass("btn-default").removeClass("btn-primary").removeClass("btn-success");
    $("#" + dataId + " button").text(dataVal + " ").append($("<span></span>").addClass("caret"));
    $("#" + dataId + " ul").empty();
    switch (dataNow) {
        case "A":
            let countA: number = +$("#A").text();
            $("#A").text(--countA);
            break;
        case "B":
            let countB: number = +$("#B").text();
            $("#B").text(--countB);
            break;
    }
    switch (dataVal) {
        case "A":
            let countA: number = +$("#A").text();
            $("#A").text(++countA);
            $("#" + dataId + " button").addClass("btn-success");
            $("#" + dataId + " ul").append($("<li></li>").append(aB));
            $("#" + dataId + " ul").append($("<li></li>").append(aN));
            break;
        case "B":
            let countB: number = +$("#B").text();
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