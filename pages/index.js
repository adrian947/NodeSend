import React, { useContext, useEffect } from "react";
import Layout from "./../components/Layout";
import { authContext } from "./../context/auth/authContext";
import Link from "next/link";
import { MyDropzone } from "../components/Dropzone";
import { archivoContext } from "./../context/archivos/archivosContext";

const Index = () => {
  const { usuarioAutenticado } = useContext(authContext);
  const { url } = useContext(archivoContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      usuarioAutenticado();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          {url ? (
            <>
              <p className=" text-center text-4xl">
                <span className="font-bold text-red-700 uppercase">
                  Tu url es:{" "}
                </span>
                {`${process.env.frontendURL}/enlaces/${url}`}
              </p>
              <button
                type="button"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${process.env.frontendURL}/enlaces/${url}`
                  )
                }
              >
                Copiar Enlace
              </button>
            </>
          ) : (
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <MyDropzone />

              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNoteSend</span>{" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum
                </p>
                <Link href="/crearcuenta">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Crea una cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Index;
