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

$(document).ready(function () {
    init();
});

