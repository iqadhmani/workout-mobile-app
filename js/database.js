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

            //Drop two lookup tables  exercise and type in the beginning
            //drop exercise table
            console.info("Dropping Table exercise if exists...");
            sql = "DROP TABLE IF EXISTS exercise;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            //drop type table
            console.info("Dropping Table type if exists...");
            sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            //Create two lookup tables
            //exercise table
            console.info("Creating Table: exercise...");
            sql = "CREATE TABLE IF NOT EXISTS exercise("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql, options, successCreate, errorHandler);

            console.info("Inserting data to Table exercise...");
            sql = ["INSERT INTO exercise(name) VALUES('Cable Rope Crunch');",
                " INSERT INTO exercise(name) VALUES('Barbell Deadlift');",
                " INSERT INTO exercise(name) VALUES('Dumbbell Alternate Bicep Curl');",
                " INSERT INTO exercise(name) VALUES('Barbell Bench Press');",
                " INSERT INTO exercise(name) VALUES('Barbell Behind The Back Wrist Curl');",
                " INSERT INTO exercise(name) VALUES('Band Hip Lift');",
                " INSERT INTO exercise(name) VALUES('Barbell Shoulder Press');",
                " INSERT INTO exercise(name) VALUES('Cable Rope Triceps Pushdown');",
                " INSERT INTO exercise(name) VALUES('Barbell Deep Squat');",
                " INSERT INTO exercise(name) VALUES('Seated Calf Raise');",
                " INSERT INTO exercise(name) VALUES('Treadmill Running');"
            ];

            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successInsert, errorHandler);

            }

            //exercise type table
            console.info("Creating Table: type...");
            sql = "CREATE TABLE IF NOT EXISTS type("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            tx.executeSql(sql, options, successCreate, errorHandler);

            console.info("Inserting data to Table table...");
            sql = [
                "INSERT INTO type(name) VALUES('Abs');",
                "INSERT INTO type(name) VALUES('Back');",
                "INSERT INTO type(name) VALUES('Biceps');",
                "INSERT INTO type(name) VALUES('Chest');",
                "INSERT INTO type(name) VALUES('Forearm');",
                "INSERT INTO type(name) VALUES('Glutes');",
                "INSERT INTO type(name) VALUES('Shoulders');",
                "INSERT INTO type(name) VALUES('Triceps');",
                "INSERT INTO type(name) VALUES('Upper Legs');",
                "INSERT INTO type(name) VALUES('Loweer Legs');",
                "INSERT INTO type(name) VALUES('Cardio');"
            ];

            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successInsert, errorHandler);

            }
            //===================================================================

            console.info("Creating Other Tables:");
            //table with foreign key snippet
            //sql = "CREATE TABLE IF NOT EXISTS review(" +
            //    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            //    "businessName VARCHAR(30) NOT NULL," +
            //    "typeId INTEGER NOT NULL," +
            //    "reviewerEmail VARCHAR(30)," +
            //    "reviewerComments TEXT," +
            //    "reviewDate DATE," +
            //    "hasRating VARCHAR(1)," +
            //    "FOREIGN KEY(typeId) REFERENCES type(id));";






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
