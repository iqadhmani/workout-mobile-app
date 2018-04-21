/**
 * File Name: database.js
 *
 * Revision History:
 *            Qiao Wang, 2018-04-18 : Created
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
                + "description VARCHAR(255),"
                + "typeId INTEGER NOT NULL,"
                + "startImage VARCHAR(255),"
                + "endImage VARCHAR(255),"
                + "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql, options, successCreate, errorHandler);
            console.info("Inserting data to Table exercise...");
            sql = ["INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Cable Rope Crunch','Slowly pull down on the rope. Hold as soon as you reach the bottom, then repeat',1,'img/actions/cable_rope_crunch.jpg','img/actions/cable_rope_crunch2.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Barbell Deadlift','The barbell deadlift is a classic bodybuilding exercise meant for putting on mass and building strength overall throughout the entire body.',2,'img/actions/deadlift1.jpg','img/actions/deadlift2.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Dumbbell Alternate Bicep Curl','standing with your feet shoulders width apart. Pick up the barbells using a palm inward grip. Curl each barbell alternating each time. Repeat for the desired amount of reps.',3,'img/actions/dumbbell_alternate_bicep_curl.jpg','img/actions/dumbbell_alternate_bicep_curl1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Barbell Bench Press','Bench press is a great exercise for building a powerful chest. The bench press is one of the power exercises, known to be very effective for building body mass. Learning how to do a proper bench press is well worth the effort.',4,'img/actions/barbell_bench_press.jpg','img/actions/barbell_bench_press1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Barbell Behind The Back Wrist Curl','Stand with your feet shoulders width apart. Grasp the barbell in your hands with your palms facing outwards. Lift the barbell up and down using only your hands while keeping your arms straight.',5,'img/actions/barbell_behind_the_back_wrist_curl.jpg','img/actions/barbell_behind_the_back_wrist_curl1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Band Hip Lift',' To begin this exercise; take a band and secure it underneath two dumbbells so that they wont move. Move your body so that your hips are right under the bands and set up for a basic sit up position with your knees up and feet firm on the floor. Keep your hands extended behind your head. Push your shoulders to the floor as you raise your hips and extend the band as high as possible. Hold onto the position for a few seconds and return to the start. Repeat this exercise for as many repetitions as needed.',6,'img/actions/band_hip_lift.jpg','img/actions/band_hip_lift1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Barbell Shoulder Press','The Barbell Shoulder Press primarily works on the deltoid muscle of the shoulders but also brings the surrounding muscles into play.',7,'img/actions/barbell_shoulder_press.jpg','img/actions/barbell_shoulder_press1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Cable Rope Triceps Pushdown','The rope triceps pushdown exercise uses a rope to target the triceps muscle for better definition and bigger arms.',8,'img/actions/Cable Rope Triceps Pushdown.jpg','img/actions/Cable Rope Triceps Pushdown1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Barbell Deep Squat','This is a variation of the regular squat in which rather than squatting till your thighs are parallel with the floor, you squat down as low as you possibly can letting your glutes and hamstrings get more into the exercise. Start off by setting up a weighted barbell with the amount of weight that you would like to perform for this exercise. Then position the bar on your shoulder blades with an overhand shoulder width grip just as in a regular squat position. Bend at your knees and slowly lower yourself towards the ground, squatting down as far as possible and squeezing your squads. Hold for a count then return back up to the starting position. Repeat for as many reps and sets as desired.',9,'img/actions/Barbell Deep Squat.jpg','img/actions/Barbell Deep Squat1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Seated Calf Raise','The seated calf raise exercise is one of the simplest and most effective calf workouts.',10,'img/actions/Seated Calf Raise.jpg','img/actions/Seated Calf Raise1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Ab Crunch Machine','Sit down in the machine and select a resistance that is with-in safe limits of your ability. Do a crunch in a slow controlled manner while slowly breathing out.Pause at the bottom of your crunch for 3 seconds.Return to your starting position in a slow controlled movement.',1,'img/actions/Ab Crunch Machine.jpg','img/actions/Ab Crunch Machine1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage,endImage) VALUES('Cross Body Crunch','The cross-body crunch exercise is a variation of the crunch that works both the upper and lower portion of the abs.',1,'img/actions/Cross Body Crunch.jpg','img/actions/Cross Body Crunch1.jpg');",
                " INSERT INTO exercise(name,description,typeId,startImage) VALUES('Treadmill Running','Treadmill running, just like regular running, uses the treadmill exercise equipment to burn calories, tone the body, increase stamina and endurance and is one of the most common forms of cardio exercises',11,'img/actions/treadmill_running.jpg');"];

            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successInsert, errorHandler);
            }

            //create user table
            sql = "CREATE TABLE IF NOT EXISTS user("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(30) NOT NULL,"
                + "email VARCHAR(50) NOT NULL UNIQUE,"
                + "phone VARCHAR(10),"
                + "fullName VARCHAR(50),"
                + "dob DATE,"
                + "gender VARCHAR(10),"
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
            var sql = ["DROP TABLE IF EXISTS type;",
                "DROP TABLE IF EXISTS detail;",
                "DROP TABLE IF EXISTS action;",
                "DROP TABLE IF EXISTS plan;",
                "DROP TABLE IF EXISTS exercise;",
                "DROP TABLE IF EXISTS user;",
                "DROP TABLE IF EXISTS body_stats;"
            ];

            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], options, successDrop, errorHandler);
            }
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
