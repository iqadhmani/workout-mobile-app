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

function btnAddSet_click() {
    addNewSet();
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
    $("#btnAddSet").on("click", btnAddSet_click);
    

    
    //havent finish
    //$("#btnAddAccount").on("click", btnAddAccount_click);

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

