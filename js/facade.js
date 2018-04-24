/**
 * File Name: facade.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */

//IBRAHIM FUNCTIONS START
function emailUnique(email) {
    var options = [email];

    function callback(tx, results) {
        var row = results.rows[0];
        if (row == undefined) {
            var name = $("#txtUserName").val();
            var phone = $("#txtPhone").val();
            var password = $("#txtPassword").val();
            var options = [name, email, phone, password];

            function callback() {
                console.info("Success: Record inserted successfully");
            }

            User.insert(options, callback);

            alert("User Registered Successfully: " + email);
            $("#frmAddAccount").each(function () {
                this.reset();
            });
            localStorage.setItem("userEmail", email);
            userEmail = localStorage.getItem("userEmail");
            if (localStorage.getItem("userEmail") == userEmail) {
                $.mobile.changePage("#pageProfile", {transition: 'fade'});
            }

        }
        else {
            alert("Email is already registered. Please enter another email.");
        }
    }

    User.selectEmail(options, callback);
}


function registerAccount() {
    if (doValidate_frmAddAccount()) {
        var email = $("#txtEmail").val().toLowerCase();
        emailUnique(email);
    }
    else {
        console.error("Validation failed");
    }
}

function loginAccount() {
    if (doValidate_frmLogin()) {
        var email = $("#txtLoginEmail").val().toLowerCase();
        var password = $("#txtLoginPassword").val();
        var options = [email, password];

        function callback(tx, results) {
            var row = results.rows[0];
            userEmail = "";
            if (!(row == undefined)) {
                userEmail = row['email'];
            }
            localStorage.setItem("userEmail", userEmail);
            if (localStorage.getItem("userEmail") == "") {
                alert("Email address or/and password inputted are wrong. Please retry again");
            }
            else {
                alert("Logged in successfully: " + userEmail);
                $("#frmLogin").each(function () {
                    this.reset();
                });
                $.mobile.changePage("#pageProfile", {transition: 'fade'});

            }
        }

        User.select(options, callback);
    }
    else {
        console.error("Validation failed");
    }

}

function updateGender(genderId) {
    var options = [];

    function callback(tx, results) {

        var htmlcode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlcode += "<option value=" + row['id'] + " id='cmbGender" + row['gender'] + "' ";
            if (genderId === i + 1) {
                htmlcode += "selected";
            }
            htmlcode += ">" + row['gender'] + "</option>";
        }

        var op = $("#slcProfileGender");
        op = op.html(htmlcode);
        op.selectmenu("refresh");
    }

    Gender.selectAll(options, callback);
}

function profileShow() {
    userEmail = localStorage.getItem("userEmail");
    var options = [userEmail];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#profileUsernameHeader").text(row['name'].toUpperCase());
        $("#txtProfileUsername").val(row['name']);
        $("#txtProfileFullName").val(row['fullName']);
        $("#txtProfileDob").val(row['dob']);
        var genderId = row['genderId'];
        updateGender(genderId);
        $("#slcProfileGender").val(row['genderId']);
        $("#txtProfileEmail").val(row['email']);
        $("#txtProfilePhone").val(row['phone']);
        localStorage.setItem('userId', row['id']);
    }

    User.selectEmail(options, callback);
}

function updateUser() {
    if (doValidate_frmProfile()) {
        userEmail = localStorage.getItem("userEmail");
        var username = $("#txtProfileUsername").val();
        var fullName = $("#txtProfileFullName").val();
        var dob = $("#txtProfileDob").val();
        var gender = $("#slcProfileGender").val();
        var phone = $("#txtProfilePhone").val();
        var options = [username, phone, fullName, dob, gender, userEmail];

        function callback() {
            console.info("Success: Record updated successfully");
        }

        User.update(options, callback);
        alert("Profile Updated Successfully");
        $.mobile.changePage("#pageLoading", {transition: 'fade'});
        $.mobile.changePage("#pageProfile", {transition: 'pop'});
    }
    else {
        console.error("Validation failed");
    }
}

function deleteUser() {
    var result = confirm("You are about to delete your user. Do you want to proceed?");
    if (result) {
        try {
            userEmail = localStorage.getItem("userEmail");
            var options = [userEmail];
            var userId = localStorage.getItem("userId");
            deleteUserPlan(userId);

            function callback() {
                console.info("Success: user deleted successfully");
                $.mobile.changePage("#", {transition: 'fade'});
            }

            userEmail = "";
            localStorage.setItem('userEmail', '');
            localStorage.removeItem('userId');
            alert("User Deleted Successfully.");
            User.delete(options, callback);
        } catch (e) {
            alert(e);
        }
    }
}

