import { Datagrid, List, ReferenceField, TextField, BooleanField, NumberField } from "react-admin";

export const EjercicioOpcionList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <NumberField source="id" />
                <TextField source="text" />
                <BooleanField source="correcto" />
                <TextField source="imageSrc" />
                <ReferenceField source="ejercicioId" reference="ejercicios" />
            </Datagrid>
        </List>
    );
};