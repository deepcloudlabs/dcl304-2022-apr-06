// After ES6:
class Employee {
    constructor(identity, fullname, salary, iban, birthYear, departments) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
        this.birthYear = birthYear;
        this.departments = departments;

    };

    increaseSalary(rate) {
        this.salary = this.salary * (1.0 + rate / 100);
    }

    addDepartment(department) {
        this.departments.push(department);
    }

}

let jack = new Employee("25055407390", "jack bauer", 100000, "tr1", 1956, ["IT", "HR"]);
jack.increaseSalary(20);
let kate = new Employee("89643626914", "kate austen", 200000, "tr2", 1986, ["SALES", "FINANCE"]);
kate.increaseSalary(25);
console.log(jack)
console.log(kate)