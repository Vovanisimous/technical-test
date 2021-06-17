import React from "react";
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem} from "@material-ui/core";
import {IUseEmployee} from "../hooks/EmployeeHook";
import { useEffect } from "react";
import {SetEmployee} from "./SetEmployee"
import { DeleteEmployee } from "./DeleteEmployee";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        marginTop: 64,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: 345,
        padding: 30,
        margin: 10,
    },
    managersCard: {
        width: 345,
        padding: 30,
        margin: 10,
        "&:hover": {
            cursor: "pointer",
        },
    },
    managersListItem: {
        listStyleType: "none",
        "&:hover": {
            background: theme.palette.primary.light,
        },
    },
    button: {
        margin: 10,
    },
    collegesList: {
        width: '100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 50,
    },
    collegesListItem: {
        padding: 0
    }
}));


export const EmployeeTable = (props: {employeeHook: IUseEmployee}) => {
    const classes = useStyles();
    const {employees, deleteEmployee, setEmployee} = props.employeeHook;

    return (
        <div className={classes.mainContainer}>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Отчество</TableCell>
                            <TableCell>Должность</TableCell>
                            <TableCell>Дата рождения</TableCell>
                            <TableCell>Пол</TableCell>
                            <TableCell>Дата приема на работу</TableCell>
                            <TableCell>Дата увольнения</TableCell>
                            <TableCell>Наличие прав</TableCell>
                            <TableCell>Коллеги</TableCell>
                            <TableCell>Управление</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee, index) => (
                            <TableRow key={employee.id}>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.lastname}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.firstname}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.patronymic}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.position}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.birthdate}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.gender ? "Женский" : "Мужской"}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.employmentDate}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.dateOfDismissal}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {employee.drivingLicense ? "Да" : "Нет"}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    <List className={classes.collegesList}>
                                        {employee.colleges && employee.colleges.map((item) => (
                                            <ListItem className={classes.collegesListItem}>{item.lastname}</ListItem>
                                        ))}
                                    </List>
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    <SetEmployee employeeHook={props.employeeHook} index={index}/>
                                    <DeleteEmployee employeeHook={props.employeeHook} index={index}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}