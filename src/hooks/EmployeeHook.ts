import {useStickyState} from "./localHook";
import {IEmployee} from "../interface/Employee";
import { v4 as uuidv4 } from 'uuid';
import { PermCameraMicSharp } from "@material-ui/icons";
import { useEffect } from "react";

export interface IUseEmployee {
    employees: IEmployee[];
    getEmployee: (employeeId: string) => IEmployee | undefined;
    deleteEmployee: (employeeId: string) => void;
    createEmployee: (params: Omit<IEmployee, "id">) => IEmployee[]
}

export const useEmployee = (): IUseEmployee => {
    const [employees, setEmployees] = useStickyState<IEmployee[]>([], 'employees');

    const getEmployee = (employeeId: string) => {
        return employees.find((item) => item.id === employeeId)
    }

    const deleteEmployee = (employeeId: string) => {

        const index = employees.findIndex(item => item.id === employeeId)

        const newEmployees = employees.splice(index, 1);

        setEmployees(newEmployees)
    }

    const createEmployee = (params: Omit<IEmployee, "id">) => {
        const id = uuidv4();
        
        setEmployees([...employees, {...params, id}])
        return employees
    }

    return {employees, getEmployee, deleteEmployee, createEmployee}
}