import React, {useState} from "react";
import {IUseEmployee} from "../../hooks/EmployeeHook";
import {Button, Dialog, DialogTitle, DialogContent, Grid, GridSize, makeStyles, MenuItem, Paper} from "@material-ui/core";
import { Form } from 'react-final-form'
import {ICreateEmployeeParams} from "../../interface/Employee";
import {formFields} from "./formFields"

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

const validate = (values: ICreateEmployeeParams) => {
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
    if (values.dateOfDismissal < values.employmentDate) {
        errors.dateOfDismissal = 'Дата увольнения не может быть меньше даты приема на работу'
    }
    return errors;
};

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
        console.log(params);
        props.employeeHook.createEmployee(params)
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
            <Dialog disableBackdropClick disableEscapeKeyDown open={dialogOpen} onClose={() => handleDialog("close")}>
                <DialogTitle>Заполните форму</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={(params) => {onSubmit(params)}}
                        initialValues={{ employed: true, stooge: 'larry' }}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                <Paper style={{ padding: 16 }}>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                        {formFields(props.employeeHook.employees).map((item, idx) => (
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
                                                Отправить
                                            </Button>
                                        </Grid>
                                        <Grid item style={{ marginTop: 16 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleDialog("close")}
                                            >
                                                Закрыть
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </form>
                        )}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}