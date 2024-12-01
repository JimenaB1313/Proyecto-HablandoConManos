import { Create, BooleanInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const EjercicioOpcionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="text"
                    validate={[required()]}
                    label="Text"
                />
                <BooleanInput
                    source="correcto"
                    label="Opcion correcta"
                />
                <TextInput
                    source="imageSrc"
                    label="Imagen URL"
                />
                <ReferenceInput
                    source="ejercicioId"
                    reference="ejercicios"
                />
            </SimpleForm>
        </Create>
    );
};