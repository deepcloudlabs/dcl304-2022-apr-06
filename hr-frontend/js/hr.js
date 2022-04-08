class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        // observable
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        });
        // Try to make a ws connection to the server
        this.socket = io("http://localhost:7100");
        this.socket.on("connect", () => {
            this.socket.on('fire', (emp) => {
                let filteredEmployees = this.employees()
                                            .filter( e => e.identityNo !== emp.identityNo);
                this.employees(filteredEmployees);
            });
            this.socket.on('hire', (emp) => {
                this.employees.push(emp);
            });

        });
    }

    insertFile = (e, data) => {
        e.preventDefault();
        var files = e.target.files || e.originalEvent.dataTransfer.files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.fileData().dataUrl(event.target.result);
        };
    }

    dragover = (e) => {
        e.preventDefault();
    };

    hireEmployee = () => {
        this.employee.photo(this.fileData().dataUrl());
        fetch(`${AppConfig.REST_API_BASE_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: ko.toJSON(this.employee)
            })
            .then(res => res.json())
            .then(res => alert(res.status));
    }

    updateEmployee = () => {
        this.employee.photo(this.fileData().dataUrl());
        fetch(`${AppConfig.REST_API_BASE_URL}/${this.employee.identityNo()}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: ko.toJSON(this.employee)
            })
            .then(res => res.json())
            .then(res => alert("Employee is updated!"));
    }

    findEmployeeByIdentity = () => {
        fetch(`${AppConfig.REST_API_BASE_URL}/${this.employee.identityNo()}`,
            {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(employee => {
                this.employee.update(employee);
                if (employee.photo)
                   this.fileData().dataUrl(employee.photo);
            });
    }

    fireEmployeeByIdentity = () => {
        fetch(`${AppConfig.REST_API_BASE_URL}/${this.employee.identityNo()}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(employee => {
                this.employee.update(employee);
                if (employee.photo)
                   this.fileData().dataUrl(employee.photo);
            });
    }

    fireEmployee = (emp) => {
        fetch(`${AppConfig.REST_API_BASE_URL}/${emp.identityNo}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(employee => {
                this.employee.update(employee);
                if (employee.photo)
                   this.fileData().dataUrl(employee.photo);
                let updatedEmployees =
                    this.employees().filter(e => e.identityNo!==emp.identityNo);
                this.employees(updatedEmployees);
            });
    }

    findAllEmployees = () => {
        fetch(`${AppConfig.REST_API_BASE_URL}`,
            {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(employees => this.employees(employees));
    }


};

const hrViewModel = new HrViewModel();
window.onload = () => {
    ko.applyBindings(hrViewModel);
}