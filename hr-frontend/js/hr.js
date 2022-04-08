class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        // observable
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
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
            .then( res => alert(res.status));

    }

    findAllEmployees = () => {
        fetch(`${AppConfig.REST_API_BASE_URL}`,
            {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then( employees => this.employees(employees) );
    }


};

const hrViewModel = new HrViewModel();
window.onload = () => {
    ko.applyBindings(hrViewModel);
}