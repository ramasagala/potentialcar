const express = require('express');
const carRouter = express.Router();
const bodyParser = require('body-parser');
carRouter.use(bodyParser.urlencoded({ extended: true }));
carRouter.use(bodyParser.json());
const Car = require('../models/Car');
const CarSetting = require('../models/CarSetting');

const settingRouter = express.Router({mergeParams: true});
carRouter.use('/:id/settings', settingRouter);

// CREATES A NEW CAR
carRouter.post('/', function (req, res) {
    Car.create({
            name : req.body.name,
            status : req.body.status,
            license_plate : req.body.license_plate
        }, 
        function (err, car) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(car);

            // CREATE CAR SETTING
            CarSetting.create({car_id: car._id});
        });
});

// RETURNS ALL THE CARS IN THE DATABASE
carRouter.get('/', function (req, res) {
    Car.find({}, function (err, cars) {
        if (err) return res.status(500).send("There was a problem finding the Cars.");
        res.status(200).send(cars);
    });
});

// GETS A SINGLE CAR FROM THE DATABASE
carRouter.get('/:id', function (req, res) {
    Car.findById(req.params.id, function (err, car) {
        if (err) return res.status(500).send("There was a problem finding the car.");
        if (!car) return res.status(404).send("No car found.");
        res.status(200).send(car);
    });
});

// DELETES A CAR FROM THE DATABASE
carRouter.delete('/:id', function (req, res) {
    Car.findByIdAndRemove(req.params.id, function (err, car) {
        if (err) return res.status(500).send("There was a problem deleting the car.");
        res.status(200).send("Car "+ car.name +" was deleted.");
    });
});

// UPDATES A SINGLE CAR IN THE DATABASE
carRouter.post('/:id', function (req, res) {    
    Car.findByIdAndUpdate(req.params.id, req.body, {upsert: true, new: true}, function (err, car) {
        if (err) return res.status(500).send("There was a problem updating the car.");
        res.status(200).send(car);
    });
});

// GET A CAR SETTING
settingRouter.get("/", function(req, res){
    CarSetting.findOne({car_id: req.params.id}, function(err, setting){
        if (err) return res.status(500).send("There was a problem getting the car setting.");
        res.status(200).send(setting);
    });
});

// UPDATES A CAR SETTING
settingRouter.post("/", function(req, res){
    CarSetting.findOneAndUpdate({car_id: req.params.id},req.body, {upsert: true, new: true}, function(err, setting){
        if (err) return res.status(500).send("There was a problem updating the car setting.");
        res.status(200).send(setting);
    });
});

module.exports = carRouter;