import React, { useState, useContext } from "react";
import { archivoContext } from './../context/archivos/archivosContext';

const Formulario = () => {

    const {agregarPassword, cantidadDescargas} = useContext(archivoContext)


  const [tienePassword, setTienePassword] = useState(false);

  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras: </label>
        <select onChange={(e)=>cantidadDescargas(parseInt(e.target.value))}defaultValue={'DEFAULT'} className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
          <option  disabled value="DEFAULT" >
            -- Seleccione --
          </option>
          <option value="1">1 descarga</option>
          <option value="5">5 descargas</option>
          <option value="10">10 descargas</option>
          <option value="20">20 descargas</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className='className="text-lg text-gray-800" mr-2'>
            Proteger con contraseña
          </label>
          <input
            type="checkbox"
            onChange={() => setTienePassword(!tienePassword)}
          ></input>
        </div>

        {tienePassword ? (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            name="password"
            onChange={e=> agregarPassword(e.target.value)}
            
          />
        ) : null}
      </div>
    </div>
  );
};

export default Formulario;
