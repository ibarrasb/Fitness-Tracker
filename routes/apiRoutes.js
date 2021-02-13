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

    // get api workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // put api workouts id
    app.put("/api/workouts/:id", function(req, res) {
        db.Workout.updateOne({
            _id: req.params.id
        }, {
            $push: {
                exercises: req.body
            }
        }).then(function(dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

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