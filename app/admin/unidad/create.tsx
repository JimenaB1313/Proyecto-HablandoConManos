import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const UnidadCreate = () => {
    return (
        <Create>
            <SimpleForm>
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
        </Create>
    );
};