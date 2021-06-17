import React, {useState} from "react";
import {Button, makeStyles} from "@material-ui/core";
import {IUseEmployee} from "../hooks/EmployeeHook";
import {ICreateEmployeeParams} from "../interface/Employee";
import CreateIcon from '@material-ui/icons/Create';
import { EmployeeDialog } from "./EmployeeDialog/EmployeeDialog";

export const SetEmployee = (props: {employeeHook: IUseEmployee, index: number}) => {
    const [dialogOpen, setDialopOpen] = useState(false);

    const handleDialog = (state: "open" | "close") => {
        switch (state){
            case "open":
                setDialopOpen(true);
                break;
            case "close":
                setDialopOpen(false);
                break;
        }      
    }

    const onSubmit = (params: ICreateEmployeeParams) => {
        props.employeeHook.setEmployee(props.index, params)
        handleDialog("close")
    }

    return (
        <div>
            <Button
                color="primary"
                onClick={() => handleDialog("open")}
            >
                <CreateIcon />
            </Button>
            <EmployeeDialog 
                employees={props.employeeHook.employees} 
                dialogOpen={dialogOpen} 
                handleDialog={handleDialog} 
                onSubmit={onSubmit}
                employee={props.employeeHook.employees[props.index]}
            />
        </div>
    )
}