function deleteUserPlan(userId) {
    deleteUserAction(userId);
    var options = [userId];

    function callback() {
        console.info("Success: User's plans deleted successfully");
    }

    Plan.deleteUserPlan(options, callback);
}

function deleteUserAction(userId) {
    deleteUserDetail(userId);
    var options = [userId];

    function callback() {
        console.info("Success: User's actions deleted successfully");
    }

    Action.deleteUserAction(options, callback);
}

function deleteUserDetail(userId) {
    var options = [userId];

    function callback() {
        console.info("Success: User's actions detail deleted successfully");
    }

    Detail.deleteUserDetail(options, callback);
}

//IBRAHIM FUNCTIONS END

function showAddNewPlan() {
    if ($("#enterPlanName").is(":visible")) {
        $("#enterPlanName").hide();
    }
    else {
        $("#enterPlanName").show();
    }
}

//Exercise functions
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
        lv.listview("refresh");

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

//display all exercise when user click add new action
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
            var userId = localStorage.getItem("userId");
            var options = "";
            options = [planId, exerciseId, userId];

            function callback() {
                alert("Insert successfully.");
            }

            Action.insert(options, callback);
        }
    }

    Exercise.selectAll(options, callback);
}


function addNewPlan() {
    if (doValidate_frmEnterPlanName()) {
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

        //get the userId from localstorage which comes from user login
        var id = localStorage.getItem('userId');
        if (id == null) {
            $.mobile.changePage("#pageHome", {transition: 'fade'});
            alert('You have to login or register before add on plan.');
        }
        else {
            options = [date, planName, id];

            function callback() {
                console.info("Success: Record inserted successfully");
            }

            Plan.insert(options, callback);
        }

        location.reload();
    }
    else {
        console.error("Validation failed");
    }

}

function displayAllPlans() {
    var id = localStorage.getItem("userId");
    var options = [id];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlcode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>" + row['name'] + "</h1>" +
                "<p>" + row['date'] + "</p>" +
                "</a></li>"
        }
        if (localStorage.getItem('userEmail') == null || localStorage.getItem('userEmail') == "") {
            htmlcode = "";
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

    Plan.selectUserPlan(options, callback);
}

function showOnePlan() {
    var id = localStorage.getItem("planId");
    var options = [id];

    function callback(tx, results) {

        var htmlcode = "";
        var htmlcontent = "";
        var planName = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            planName = results.rows[0]['planName'];
            htmlcontent += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<img src='" + row['startImage'] + "' width='20%'>" +
                "<h1> " + row['name'] + "</h1>" +
                "</a></li>";
        }
        htmlcode = "<h1>" + planName + "</h1>" + htmlcontent;
        var lv = $("#lvOnePlan");
        lv = lv.html(htmlcode);
        lv.listview("refresh");

        $("#lvOnePlan a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("actionId", $(this).attr("data-row-id"));
            $.mobile.changePage("#pageActionDetail", {transition: 'fade'});
        }
    }

    Action.selectPlanActionExercise(options, callback);
}

function EditCurrentPlan() {
    $("#divEditPlan").show();
    $("#btnUpdateCurrentPlan").show();

    var id = localStorage.getItem("planId");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        $("#txtPlanNameModify").val(row['name']);
        $("#txtPlanDateModify").val(row['date']);
    }

    Plan.select(options, callback);

}

function updateCurrentPlan() {
    if (doValidate_frmEditPlan()) {
        var id = localStorage.getItem("planId");
        var planName = $("#txtPlanNameModify").val();
        var planDate = $("#txtPlanDateModify").val();
        var options = [];
        options = [planName, planDate, id];

        function callback() {
            alert("update successfully.");
        }

        Plan.update(options, callback);
        location.reload();
    }
    else {
        console.error("Validation failed");
    }

}

function deleteCurrentPlan() {
    var id = localStorage.getItem("planId");
    var options = [id];
    deleteAction(id);
    function callback() {
        alert("This plan has been removed.");
    }

    Plan.delete(options, callback);
    $.mobile.changePage("#pageWorkout", {transition: 'fade'});
}


function deleteAction(planId){
    var options = [planId];
    deleteDetail(planId);
    function callback() {
        console.log("Delete successfully.");
    }
    Action.deletePlanAction(options,callback);
}

function deleteDetail(planId){
    var options = [planId];
    function callback() {
        console.log("Delete successfully.");
    }
    Detail.deletePlanDetail(options,callback);
}


