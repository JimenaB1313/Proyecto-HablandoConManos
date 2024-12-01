"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { CursoEdit } from "./curso/edit";
import { CursoList } from "./curso/list";
import { CursoCreate } from "./curso/create";

import { UnidadEdit } from "./unidad/edit";
import { UnidadList } from "./unidad/list";
import { UnidadCreate } from "./unidad/create";

import { LeccionEdit } from "./leccion/edit";
import { LeccionList } from "./leccion/list";
import { LeccionCreate } from "./leccion/create";

import { EjercicioList } from "./ejercicio/list";
import { EjercicioEdit } from "./ejercicio/edit";
import { EjercicioCreate } from "./ejercicio/create";

import { EjercicioOpcionList } from "./ejercicioOpcion/list";
import { EjercicioOpcionEdit } from "./ejercicioOpcion/edit";
import { EjercicioOpcionCreate } from "./ejercicioOpcion/create";

const dataProvider = simpleRestProvider("/api");

const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="cursos"
                list={CursoList}
                create={CursoCreate}
                edit={CursoEdit}
                recordRepresentation="title"
            />
            <Resource
                name="unidades"
                list={UnidadList}
                create={UnidadCreate}
                edit={UnidadEdit}
                recordRepresentation="title"
            />
            <Resource
                name="lecciones"
                list={LeccionList}
                create={LeccionCreate}
                edit={LeccionEdit}
                recordRepresentation="title"
            />
            <Resource
                name="ejercicios"
                list={EjercicioList}
                create={EjercicioCreate}
                edit={EjercicioEdit}
                recordRepresentation="title"
            />
            <Resource
                name="ejercicioOpciones"
                list={EjercicioOpcionList}
                create={EjercicioOpcionCreate}
                edit={EjercicioOpcionEdit}
                recordRepresentation="text"
                options={{ label: "Ejercicio Opciones" }}
            />
        </Admin>
    );
};

export default App;