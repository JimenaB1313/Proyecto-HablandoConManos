import { Datagrid, List, TextField } from "react-admin";

export const CursoList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="imageSrc" />
            </Datagrid>
        </List>
    );
};