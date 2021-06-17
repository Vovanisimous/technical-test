import React, {useState} from "react";
import {IUseEmployee} from "../hooks/EmployeeHook";
import {Button, makeStyles} from "@material-ui/core";
import {ICreateEmployeeParams} from "../interface/Employee";
import { EmployeeDialog } from "./EmployeeDialog/EmployeeDialog";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 700,
        padding: 30,
        margin: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}))

export const AddEmployee = (props: {employeeHook: IUseEmployee}) => {
    const classes = useStyles();
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
        props.employeeHook.createEmployee(params)
        handleDialog("close")
    }

    return (
        <div className={classes.card}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleDialog("open")}
            >
                Добавить сотрудника
            </Button>
            <EmployeeDialog 
                employees={props.employeeHook.employees} 
                dialogOpen={dialogOpen} 
                handleDialog={handleDialog} 
                onSubmit={onSubmit}
            />
        </div>
    )
}