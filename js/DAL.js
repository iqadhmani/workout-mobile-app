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
            var sql = "UPDATE Plan SET name=?, date=? WHERE id=?;";
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
    selectUserPlan: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT plan.name AS name, plan.date AS date, plan.id AS id FROM plan JOIN User ON plan.userId = User.id WHERE userId=?;";
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
    selectPlanActionExercise: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT action.id AS id, exercise.name AS name, exercise.startImage AS startImage, plan.name AS planName FROM plan JOIN action ON plan.id = action.planId JOIN exercise ON action.exerciseId = exercise.id WHERE planId=?;";
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
            var sql = "INSERT INTO Detail(date, weight, rep, timeLength,actionId) VALUES(?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE Detail SET date=?, weight=?, rep=?, timeLength=?, actionId=? WHERE id=?;";
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
    selectByActionId: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Detail WHERE actionId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM detail WHERE id=?;";
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

var User = {
    selectEmail: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE email = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success selectEmail transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE email = ? AND password = ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO user(name, email, phone, password) VALUES(?,?,?,?);";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE user SET name=?, phone=?, fullName=?, dob=?, genderId=? WHERE email=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM user WHERE email=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Gender ={
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM gender;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: selectAll transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};