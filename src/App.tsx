import React from 'react';
import {EmployeeTable} from "./components/EmpoyeeTable";
import {makeStyles} from "@material-ui/core";
import {AddEmployee} from "./components/AddEmployee/AddEmployee";
import { useEmployee } from './hooks/EmployeeHook';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
  }
}));

function App() {
  const classes = useStyles();
  const employeeHook = useEmployee();

  return (
    <div className={classes.mainContainer}>
        <AddEmployee employeeHook = {employeeHook}/>
        <EmployeeTable employeeHook = {employeeHook}/>
    </div>
  );
}

export default App;
