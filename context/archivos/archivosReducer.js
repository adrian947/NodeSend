import {
  LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  SUBIR_ARCHIVO,
  LIMPIAR_STATE,
  AGREGAR_PASS,
  CANTIDAD_DESCARGAS
} from "../../types";

export const archivosReducer = (state, action) => {
  switch (action.type) {
    case SUBIR_ARCHIVO_ERROR:
    case MOSTRAR_ALERTA:
      return {
        ...state,
        alerta: action.payload,
        cargado: null,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        alerta: "",
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombreOriginal,
        cargado: null,
      };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargado: true,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case LIMPIAR_STATE:
      return {
        ...state,
        nombre: "",
        nombre_original: "",
        alerta: "",
        cargado: null,
        descargas: 1,
        password: "",
        autor: null,
        url: "",
      };
    case AGREGAR_PASS:
      return {
        ...state,
        password: action.payload,
      };
    case CANTIDAD_DESCARGAS:
      return {
        ...state,
        descargas: action.payload,
      };

    default:
      return state;
  }
};
