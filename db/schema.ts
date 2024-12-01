import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const cursos = pgTable("cursos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const relacionCursos = relations(cursos, ({ many }) => ({
    progresoUsuario: many(progresoUsuario),
    unidades: many(unidades),
}));

export const unidades = pgTable("unidades", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    descripcion: text("descripcion").notNull(),
    cursoId: integer("curso_id").references(() => cursos.id, { onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

export const unidadesRelacion = relations(unidades, ({ many, one }) => ({
    curso: one(cursos, {
        fields: [unidades.cursoId],
        references: [cursos.id],
    }),
    lecciones: many(lecciones),
}));

export const lecciones = pgTable("lecciones", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unidadId: integer("unidad_id").references(() => unidades.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const leccionesRelacion = relations(lecciones, ({ one, many }) => ({
    unidad: one(unidades, {
        fields: [lecciones.unidadId],
        references: [unidades.id],
    }),
    ejercicios: many(ejercicios),
}));

export const ejerciciosEnum = pgEnum("tipo", ["SELECT", "ASSIST"]);

export const ejercicios = pgTable("ejercicios", {
    id: serial("id").primaryKey(),
    leccionId: integer("leccion_id").references(() => lecciones.id, { onDelete: "cascade"}).notNull(),
    tipo: ejerciciosEnum("tipo").notNull(),
    pregunta: text("pregunta").notNull(),
});

export const ejerciciosRelacion = relations(ejercicios, ({ one, many }) => ({
    leccion: one(lecciones, {
        fields: [ejercicios.leccionId],
        references: [lecciones.id],
    }),
    ejercicioOpciones: many(ejercicioOpciones),
    ejerciciosProgeso: many(ejerciciosProgeso),
}));

export const ejercicioOpciones = pgTable("ejercicioOpciones", {
    id: serial("id").primaryKey(),
    ejercicioId: integer("ejercicio_id").references(() => ejercicios.id, { onDelete: "cascade"}).notNull(),
    text: text("text").notNull(),
    correcto: boolean("correcto").notNull(),
    imageSrc: text("image_src"),
});

export const ejercicioOpcionesRelacion = relations(ejercicioOpciones, ({ one }) => ({
    ejercicio: one(ejercicios, {
        fields: [ejercicioOpciones.ejercicioId],
        references: [ejercicios.id],
    }),
}));

export const ejerciciosProgeso = pgTable("ejerciciosProgreso", {
    id: serial("id").primaryKey(),
    usuarioId: text("usuario_id").notNull(),
    ejercicioId: integer("ejercicio_id").references(() => ejercicios.id, { onDelete: "cascade"}).notNull(),
    completado: boolean("completado").notNull().default(false),
});

export const ejerciciosProgresoRelacion = relations(ejerciciosProgeso, ({ one }) => ({
    ejercicio: one(ejercicios, {
        fields: [ejerciciosProgeso.ejercicioId],
        references: [ejercicios.id],
    }),
}));


export const progresoUsuario = pgTable("progreso_usuario", {
    usuarioId: text("usuario_id").primaryKey(),
    nombreUsuario: text("nombre_usuario").notNull().default("Usuario"),
    userImageSrc: text("user_image_src").notNull().default("/logoFBverdeoscuro.png"),
    activeCursoId: integer("active_curso_id").references(() => cursos.id, {onDelete: "cascade" }),
    corazones: integer("corazones").notNull().default(5),
    puntos: integer("puntos").notNull().default(0),
});

export const relacionProgresoUsuario = relations(progresoUsuario, ({ one }) => ({
    activeCurso: one(cursos, {
        fields: [progresoUsuario.activeCursoId],
        references: [cursos.id],
    }),
}));