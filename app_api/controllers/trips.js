const mongoose = require('mongoose'); //set.('debug', true);
const Model = mongoose.model('trips');

// GET: /trips - lists all trips
const tripList = async (req, res) => {
    Model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if(!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - return a single trip
const tripFindByCode = async (req, res) => {
    Model
        .find({ 'code': req.params.tripCode})
        .exec((err, trips) => {
            if(!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// POST: /trips - add a new trip
const tripAddTrip = async (req, res) => {
    Model
        .create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        (err, trips) => {
            if(err) {
                return res
                    .status(400) // bad request, invalid content
                    .json(err);
            } else {
                return res
                    .status(201) // created
                    .json(trips);
            }
        });
}

// PUT: /trips/:tripCode - Update a single trip
const tripUpdateTrip = async (req, res) => {
    console.log(req.body);
    Model
        .findOneAndUpdate({ 'code': req.params.tripCode},{
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, {new: true})
        .then(trips => {
            if(!trips){
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            res.send(trips);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
}

module.exports = {
    tripList,
    tripFindByCode,
    tripAddTrip,
    tripUpdateTrip
};