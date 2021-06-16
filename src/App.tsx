import React from 'react';
import {EmployeeTable} from "./components/EmpoyeeTable";
import {AddEmployee} from "./components/AddEmployee";
import { useEmployee } from './hooks/EmployeeHook';

function App() {
  const employeeHook = useEmployee();

  return (
    <div className="App">
        <AddEmployee employeeHook = {employeeHook}/>
        <EmployeeTable employeeHook = {employeeHook}/>
    </div>
  );
}

export default App;
