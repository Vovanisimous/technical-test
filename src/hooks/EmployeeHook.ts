import {useStickyState} from "./localHook";
import {IEmployee} from "../interface/Employee";
import { v4 as uuidv4 } from 'uuid';
import { ICreateEmployeeParams } from "../interface/Employee";

export interface IUseEmployee {
    employees: IEmployee[];
    setEmployee: (employeeIndex: number, params: ICreateEmployeeParams) => void;
    deleteEmployee: (employeeIndex: number) => void;
    createEmployee: (params: ICreateEmployeeParams) => IEmployee[]
}

export const useEmployee = (): IUseEmployee => {
    const [employees, setEmployees] = useStickyState<IEmployee[]>([], 'employees');

    const findColleges = (collegeIds: string[] | undefined): IEmployee[] => {
        if (!collegeIds) return [];

        const checkEmployess = [...employees]

        return checkEmployess.filter((item) => {
            if (collegeIds.includes(item.id)) {
                return true
            }
            return false
        })
    }

    const setEmployee = (employeeIndex: number, params: ICreateEmployeeParams) => {
        console.log(params)
        const newEmployees = [...employees]

        const newEmployee: IEmployee = {
            ...employees[employeeIndex],
            ...params,
            gender: Number(params.gender),
            birthdate: typeof params.birthdate === "object" ? params.birthdate.toLocaleDateString() : params.birthdate,
            dateOfDismissal: typeof params.dateOfDismissal === "object" ? params.dateOfDismissal.toLocaleDateString():  params.dateOfDismissal,
            employmentDate: typeof params.employmentDate === "object" ? params.employmentDate.toLocaleDateString(): params.employmentDate,
            colleges: findColleges(params.colleges)
        };

        newEmployees[employeeIndex] = newEmployee

        setEmployees(newEmployees)
    }

    const deleteEmployee = (employeeIndex: number) => {
        const newEmployees = [...employees]

        newEmployees.splice(employeeIndex, 1);

        setEmployees(newEmployees)
    }

    const createEmployee = (params: ICreateEmployeeParams) => {
        const id = uuidv4();

        const setEmployeeParams = {
            ...params,
            id: id,
            gender: Number(params.gender),
            birthdate: params.birthdate.toLocaleDateString(),
            dateOfDismissal: params.dateOfDismissal.toLocaleDateString(),
            employmentDate: params.employmentDate.toLocaleDateString(),
            colleges: findColleges(params.colleges)
        }
        
        setEmployees([...employees, setEmployeeParams])
        return employees
    }

    return {employees, setEmployee, deleteEmployee, createEmployee}
}