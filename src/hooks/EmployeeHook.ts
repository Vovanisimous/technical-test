import {useStickyState} from "./localHook";
import {IEmployee} from "../interface/Employee";
import { v4 as uuidv4 } from 'uuid';
import { ICreateEmployeeParams } from "../interface/Employee";

export interface IUseEmployee {
    employees: IEmployee[];
    getEmployee: (employeeId: string) => IEmployee | undefined;
    deleteEmployee: (employeeId: string) => void;
    createEmployee: (params: ICreateEmployeeParams) => IEmployee[]
}

export const useEmployee = (): IUseEmployee => {
    const [employees, setEmployees] = useStickyState<IEmployee[]>([], 'employees');

    const findColleges = (collegeIds: string[] | undefined): IEmployee[] => {
        if (!collegeIds) return [];

        return employees.map((item) => {
            if (collegeIds.includes(item.id)) {
                return item
            }
        }) as IEmployee[]
    }

    const getEmployee = (employeeId: string) => {
        return employees.find((item) => item.id === employeeId)
    }

    const deleteEmployee = (employeeId: string) => {

        const index = employees.findIndex(item => item.id === employeeId)

        const newEmployees = employees.splice(index, 1);

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

    return {employees, getEmployee, deleteEmployee, createEmployee}
}