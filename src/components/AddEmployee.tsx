import React, {useState} from "react";
import {IUseEmployee, useEmployee} from "../hooks/EmployeeHook";
import {Button, Collapse, Grid, GridSize, makeStyles, MenuItem, Paper} from "@material-ui/core";
import { Form } from 'react-final-form'
import {
    TextField,
    Checkboxes,
    Radios,
    Select,
    DatePicker,
} from 'mui-rff';
import {Gender, IEmployee} from "../interface/Employee";
import DateFnsUtils from '@date-io/date-fns';

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
    },
}))


// lastname: string;
// firstname: string;
// patronymic: string;
// position: string;
// birthdate: Date;
// gender: Gender;
// employmentDate: Date;
// dateOfDismissal: Date;
// drivingLicense: boolean;
// colleges?: IEmployee[];

const validate = (values: IEmployee) => {
    const errors: any = {}
    if (!values.firstname) {
        errors.firstname = 'Обязательное поле';
    }
    if (!values.lastname) {
        errors.lastname = 'Обязательное поле';
    }
    if (!values.patronymic) {
        errors.patronymic = 'Обязательное поле';
    }
    if (!values.position) {
        errors.position = 'Обязательное поле';
    }
    if (!values.birthdate) {
        errors.birthdate = 'Обязательное поле';
    }
    if (!values.gender) {
        errors.gender = 'Обязательное поле';
    }
    if (!values.employmentDate) {
        errors.employmentDate = 'Обязательное поле';
    }
    if (!values.dateOfDismissal) {
        errors.dateOfDismissal = 'Обязательное поле';
    }
    if (!values.drivingLicense) {
        errors.drivingLicense = 'Обязательное поле';
    }
    return errors;
};

const formFields = [
    {
        size: 6,
        field: (
            <TextField
                label="Фамилия"
                name="lastname"
                margin="none"
                required={true}
            />
        ),
    },
    {
        size: 6,
        field: (
            <TextField
                label="Имя"
                name="firstname"
                margin="none"
                required={true}
            />
        ),
    },
    {
        size: 6,
        field: (
            <TextField
                label="Отчество"
                name="patronymic"
                margin="none"
                required={true}
            />
        ),
    },
    {
        size: 6,
        field: (
            <TextField
                label="Должность"
                name="position"
                margin="none"
                required={true}
            />
        ),
    },
    {
        size: 6,
        field: (
            <DatePicker
                name="birthdate"
                margin="normal"
                label="День рождения"
                dateFunsUtils={DateFnsUtils}
                format="dd-MM-yyyy"
            />
        ),
    },
    {
        size: 6,
        field: (
            <Radios
                label="Пол"
                name="gender"
                formControlProps={{ margin: 'none' }}
                radioGroupProps={{ row: true }}
                data={[
                    { label: 'Мужской', value: "0"},
                    { label: 'Женский', value: "1"},
                ]}
            />
        ),
    },
    {
        size: 6,
        field: (
            <DatePicker
                name="employmentDate"
                margin="normal"
                label="Дата приема на работу"
                dateFunsUtils={DateFnsUtils}
                format="dd-MM-yyyy"
            />
        ),
    },
    {
        size: 6,
        field: (
            <DatePicker
                name="dateOfDismissal"
                margin="normal"
                label="Дата увольнения"
                dateFunsUtils={DateFnsUtils}
                format="dd-MM-yyyy"
            />
        ),
    },
    {
        size: 12,
        field: (
            <Checkboxes
                name="drivingLicense"
                formControlProps={{ margin: 'none' }}
                data={{ label: 'Водительские права', value: true }}
            />
        ),
    },
    {
        size: 12,
        field: (
            <Select
                name="colleges"
                label="Select a City"
                formControlProps={{ margin: 'none' }}
            >
                <MenuItem value="London">London</MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
                <MenuItem value="Budapest">A city with a very long Name</MenuItem>
            </Select>
        ),
    },
];

export const AddEmployee = (props: {employeeHook: IUseEmployee}) => {
    const classes = useStyles();
    const [orderExpanded, setOrderExpanded] = useState(false)


    const handleExpandClick = () => {
        setOrderExpanded(!orderExpanded);
    }

    const onSubmit = (params: Omit<IEmployee, "id">) => {
        params.gender = Number(params.gender);
        console.log(params);
        props.employeeHook.createEmployee(params)
    }

    return (
        <div className={classes.card}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleExpandClick}
                aria-expanded={orderExpanded}
            >
                Добавить сотрудника
            </Button>
            <Collapse in={orderExpanded} timeout={"auto"} unmountOnExit>
                <Form
                    onSubmit={(params) => {onSubmit(params)}}
                    initialValues={{ employed: true, stooge: 'larry' }}
                    validate={validate}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{ padding: 16 }}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    {formFields.map((item, idx) => (
                                        <Grid item xs={item.size as GridSize} key={idx}>
                                            {item.field}
                                        </Grid>
                                    ))}
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    )}
                />
            </Collapse>
        </div>
    )
}