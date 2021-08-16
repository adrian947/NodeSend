import React, { useState, useContext } from "react";
import Alerta from "../../components/Alerta";
import Layout from "../../components/Layout";
import { clienteAxios } from "./../../config/axios";
import { archivoContext } from "./../../context/archivos/archivosContext";

export async function getServerSideProps(props) {
  const resp = await clienteAxios.get(`/api/enlaces/${props.params.enlaces}`);
  // console.log(resp)

  return {
    props: {
      enlace: resp.data,
    },
  };
}
export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get("/api/enlaces");
  //   console.log(enlaces);
  return {
    paths: enlaces.data.enlaces.map((enlace) => ({
      params: {
        enlaces: enlace.url,
      },
    })),
    fallback: false,
  };
}

const Enlace = ({ enlace }) => {
  const { mostrarAlerta } = useContext(archivoContext);

  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState("");

  const verificarPassword = async (e) => {
    e.preventDefault();
    const data = {
      password,
    };
    try {
      const result = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data
      );

      setTienePassword(result.data.password);
    } catch (error) {
      mostrarAlerta(error.response.data.msg);
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">
        Descarga tu archivo:
      </h1>

      {tienePassword ? (
        <>
          <p className="bg-red-500 text-center mt-5 rounded uppercase font-bold text-white cursor-pointer">
            Este enlace esta protegido por un Password
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <Alerta />
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2 "
                    htmlFor="nombre"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    placeholder="Coloca el password para descargar el archivo"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Aplicar Password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <a
            href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
            className="bg-red-500 text center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
          >
            Aqui
          </a>
        </div>
      )}
    </Layout>
  );
};

export default Enlace;
