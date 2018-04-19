/**
 * File Name: database.js
 *
 * Revision History:
 *			Qiao Wang, 2018-04-18 : Created
			Ibrahim Qadhmani, 2018-04-18 : Revised
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ")--" + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "workoutDB";
        var version = "1.1";
        var displayName = "DB for workout App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database ...");
        //or window.openDatabase()
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },

    createTables: function () {

        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successCreate() {
            console.info("Success: Create Table successful. ");
        }

        function successInsert() {
            console.info("Success: Data insert successful");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];
            //Create two lookup tables
            //type table
            //drop type table
            console.info("Dropping Table type if exists...");
            sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDrop, errorHandler);
            //create type table
            console.info("Creating Table: type...");
            sql = "CREATE TABLE IF NOT EXISTS type("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            tx.executeSql(sql, options, successCreate, errorHandler);
            console.info("Inserting data to Table type...");
            sql = ["INSERT INTO type(name) VALUES('Abs');",
                "INSERT INTO type(name) VALUES('Back');",
                "INSERT INTO type(name) VALUES('Biceps');",
                "INSERT INTO type(name) VALUES('Chest');",
                "INSERT INTO type(name) VALUES('Forearm');",
                "INSERT INTO type(name) VALUES('Glutes');",
                "INSERT INTO type(name) VALUES('Shoulders');",
                "INSERT INTO type(name) VALUES('Triceps');",
                "INSERT INTO type(name) VALUES('Upper Legs');",
                "INSERT INTO type(name) VALUES('Loweer Legs');",
                "INSERT INTO type(name) VALUES('Cardio');"];
            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successInsert, errorHandler);
            }

            //exercise table
            //drop exercise table
            console.info("Dropping Table exercise if exists...");
            sql = "DROP TABLE IF EXISTS exercise;";
            tx.executeSql(sql, options, successDrop, errorHandler);
            //create exercise table
            console.info("Creating Table: exercise...");
            sql = "CREATE TABLE IF NOT EXISTS exercise("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(50) NOT NULL,"
                + "typeId INTEGER NOT NULL,"
                + "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql, options, successCreate, errorHandler);
            console.info("Inserting data to Table exercise...");
            sql = ["INSERT INTO exercise(name,typeId) VALUES('Cable Rope Crunch',1);",
                " INSERT INTO exercise(name,typeId) VALUES('Barbell Deadlift',2);",
                " INSERT INTO exercise(name,typeId) VALUES('Dumbbell Alternate Bicep Curl',3);",
                " INSERT INTO exercise(name,typeId) VALUES('Barbell Bench Press',4);",
                " INSERT INTO exercise(name,typeId) VALUES('Barbell Behind The Back Wrist Curl',5);",
                " INSERT INTO exercise(name,typeId) VALUES('Band Hip Lift',6);",
                " INSERT INTO exercise(name,typeId) VALUES('Barbell Shoulder Press',7);",
                " INSERT INTO exercise(name,typeId) VALUES('Cable Rope Triceps Pushdown',8);",
                " INSERT INTO exercise(name,typeId) VALUES('Barbell Deep Squat',9);",
                " INSERT INTO exercise(name,typeId) VALUES('Seated Calf Raise',10);",
                " INSERT INTO exercise(name,typeId) VALUES('Treadmill Running',11);"];
            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successInsert, errorHandler);
            }

            //create user table
            sql = "CREATE TABLE IF NOT EXISTS user("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(30) NOT NULL,"
                + "email VARCHAR(50) NOT NULL,"
                + "phone VARCHAR(10),"
                + "password VARCHAR(20));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            //create body stats table
            sql = "CREATE TABLE IF NOT EXISTS body_stats("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "age INTEGER(10) NOT NULL,"
                + "weight INTEGER(10),"
                + "height INTEGER(10),"
                + "body_fat INTEGER(10),"
                + "waist INTEGER(10),"
                + "chest INTEGER(10),"
                + "arm INTEGER(10),"
                + "shoulder INTEGER(10),"
                + "hip INTEGER(10),"
                + "foream INTEGER(10),"
                + "thigh INTEGER(10),"
                + "calve INTEGER(10),"
                + "neck INTEGER(10),"
                + "userId INTEGER NOT NULL,"
                + "FOREIGN KEY(userId) REFERENCES user(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            //create plan table
            sql = "CREATE TABLE IF NOT EXISTS plan("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "date date NOT NULL,"
                + "name VARCHAR(30) NOT NULL,"
                + "userId INTEGER NOT NULL,"
                + "FOREIGN KEY(userId) REFERENCES user(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            //create action table
            sql = "CREATE TABLE IF NOT EXISTS action("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "planId INTEGER,"
                + "exerciseId INTEGER,"
                + "FOREIGN KEY(planId) REFERENCES plan(id),"
                + "FOREIGN KEY(exerciseId) REFERENCES exercise(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            //create detail table
            sql = "CREATE TABLE IF NOT EXISTS detail("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "date date NOT NULL,"
                + "weight INTEGER(10),"
                + "rep INTEGER(10),"
                + "timeLength INTEGER(10),"
                + "actionId INTEGER,"
                + "FOREIGN KEY(actionId) REFERENCES action(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];
            //repeat for other tables
            //=======================
            console.info("Dropping Table: table");
            var sql = "DROP TABLE IF EXISTS table;";

            tx.executeSql(sql, options, successDrop, errorHandler);
            //=====================================================

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
