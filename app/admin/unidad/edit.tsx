import { Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const UnidadEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput
                    source="id"
                    validate={[required()]}
                    label="Id"
                />
                <TextInput
                    source="title"
                    validate={[required()]}
                    label="Title"
                />
                <TextInput
                    source="descripcion"
                    validate={[required()]}
                    label="Descripción"
                />
                <ReferenceInput
                    source="cursoId"
                    reference="cursos"
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