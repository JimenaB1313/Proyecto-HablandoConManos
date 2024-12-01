import { Datagrid, List, NumberField, ReferenceField, TextField } from "react-admin";

export const UnidadList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="descripcion"/>
                <ReferenceField source="cursoId" reference="cursos" />
                <NumberField source="order" />
            </Datagrid>
        </List>
    );
};