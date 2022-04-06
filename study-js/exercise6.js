class Employee {
    constructor(identity, fullname, salary, iban) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
        //this.sayHello = this.sayHello.bind(this);
    };

    sayHello = () => {
        console.log(`Hello, ${this.fullname}!`);
    }

}

let jack = new Employee("25055407390", "jack bauer", 100000, "tr1", 1956, ["IT", "HR"]);
console.log(jack.sayHello())