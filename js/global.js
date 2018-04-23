/**
 * File Name: gobal.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */
//GLOBAL VARIABLES START
var userEmail = localStorage.getItem("userEmail");
//GLOBAL VARIABLES END


//IBRAHIM FUNCTIONS START
function btnRegister_click() {

    console.info("Hello " + userEmail);
    if (userEmail == null || userEmail == undefined || userEmail == "")
    {
        $.mobile.changePage("#pageRegister", {transition: 'fade'});
    }
    else {
        $.mobile.changePage("#pageProfile", {transition: 'fade'});
    }
}

function btnLogin_click() {
    console.info("Hello " + userEmail);
    if (userEmail == null || userEmail == undefined || userEmail == "")
    {
        $.mobile.changePage("#pageLogin", {transition: 'fade'});
    }
    else {
        $.mobile.changePage("#pageProfile", {transition: 'fade'});
    }
}

function btnAddAccount_click() {
    registerAccount();
}

function btnLoginAccount_click() {
    loginAccount();
}

function pageProfile_show() {
    if (userEmail == null || userEmail == undefined || userEmail == "") {
        $("#pageProfileSection").hide();
        $.mobile.changePage("#pageLogin", {transition: 'fade'});
        alert("You need to login to reach your profile.");
    }
    else {
        $("#pageProfileSection").show();
        profileController();
    }

}

function btnLogout_click() {
    userEmail = "";
    localStorage.setItem("userEmail", userEmail);
    alert("Logged out successfully. We hope to see you again! :D");
    $.mobile.changePage("#", {transition: 'fade'});
}

function btnCancel_click() {
    $("#frmAddAccount").each(function (){
        this.reset();
    });
    $.mobile.changePage("#pageHome", {transition: 'fade'});
}

function btnCancelLogin_click() {
    $("#frmLogin").each(function (){
        this.reset();
    });
    $.mobile.changePage("#pageHome", {transition: 'fade'});
}
//IBRAHIM FUNCTIONS END

function pageExercise_show() {
    getTypes();
}

function pageExerciseCurrentType_show() {
    getExercises()
}

function pageExerciseCurrentDetail_show() {
    getExerciseCurrentDetail();
}

function pageAllExercise_show() {
    getAllExercise();
}

function btnshowAddNewPlan_click() {
    showAddNewPlan();
}
function pageWorkout_show() {
    displayAllPlans();
}

function btnAddPlan_click() {
    addNewPlan();
}

function pagePlan_show() {
    showOnePlan();
}

function pageActionDetail_show() {
    showActionDetail();
}

function btnSaveCurrent_click() {
    saveCurrentRecord();
}
function pageHistory_show() {
    showAllHistory();
}
function pageEditDetail_show() {
    EditOneDetail();
}

function btnDeleteDetail_click() {
    deleteOneDetail();
}

function btnDeleteAction_click() {
    deleteCurrentAction();
}

function btnEditCurrentPlan_click() {
    EditCurrentPlan();
}

function btnUpdateCurrentPlan_click() {
    updateCurrentPlan();
}

function btnDeleteCurrentPlan_click() {
    deleteCurrentPlan();
}

function btnUpdateDetail_click() {
    updateCurrentDetail();
}
function btnClearDatabase_click(){
    clearDatabase();
}

function init() {
    //home page handler
    $("#btnRegister").on("click", btnRegister_click);
    $("#btnLogin").on("click", btnLogin_click);
    $("#pageExercise").on("pageshow", pageExercise_show);
    $("#pageExerciseCurrentType").on("pageshow", pageExerciseCurrentType_show);
    $("#pageExerciseCurrentDetail").on("pageshow", pageExerciseCurrentDetail_show);
    $("#pageAllExercise").on("pageshow", pageAllExercise_show);
    $("#btnshowAddNewPlan").on("click", btnshowAddNewPlan_click);
    $("#pageWorkout").on("pageshow", pageWorkout_show);
    $("#btnAddPlan").on("click", btnAddPlan_click);
    $("#pagePlan").on("pageshow", pagePlan_show);
    $("#pageActionDetail").on("pageshow", pageActionDetail_show);
    $("#btnSaveCurrent").on("click", btnSaveCurrent_click);
    $("#pageHistory").on("pageshow", pageHistory_show);
    $("#pageEditDetail").on("pageshow", pageEditDetail_show);
    $("#btnDeleteDetail").on("click", btnDeleteDetail_click);
    $("#btnDeleteAction").on("click", btnDeleteAction_click);
    $("#btnEditCurrentPlan").on("click", btnEditCurrentPlan_click);
    $("#btnUpdateCurrentPlan").on("click", btnUpdateCurrentPlan_click);
    $("#btnDeleteCurrentPlan").on("click", btnDeleteCurrentPlan_click);
    $("#btnUpdateDetail").on("click", btnUpdateDetail_click);
    $("#btnClearDatabase").on("click", btnClearDatabase_click);

    //IBRAHIM EVENTS START
    $("#btnAddAccount").on("click", btnAddAccount_click);
    $("#btnLoginAccount").on("click", btnLoginAccount_click);
    $("#pageProfile").on("pagebeforeshow", pageProfile_show);
    $("#btnLogout").on("click", btnLogout_click);
    $("#btnCancel").on("click", btnCancel_click);
    $("#btnCancelLogin").on("click", btnCancelLogin_click);
    //IBRAHIM EVENTS END


}


function initDB() {
    console.info("Creating Database.");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables!");
            DB.createTables();
        }
        else {
            console.error("Error: Cannot create tables : Database not available!");
        }
    } catch (e) {
        console.error("Fatal: Error in initDB(). Can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});

