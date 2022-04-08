class Employee {
    constructor() {
        this.identityNo = ko.observable("1");
        this.fullname= ko.observable("jack bauer");
        this.iban= ko.observable("TR1");
        this.photo= ko.observable(AppConfig.NO_IMAGE);
        this.birthYear= ko.observable(1990);
        this.salary= ko.observable(100000);
        this.department= ko.observable("IT");
        this.fulltime= ko.observable(true);
    }
}