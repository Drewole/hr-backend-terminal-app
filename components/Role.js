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

        // This function will set this objects data
    setProperties(data) {
        Object.getOwnPropertyNames(this).forEach((property) => {
            if(property !== "connection"){
                this[property] = data[property];
            }
        });
    }

    // These function handle SQL DB interactions
    // This function will return a list of all roles
    printRoles(){
        this.connection.query(
            "SELECT roles.id, roles.title, roles.name, roles.salary " +
            "FROM role" +
            "LEFT JOIN departments ON roles.department_id = departments.id ",
            function (err, res) {
                if (err) console.log(err);
                // Print roles
                console.log("\n");
                console.table(res);
            }
        );
    }
    
    // This function will return the total department salary allocated
    // selectDepartmentTotalSalary(departmentId){
    //     this.connection.query("SELECT SUM(salary) FROM role WHERE ?", { department_id: departmentId },
    //         function (err, res) {
    //             if (err) console.log(err);
    //             return res;
    //         }
    //     );
    // }

    // This function will create an entry into the role table
    insertRole(title = this.title, salary = this.salary, departmentId = this.department_id){
        this.connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [ title, salary, departmentId],
            function (err, res){
                if (err) console.log(err);
            }
        );
    }

    // This function will update the db for the current role
    updateRole(){
        this.connection.query("UPDATE role SET ? WHERE ?", { title: this.title, salary: this.salary, departmentId: this.departmentId}, { id: this.id},
            function(err, res){
                if (err) console.log(err);
            }
        );
    }

    // This function will delete the role from the db
    deleteRole(){
        this.connection.query("DELETE FROM role WHERE ?", {id: this.id},
            function(err,res){
                if (err) console.log(err);
            }
        );
    }

}
module.exports = Role;