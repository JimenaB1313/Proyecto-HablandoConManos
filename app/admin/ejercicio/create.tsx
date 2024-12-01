import { Create, SelectInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const EjercicioCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="pregunta"
                    validate={[required()]}
                    label="Pregunta"
                />
                <SelectInput
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
                    validate={[required()]}
                />
                <ReferenceInput
                    source="leccionId"
                    reference="lecciones"
                />
            </SimpleForm>
        </Create>
    );
};