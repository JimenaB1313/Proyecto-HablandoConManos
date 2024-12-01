import { Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const LeccionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput
                    source="title"
                    validate={[required()]}
                    label="Title"
                />
                <ReferenceInput
                    source="unidadId"
                    reference="unidades"
                />
                <NumberInput
                    source="order"
                    validate={[required()]}
                    label="Orden"
                />
            </SimpleForm>
        </Edit>
    );
};