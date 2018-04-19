/**
 * File Name: gobal.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */
function btnRegister_click() {
    var userId = localStorage.getItem("userId");
    //userId = 1;
    console.info("Hello " + userId);
    if (userId == null || userId == undefined || userId == "")
    {
        $.mobile.changePage("#pageRegister", {transition: 'fade'});
        registerAccount();
    }
    else {
        $.mobile.changePage("#pageProfile", {transition: 'fade'});
    }
}

function btnLogin_click() {
    var userId = localStorage.getItem("userId");
    //userId = 1;
    console.info("Hello " + userId);
    if (userId == null || userId == undefined || userId == "")
    {
        $.mobile.changePage("#pageLogin", {transition: 'fade'});
        loginAccount();
    }
    else {
        $.mobile.changePage("#pageProfile", {transition: 'fade'});
    }
}

function pageExercise_show() {
    getTypes();
}

function pageExerciseCurrentType_show() {
    getExercises()
}

function pageExerciseCurrentDetail_show() {
    getExerciseCuttentDeatil();
}

function pageAllExercise_show() {
    getAllExercise();
}

function planNameInput_show() {
    showEnterPlanNameBox();
}

function init() {
    //home page handler
    $("#btnRegister").on("click", btnRegister_click);
    $("#btnLogin").on("click", btnLogin_click);
    $("#pageExercise").on("pageshow", pageExercise_show);
    $("#pageExerciseCurrentType").on("pageshow", pageExerciseCurrentType_show);
    $("#pageExerciseCurrentDetail").on("pageshow", pageExerciseCurrentDetail_show);
    $("#addPlanName").on("click", planNameInput_show);
    $("#pageAddPlan").on("pageshow", pageAllExercise_show);
    $("#btnAddAccount").on("click", btnAddAccount_click);

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

