import util from './util';
import express from 'express';
import bodyParser from "body-parser";
import logger from "morgan";
import {Schema, model, Types,connect} from "mongoose";

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
    salary: {
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
    birthYear: {
        type: Number,
        required: true,
        max: 2004
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

//region Express.js Configuration
const app = express();
app.use(bodyParser.json({limit: '5mb'}))
app.use(logger('dev'));
app.use((req,res,next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
//endregion

//region Swagger UI Configuration
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//endregion

//region Rest API Methods
app.post('/employees', (req, res) => {
    let emp = req.body;
    emp._id = emp.identityNo;
    let employee = new Employee(emp);
    employee.save((err, new_emp) => {
        res.set("Content-Type", "application/json");
        if (err) {
            res.status(400).send({"status": err});
        } else {
            for (let socket of sockets){
                socket.emit("hire", emp);
            }
            res.status(200).send({"status": "ok"});
        }
    });
});

app.get('/employees/:id', (req, res) => {
    const identityNo = req.params.id;
    Employee.findOne(
        {identityNo},
        {"_id": false, "__v": false},
        (err, employee) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                res.status(200).send(employee);
            }
        }
    )
});

// page and size are query parameters
// http://localhost:7100/employees?page=0&size=25
app.get('/employees', (req, res) => {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 25;
    const offset = page * size;
    Employee.find(
        {},
        {"_id": false, "__v": false},
        {skip: offset, limit: size},
        (err, employees) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                res.status(200).send(employees);
            }
        }
    )
});

app.put("/employees/:id", (req, res) => {
    const identityNo = req.params.id;
    let emp = req.body;
    emp._id = emp.identityNo;
    const updatableFields = ["salary", "iban", "photo", "department", "fulltime"];
    let updatedFields = {};
    for (let field in emp) { // reflection
        if (emp.hasOwnProperty(field) && updatableFields.includes(field))
            updatedFields[field] = emp[field];
    }
    Employee.update(
        {identityNo},
        {$set: updatedFields},
        {upsert: false},
        (err, employee) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(404).send({"status": err});
            } else {
                res.status(200).send(employee);
            }
        }
    );
});

app.delete('/employees/:id', (req, res) => {
    const identityNo = req.params.id;
    Employee.findOneAndDelete(
        {identityNo},
        (err, employee) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                if (employee === null) {
                    res.status(404).send({"status": "cannot find employee to fire."});
                } else {
                    for (let socket of sockets){
                        socket.emit("fire", employee);
                    }
                    res.status(200).send(employee);
                }
            }
        }
    )
});
//endregion

let server = app.listen(port);
//region WebSocketIO
let io= require("socket.io").listen(server);
io.set("origins", "*:*");
const sockets = [];
io.on("connect", socket => {
    console.log("A new ws connection is now open.")
    sockets.push(socket);
    socket.on("disconnect", () => {
        let index = sockets.indexOf(socket);
        if (index>=0){
            console.log("A ws connection is now closed.")
            sockets.splice(index,1);
        }
    });
})
//endregion
console.log(`Server is running at ${port}.`);