const chai = require("chai");
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

const Car = require('../models/Car');
const CarSetting = require('../models/CarSetting');

describe("Backend Test", () => {
    describe("Create a car", () => {
        let car_test = { name: "car test 1", license_plate: "TEST1" };
        it("Should create a new car", (done) => {
            chai.request(server)
                .post("/cars")
                .send(car_test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name");
                    res.body.should.have.property("status");
                    res.body.should.have.property("created");
                    res.body.should.have.property("license_plate");
                    car_test._id = res.body._id;
                    done();
                });
        });
        after(async () => {
            await Car.findByIdAndRemove(car_test._id);
        });
    });

    describe("Start a car", () => {
        let car_test = { name: "car test 2", license_plate: "TEST2" };
        before(async () => {
            car_test = await Car.create(car_test);
        });
        it("Should POST status of a car", (done) => {
            car_test.status = 1;
            chai.request(server)
                .post("/cars/" + car_test._id)
                .send({ status: car_test.status })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eql(car_test.status);
                    done();
                });
        });
        it("Should GET status of a car", (done) => {
            chai.request(server)
                .get("/cars/" + car_test._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").eql(car_test.name);
                    res.body.should.have.property("status").eql(car_test.status);
                    res.body.should.have.property("created");
                    res.body.should.have.property("license_plate").eql(car_test.license_plate);
                    done()
                });
        });
        after(async () => {
            await Car.findByIdAndRemove(car_test._id);
            // await CarSetting.remove({car_id:car_test._id});
        });
    });

    describe("License plate", () => {
        let car_test = { name: "car test 3", license_plate: "TEST3" };
        before(async () => {
            car_test = await Car.create(car_test);
        });
        it("Should POST license plate of a car", (done) => {
            car_test.license_plate = "TEST 3 CHANGE"
            chai.request(server)
                .post("/cars/" + car_test._id)
                .send({ license_plate: car_test.license_plate })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("license_plate").eql(car_test.license_plate);
                    done();
                });
        });
        it("Should GET license plate of a car", (done) => {
            chai.request(server)
                .get("/cars/" + car_test._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name").eql(car_test.name);
                    res.body.should.have.property("status").eql(car_test.status);
                    res.body.should.have.property("created");
                    res.body.should.have.property("license_plate").eql(car_test.license_plate);
                    done();
                });
        });
        after(async () => {
            await Car.findByIdAndRemove(car_test._id);
            // await CarSetting.remove({car_id:car_test._id});
        });
    });

    describe("Light status", () => {
        let car_test = { name: "car test 4", license_plate: "TEST4" };
        let setting_test = {};
        before(async () => {
            car_test = await Car.create(car_test);
        });
        it("Should POST light status of a car", (done) => {
            setting_test.lights = 2;
            chai.request(server)
                .post("/cars/" + car_test._id + "/settings")
                .send({ lights: setting_test.lights })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("lights").eql(setting_test.lights);
                    done();
                });
        });
        it("Should GET light status of a car", (done) => {
            chai.request(server)
                .get("/cars/" + car_test._id + "/settings")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("lights").eql(setting_test.lights);
                    done();
                });
        });
        after(async () => {
            await Car.findByIdAndRemove(car_test._id);
            // await CarSetting.remove({car_id:car_test._id});
        });
    });

    describe("Turn signal", ()=>{
        let car_test = { name: "car test 4", license_plate: "TEST4" };
        let setting_test = {};
        before(async () => {
            car_test = await Car.create(car_test);
        });
        it("Should POST left signal of a car", (done)=>{
            setting_test.left_signal = 1;
            chai.request(server)
                .post("/cars/" + car_test._id + "/settings")
                .send({ left_signal: setting_test.left_signal })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("left_signal").eql(setting_test.left_signal);
                    done();
                });
        });
        it("Should GET left signal of a car", (done)=>{
            chai.request(server)
                .get("/cars/" + car_test._id + "/settings")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("left_signal").eql(setting_test.left_signal);
                    done();
                });
        });
        after(async () => {
            await Car.findByIdAndRemove(car_test._id);
        });
    });

    describe("Speed", ()=>{
        let car_test = { name: "car test 4", license_plate: "TEST4" };
        let setting_test = {};
        before(async () => {
            car_test = await Car.create(car_test);
        });
        it("Should POST speed of a car", (done)=>{
            setting_test.speed = 160;
            chai.request(server)
                .post("/cars/" + car_test._id + "/settings")
                .send({ speed: setting_test.speed })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("speed").eql(setting_test.speed);
                    done();
                });
        });
        it("Should GET speed of a car", (done)=>{
            chai.request(server)
                .get("/cars/" + car_test._id + "/settings")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("speed").eql(setting_test.speed);
                    done();
                });
        });
        after(async () => {
            await Car.findByIdAndRemove(car_test._id);
        });
    });
});