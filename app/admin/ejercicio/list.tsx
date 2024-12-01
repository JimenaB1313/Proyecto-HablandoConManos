import { Datagrid, List, NumberField, ReferenceField, TextField, SelectField } from "react-admin";

export const EjercicioList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="pregunta" />
                <SelectField
                    source="tipo"
                    choices={[
                        {
                            id: "SELECT",
                            name: "SELECT",
                        },
                        {
                            id: "ASSIST",
                            name: "ASSIST",
                        }
                    ]}
                />
                <ReferenceField source="leccionId" reference="lecciones" />
                <NumberField source="order" />
            </Datagrid>
        </List>
    );
};