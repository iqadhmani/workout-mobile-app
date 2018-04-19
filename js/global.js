/**
 * File Name: gobal.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */
function btnRegister_click() {
    registerAccount();
}

function btnLogin_click() {
    loginAccount();
}



function init() {
    //home page handler
    $("#btnRegister").on("click", btnRegister_click);
    $("#btnLogin").on("click", btnLogin_click);
    
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

