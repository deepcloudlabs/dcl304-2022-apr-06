import {Schema, model, connect} from "mongoose";
import util from './util';
import express from 'express';

//region Schema definition and database connection initialization
const employeeSchema = new Schema({
    "_id": {
        type: String
    },
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        validate: [util.tcKimlikNoValidator, 'This is not a valid identity no.']
    },
    "photo": {
        type: String,
        required: false,
        default: util.NO_IMAGE
    },
    salary : {
        type: Number,
        required: true,
        min: 4500,
        default: 4500
    },
    iban: {
        type: String,
        required: true,
        validate: [util.ibanValidator, 'This is not a valid iban.']
    },
    "department": {
        type: String,
        enum: ["IT", "SALES", "FINANCE", "HR"],
        default: "SALES"
    },
    "fulltime": {
        type: Boolean,
        required: true,
        default: true
    }
});
connect("mongodb://localhost:27017/hr");
const Employee = model("employees", employeeSchema);
//endregion

const port = 7100;
const app = express();

app.post('/employees', (req,res) => {
   let emp = req.body;
   emp._id = emp.identityNo;
   let employee = new Employee(emp);
   employee.save((err, new_emp) => {
       res.set("Content-Type", "application/json");
       if (err){
           res.status(400).send({"status": err});
       } else {
           res.status(200).send({"status": "ok"});
       }
   });
});

app.get('/employees/:id', (req,res) => {
    const identityNo = req.params.id;
    Employee.findOne(
        {"identityNo": identityNo},
        {"_id": false, "__v": false},
        (err, employee) => {
            res.set("Content-Type", "application/json");
            if (err){
                res.status(400).send({"status": err});
            } else {
                res.status(200).send(employee);
            }
        }
    )
})