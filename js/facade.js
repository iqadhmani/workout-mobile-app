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
            localStorage.setItem("typeId", $(this).attr("data-row-id") );
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
                "<img src='"+row['startImage']+"' width='20%' >" +
                "<h1> " + row['name'] + "</h1></a></li>";
        }
        var lv = $("#lvExercises");
        lv = lv.html(htmlcode);
        lv.listview("refresh"); //important

        $("#lvExercises a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("exerciseId", $(this).attr("data-row-id") );
            $.mobile.changePage("#pageExerciseCurrentDetail", {transition: 'fade'});
        }
    }
    Exercise.select(options, callback);
}

function getExerciseCuttentDeatil()
{
    var exerciseId = localStorage.getItem('exerciseId');
    var options = [exerciseId];
    function callback(tx,results) {
        var row = results.rows[0];
        var htmlcode = "";
        if (row["endImage"] == null) {
            htmlcode = "<h1>"+row['name']+"</h1>"
                + "<img src='"+row["startImage"]+"' width='50%'>"
                + "<p>"+row['description']+"</p>";
        }
        else{
            htmlcode = "<h1>"+row['name']+"</h1>"
                + "<img src='"+row["startImage"]+"' width='50%'>"
                + "<img src='"+row["endImage"]+"' width='50%'>"
                + "<p>"+row['description']+"</p>";
        }

        var lv = $("#lvExercisesDetail");
        lv = lv.html(htmlcode);
    }
    CurrentExercise.select(options,callback);
}

function getAllExercise() {
    var options =[];
    function callback(tx,results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#' data-icon='plus'>" +
                "<img src='"+row['startImage']+"' width='20%' >" +
                "<h1> " + row['name'] + "</h1></a></li>";
        }
        var lv = $("#lvAllExercise");
        lv = lv.html(htmlcode);
        lv.listview("refresh");
    }
    Exercise.selectAll(options,callback);
}
