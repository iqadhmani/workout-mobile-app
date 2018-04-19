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

        var lv = $("#lvtype");
        lv = lv.html(htmlcode);
        lv.listview("refresh"); //important

        $("#lvType a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("typeId", $(this).attr("data-row-id") );
            $.mobile.changePage("#", {transition: 'fade'});
        }


    }
    Type.selectAll(options, callback);
}
