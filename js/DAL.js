/**
 * File Name: DAL.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */

var Type ={
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Exercise ={
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM exercise typeId=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};