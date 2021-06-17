import React from "react";
import {Button} from "@material-ui/core";
import {IUseEmployee} from "../hooks/EmployeeHook";
import DeleteIcon from '@material-ui/icons/Delete';

export const DeleteEmployee = (props: {employeeHook: IUseEmployee, index: number}) => {
    const onDeleteEmployee = () => {
        props.employeeHook.deleteEmployee(props.index)
    }

    return (
        <div>
            <Button
                color="primary"
                onClick={onDeleteEmployee}
            >
                <DeleteIcon />
            </Button>
        </div>
    )
}