class Role {
    //Role id
    //Title
    //salary
    //department

    constructor(connection, id= 0, departmentId = 0, salary = 0.00 ){
        this.connection = connection;
        this.id = id;
        // INT PRIMARY KEY
        this.salary = salary;
        // DECIMAL
        this.departmentId = departmentId;
        //INT
        
    }

}