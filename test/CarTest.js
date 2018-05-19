const chai = require("chai");
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe("Backend Test", ()=>{
    describe("Create a car", ()=>{
        it("Should create a new car", ()=>{
            
        });
    });
    describe("Start a car", ()=>{
        it("Should update status of a car", ()=>{

        });
        it("Should get status of a car", ()=>{

        });
    });
    describe("License plate", ()=>{
        it("Should get license plate of a car", ()=>{

        });
        it("Should set license plate of a car", ()=>{

        });
    });

    describe("Light status", ()=>{
        it("Should get light status of a car", ()=>{

        });
        it("Should set light status of a car", ()=>{

        });
    });

    describe("Turn signal", ()=>{
        it("Should get turn signal of a car", ()=>{

        });
        it("Should set turn signal of a car", ()=>{

        });
    });

    describe("Speed", ()=>{
        it("Should get the speed of a car", ()=>{

        });
        it("Should set the speed of a car", ()=>{

        });
    });
});