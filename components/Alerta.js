import React, {useContext} from 'react'
import { authContext } from '../context/auth/authContext'
import { archivoContext } from './../context/archivos/archivosContext';


const Alerta = () => {

    const {mensaje} = useContext(authContext)
    const {alerta} = useContext(archivoContext)

    return (
        <>
        <div>
            {mensaje ? <p className='bg-red-500 font-bold mb-2 text-white text-center p-2 uppercase'>{mensaje}</p>: null}
        </div>
        <div>
            {alerta ? <p className='bg-red-500 font-bold mb-2 text-white text-center p-2 uppercase'>{alerta}</p>: null}
        </div>
        </>
    )
}

export default Alerta
