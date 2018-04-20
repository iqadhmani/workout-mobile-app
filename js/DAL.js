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
            var sql = "SELECT * FROM exercise WHERE typeId=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM exercise;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};

var CurrentExercise ={
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM exercise WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Plan = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO Plan(date, name, userId) VALUES(?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE Plan SET field1=?, field2=?, field3=?, field4=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM Plan WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Plan WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Plan;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Action = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO Action(planId, exerciseId) VALUES(?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE Action SET field1=?, field2=?, field3=?, field4=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM Action WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Action JOIN exercise ON Action.exerciseId = exercise.id WHERE action.id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectActionExercise: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT action.id AS id, exercise.name AS name, exercise.startImage AS startImage FROM action Join exercise ON action.exerciseId = exercise.id WHERE planId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Action;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
var Detail = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO Detail(field1, field2, field3, field4) VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE Detail SET field1=?, field2=?, field3=?, field4=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM Detail WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Detail WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectDetail_Action_Exercise: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT exercise.startImage AS startImage FROM detail JOIN action ON detail.actionId = action.id JOIN exercise ON action.exerciseId = exercise.id WHERE actionId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Detail;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

