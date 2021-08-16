/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { archivoContext } from "./../context/archivos/archivosContext";
import Alerta from "./Alerta";
import ReactLoading from "react-loading";
import { authContext } from './../context/auth/authContext';
import Formulario from "./Formulario";


export const MyDropzone = () => {
  
  const {autenticado, usuario } = useContext(authContext)


  const { mostrarAlerta, limpiarAlerta, subirArchivo, handleEnlace, cargado } =
    useContext(archivoContext);

  const onDropRejected = () => {
    mostrarAlerta("no se pudo subir, el limite es 1MB");
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    limpiarAlerta();

    //creando FormData

    const formdata = new FormData();
    formdata.append("archivo", acceptedFiles[0]);

    //Subir Archivo
    subirArchivo(formdata, acceptedFiles[0].path);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const archivo = acceptedFiles.map((archivo) => (
    <li
      key={archivo.name}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500 text-center">
        {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <>
      <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
        <Alerta />
        {acceptedFiles.length > 0 ? (
          <div className="mt-10 w-full text-center">
            <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
            <ul>{archivo}</ul>
            {
              autenticado ? <Formulario/> : null
            }
            {cargado ? (
              <ReactLoading type="cubes" color="e1e1e1" />
            ) : (
              <button
                type="button"
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                onClick={() => handleEnlace()}
              >
                Crear enlace
              </button>
            )}
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone w-full py-32" })}>
            <input className="h-100" {...getInputProps()} />

            {isDragActive ? (
              <p className="text-2xl text-center text-gray-600">
                Suelta el Archivo
              </p>
            ) : (
              <div className="text-center">
                <p className="text-2xl text-center text-gray-600">
                  Selecciona un archivo o arrastralo aqui
                </p>
                <button
                  className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                  type="button"
                >
                  Selecciona Archivos para subir
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
