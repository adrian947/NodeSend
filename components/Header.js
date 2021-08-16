import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
import { authContext } from "./../context/auth/authContext";
import { archivoContext } from './../context/archivos/archivosContext';

const Header = () => {
  const { usuario, cerrarSesion } = useContext(authContext);
  const { limpiarState } = useContext(archivoContext);
 

  const handleCerrarSesion = ()=>{
    cerrarSesion();
  }

  const handleHome = ()=>{
    limpiarState()
  }



  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <Image
            className="w-64 mb-8 md:mb-0 cursor-pointer"
            src={logo}
            alt="logo"
            width={700}
            height={100}
            onClick={handleHome}
          />
        </a>
      </Link>

      {!usuario ? (
        <>
          <Link href="/login">
            <a className="bg-red-500 px-5 py-3 rounded-lg text-white form-bold uppercase mr-2">
              Iniciar Sesion
            </a>
          </Link>
          <Link href="/crearcuenta">
            <a className="bg-black px-5 py-3 rounded-lg text-white form-bold uppercase">
              Crear Cuenta
            </a>
          </Link>
        </>
      ) : (
        <>
          <p className="">Bienvenido: {usuario.nombre}</p>
          <Link href="/login">
            <a className="bg-black px-5 py-3 rounded-lg text-white form-bold uppercase" onClick={handleCerrarSesion}>
              CERRAR SESION
            </a>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
