import React, {useState} from "react";
import {Button, Dialog, DialogTitle, DialogContent, Grid, GridSize, Paper} from "@material-ui/core";
import { Form } from 'react-final-form'
import {ICreateEmployeeParams} from "../../interface/Employee";
import {formFields} from "./formFields"
import {IEmployee} from "../../interface/Employee"
import { useEffect } from "react";

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

export const EmployeeDialog = (
    props: {
        employees: IEmployee[], 
        dialogOpen: boolean, 
        handleDialog: (state: "open" | "close") => void, 
        onSubmit: (params: ICreateEmployeeParams) => void,
        employee?: IEmployee
    }) => {

    const {employees, dialogOpen, handleDialog, onSubmit, employee} = props;
    
    const paramEmployess = [...employees]
    if (employee) {
        const index = paramEmployess.findIndex(item => item.id === employee.id)
        paramEmployess.splice(index, 1)
    }

    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={dialogOpen} onClose={() => handleDialog("close")}>
                <DialogTitle>Заполните форму</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={(params) => {onSubmit(params)}}
                        initialValues={{
                            lastname: employee ? employee?.lastname : '',
                            firstname: employee ? employee?.firstname : '',
                            patronymic: employee ? employee?.patronymic : '',
                            position: employee ? employee?.position : '',
                            birthdate: employee ? employee?.birthdate : new Date(),
                            gender: employee ? employee?.gender.toString() : '',
                            employmentDate: employee ? employee?.employmentDate : new Date(),
                            dateOfDismissal: employee ? employee?.dateOfDismissal : new Date(),
                            drivingLicense: employee ? employee?.drivingLicense : false,
                            colleges: employee ? employee?.colleges : []
                        }}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                <Paper style={{ padding: 16 }}>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                        {formFields(paramEmployess).map((item, idx) => (
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
    )
}