function showActionDetail() {
    var id = localStorage.getItem("actionId");
    var options = [id];

    function callback(tx, results) {
        var htmlcode = "";
        var row = results.rows[0];

        if (row['endImage'] == null) {
            htmlcode = "<img src='" + row['startImage'] + "' width='50%'>";
            $("#divCardioDetail").show();
            $("#divStrengthDetail").hide();
        }
        else {
            htmlcode = "<img src='" + row['startImage'] + "' width='50%' style=''>" +
                "<img src='" + row['endImage'] + "' width='50%'>";
            $("#divStrengthDetail").show();
            $("#divCardioDetail").hide();
        }

        var lv = $("#lvActionDetail");
        lv = lv.html(htmlcode);
        lv.listview("refresh");
    }

    Action.select(options, callback);

    var setId = 1;
    $("#txtSet").val(setId);
}

function saveCurrentRecord() {
    if (doValidate_frmStrengthDetail()) {
        var set = $("#txtSet").val();
        var weight = $("#txtWeight").val();
        var rep = $("#txtRep").val();
        var timeLength = $("#txtTimeLength").val();
        var actionId = localStorage.getItem("actionId");
        var date = $("#exerciseDate").val();
        var options = [];
        var userId = localStorage.getItem("userId");
        if (timeLength == "") {
            options = [date, weight, rep, null, actionId, userId];
        }
        else {
            options = [date, null, null, timeLength, actionId, userId];
        }

        function callback() {
            alert("Record has been saved");
            console.info("Success: Record inserted successfully");
        }

        Detail.insert(options, callback);


        //reset the inout box
        set++;
        $("#txtSet").val(set);
        $("#txtTimeLength").val("");
        $("#txtRep").val("");
        $("#txtWeight").val("");
        $("#exerciseDate").val("");
    }
    else {
        console.error("Validation error");
    }

}

function showAllHistory() {
    var id = localStorage.getItem("actionId");
    var options = [id];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['timeLength'] == null) {
                htmlcode += "<li><a data-role='button'  data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>SetId: " + (i + 1) + "</h1>" +
                    "<h3>Weight: " + row['weight'] + " lb</h3>" +
                    "<h3>Rep: " + row['rep'] + "</h3>" +
                    "<h3>Date: " + row['date'] + "</h3>" +
                    "</li>"
            }
            else {
                htmlcode += "<li><a data-role='button'  data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>" + (i + 1) + "</h1>" +
                    "<h3>" + row['timeLength'] + " min</h3>" +
                    "<h3>" + row['date'] + "</h3>" +
                    "</li>"
            }
        }
        var lv = $("#lvHistory");
        lv = lv.html(htmlcode);
        lv.listview("refresh");

        $("#lvHistory a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("detailId", $(this).attr("data-row-id"));
            $.mobile.changePage("#pageEditDetail", {transition: 'none'});
        }
    }

    Detail.selectByActionId(options, callback);
}

function deleteOneDetail() {
    var id = localStorage.getItem("detailId");
    var options = [id];

    function callback() {
        alert("Delete successfully");
    }

    Detail.delete(options, callback);
    $.mobile.changePage("#pageHistory", {transition: 'none'});
}

function EditOneDetail() {
    var id = localStorage.getItem("detailId");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        if (row['timeLength'] == null) {
            $("#divStrengthDetailModify").show();
            $("#divCardioDetailModify").hide();
            $("#txtSetModify").val();
            $("#txtWeightModify").val(row['weight']);
            $("#txtRepModify").val(row['rep']);
        }
        else {
            $("#divStrengthDetailModify").hide();
            $("#divCardioDetailModify").show();
            $("#txtTimeLengthModify").val();
        }
        $("#exerciseDateModify").val(row['date']);
    }

    Detail.select(options, callback);
}

function deleteCurrentAction() {
    var id = localStorage.getItem("actionId");
    var options = [id];

    function callback() {
        alert("This action has been removed.")
    }

    Action.delete(options, callback);
    $.mobile.changePage("#pagePlan", {transiton: 'none'});
}

function updateCurrentDetail() {
    if (doValidate_frmStrengthDetailModify()) {
        var id = localStorage.getItem("detailId");
        var weight = $("#txtWeightModify").val();
        var rep = $("#txtRepModify").val();
        var timeLength = $("#txtTimeLengthModify").val();
        var date = $("#exerciseDateModify").val();
        var actionId = localStorage.getItem("actionId");
        var options = [];
        if (timeLength == "") {
            options = [date, weight, rep, null, actionId, id];
        }
        else {
            options = [date, null, null, timeLength, actionId, id];
        }

        function callback() {
            alert("detail updated successfully.");
        }

        Detail.update(options, callback);
        $.mobile.changePage("#pageHistory", {transiton: 'none'});
    }
    console.error("valiation error");
}

//About page
//clear Database
function clearDatabase() {

    try {
        DB.dropTables();
        localStorage.clear();
        alert("Database cleared.");
    } catch (e) {
        alert(e);
    }


}



