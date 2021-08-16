import React, { useReducer } from "react";
import { archivoContext } from "./archivosContext";
import { archivosReducer } from "./archivosReducer";
import { clienteAxios } from "./../../config/axios";
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

export const ArchivosState = ({ children }) => {
  const initialState = {
    nombre: "",
    nombre_original: "",
    alerta: "",
    cargado: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = useReducer(archivosReducer, initialState);

  const mostrarAlerta = (mensaje) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: mensaje,
    });
  };
  const limpiarAlerta = () => {
    dispatch({
      type: LIMPIAR_ALERTA,
    });
  };

  //sube los artchivos al servidor
  const subirArchivo = async (formdata, nombreOriginal) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const resultado = await clienteAxios.post("/api/archivos", formdata);

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombreOriginal: nombreOriginal,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //crea una funcion que genera el enlace una ves subido el archivo
  const handleEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    try {
      const respuesta = await clienteAxios.post("api/enlaces", data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({

        type: CREAR_ENLACE_ERROR,
        payload: error.response.data.msg,
      })
    }
  };

  const limpiarState = ()=>{
    dispatch({
      type: LIMPIAR_STATE,
    
    })
  }
  
  const agregarPassword = (pass)=>{
    dispatch({
      type: AGREGAR_PASS,
      payload: pass
    })
  }
  const cantidadDescargas = (cantidad)=>{
    dispatch({
      type: CANTIDAD_DESCARGAS,
      payload: cantidad
    })
  }
  

  return (
    <archivoContext.Provider
      value={{
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        alerta: state.alerta,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargado: state.cargado,
        mostrarAlerta,
        limpiarAlerta,
        subirArchivo,
        handleEnlace,
        limpiarState,
        agregarPassword,
        cantidadDescargas
      }}
    >
      {children}
    </archivoContext.Provider>
  );
};
