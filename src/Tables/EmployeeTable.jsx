import React, { useState, useEffect } from 'react';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  const handleViewEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    handleViewEmployees();
  }, []);

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Employees</h4></div>
        </div>
        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-2" style={{ paddingRight: "100px" }}><b>Employee Number</b></div>
            <div className="col-md-3"><b>First Name</b></div>
            <div className="col-md-3"><b>Last Name</b></div>
            <div className="col-md-2"><b>Email</b></div>
            <div className="col-md-2"><b>Contact</b></div>
          </div>
          <hr />

          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {employees.map((employee, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-3">{employee.EMPLOYEENO}</div>
                <div className="col-md-3">{employee.EMPLOYEEFNAME}</div>
                <div className="col-md-3">{employee.EMPLOYEELNAME}</div>
                <div className="col-md-3">{employee.EMPLOYEEEMAIL}</div>
                <div className="col-md-3">{employee.EMPLOYEECONTACT}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
