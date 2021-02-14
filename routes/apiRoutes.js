const db = require("../models/");

module.exports = function(app) {

    // post api workouts
    app.post("/api/workouts", ({
        body
    }, res) => {
        db.Workout.create(body).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // validate: [({ length }) => length >= 6, "Password should be longer."]

    


    
    // get api workouts range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]).sort({
            'day': -1
        }).limit(7).then(dbWorkout => {
            res.json(dbWorkout.reverse());
        }).catch(err => {
            res.json(err);
        });
    });
};