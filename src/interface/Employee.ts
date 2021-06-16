export enum Gender {
    male = 0,
    female = 1,
}

export interface IEmployee {
    id: string;
    lastname: string;
    firstname: string;
    patronymic: string;
    position: string;
    birthdate: string;
    gender: Gender;
    employmentDate: string;
    dateOfDismissal: string;
    drivingLicense: boolean;
    colleges?: IEmployee[];
}

export interface ICreateEmployeeParams {
    lastname: string;
    firstname: string;
    patronymic: string;
    position: string;
    birthdate: Date;
    gender: Gender;
    employmentDate: Date;
    dateOfDismissal: Date;
    drivingLicense: boolean;
    colleges?: string[];
}