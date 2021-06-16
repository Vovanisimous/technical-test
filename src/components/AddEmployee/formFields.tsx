import {
    TextField,
    Checkboxes,
    Radios,
    Select,
    DatePicker,
} from 'mui-rff';
import {IEmployee} from "../../interface/Employee";
import DateFnsUtils from '@date-io/date-fns';
import {MenuItem} from "@material-ui/core";

export const formFields = (colleges: IEmployee[]) => [
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
                label="Коллеги"
                formControlProps={{ margin: 'none' }}
                multiple
                style={{display: "absolute"}}
                MenuProps={
                    {
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250
                          }
                        },
                        variant: "menu",
                        getContentAnchorEl: null
                      }
                }
            >
                {
                    colleges.map((college) => (
                        <MenuItem key={college.id} value={college.id}>
                            {college.firstname + " " + college.lastname}
                        </MenuItem>
                    ))
                }
            </Select>
        ),
    },
];