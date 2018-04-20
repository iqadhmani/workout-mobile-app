/**
 * File Name: facade.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */

function registerAccount() {

}

function loginAccount() {

}

function showAddNewPlan() {
    if ($("#enterPlanName").is(":visible")) {
        $("#enterPlanName").hide();
    }
    else {
        $("#enterPlanName").show();
    }
}

function getTypes() {
    var options = [];

    function callback(tx, results) {

        var htmlcode = "";


        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1> " + row['name'] + "</h1></a></li>";
        }

        var lv = $("#lvType");
        lv = lv.html(htmlcode);
        lv.listview("refresh"); //important

        $("#lvType a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("typeId", $(this).attr("data-row-id"));
            $.mobile.changePage("#pageExerciseCurrentType", {transition: 'fade'});
        }


    }

    Type.selectAll(options, callback);
}

function getExercises() {
    var id = localStorage.getItem("typeId");
    var options = [id];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + row['startImage'] + "' width='20%' >" +
                "<h1> " + row['name'] + "</h1></a></li>";
        }
        var lv = $("#lvExercises");
        lv = lv.html(htmlcode);
        lv.listview("refresh"); //important

        $("#lvExercises a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("exerciseId", $(this).attr("data-row-id"));
            $.mobile.changePage("#pageExerciseCurrentDetail", {transition: 'fade'});
        }
    }

    Exercise.select(options, callback);
}

function getExerciseCurrentDetail() {
    var exerciseId = localStorage.getItem('exerciseId');
    var options = [exerciseId];

    function callback(tx, results) {
        var row = results.rows[0];
        var htmlcode = "";
        if (row["endImage"] == null) {
            htmlcode = "<h1>" + row['name'] + "</h1>"
                + "<img src='" + row["startImage"] + "' width='50%'>"
                + "<p>" + row['description'] + "</p>";
        }
        else {
            htmlcode = "<h1>" + row['name'] + "</h1>"
                + "<img src='" + row["startImage"] + "' width='50%'>"
                + "<img src='" + row["endImage"] + "' width='50%'>"
                + "<p>" + row['description'] + "</p>";
        }

        var lv = $("#lvExercisesDetail");
        lv = lv.html(htmlcode);
    }

    CurrentExercise.select(options, callback);
}

function getAllExercise() {
    var options = [];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + row['startImage'] + "' width='20%' >" +
                "<h1> " + row['name'] + "</h1></a></li>";
        }
        var lv = $("#lvAllExercise");
        lv = lv.html(htmlcode);
        lv.listview("refresh");

        $("#lvAllExercise a").on("click", clickHandler);

        function clickHandler() {
            var exerciseId = $(this).attr("data-row-id");
            var planId = localStorage.getItem("planId");
            var options = [];
            options = [planId, exerciseId];

            function callback() {
                alert("Insert successfully.");
            }

            Action.insert(options, callback);
        }
    }

    Exercise.selectAll(options, callback);
}

function addNewPlan() {
    var options = [];
    var planName = $("#txtPlanName").val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var date = yyyy + '-' + mm + '-' + dd;

    //test user id equal 1
    options = [date, planName, 1];

    function callback() {
        console.info("Success: Record inserted successfully");
    }

    Plan.insert(options, callback);
    location.reload();
}

function displayAllPlans() {
    var options = [];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>" + row['name'] + "</h1>" +
                "<p>" + row['date'] + "</p>" +
                "</a></li>"
        }
        var lv = $("#lvAllPlans");
        lv = lv.html(htmlcode);
        lv.listview("refresh");

        $("#lvAllPlans a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("planId", $(this).attr("data-row-id"));
            $.mobile.changePage("#pagePlan", {transition: 'fade'});
        }
    }

    Plan.selectAll(options, callback);
}

function showOnePlan() {
    var id = localStorage.getItem("planId");
    var options = [id];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + row['startImage'] + "' width='20%'>" +
                "<h1> " + row['name'] + "</h1>" +
                "</a></li>";
        }
        var lv = $("#lvOnePlan");
        lv = lv.html(htmlcode);
        lv.listview("refresh");

        $("#lvOnePlan a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("actionId", $(this).attr("data-row-id"));
            $.mobile.changePage("#pageActionDetail", {transition: 'fade'});
        }
    }
    Action.selectActionExercise(options, callback);
}

function showActionDetail() {
    var id = localStorage.getItem("actionId");
    var options = [id];

    function callback(tx, results) {
        var htmlcode = "";
        var row = results.rows[0];
        if (row['endImage'] == null) {
            htmlcode = "<img src='" + row['startImage'] + "' width='50%'>";
        }
        else{
            htmlcode = "<img src='" + row['startImage'] + "' width='50%' style=''>"+
                "<img src='" + row['endImage'] + "' width='50%'>";
        }

        var lv = $("#lvActionDetail");
        lv = lv.html(htmlcode);
        lv.listview("refresh");
    }
    Action.select(options,callback);
}