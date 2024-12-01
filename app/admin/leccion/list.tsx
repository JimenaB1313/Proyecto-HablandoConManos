import { Datagrid, List, NumberField, ReferenceField, TextField } from "react-admin";

export const LeccionList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <ReferenceField source="unidadId" reference="unidades" />
                <NumberField source="order" />
            </Datagrid>
        </List>
    );
};