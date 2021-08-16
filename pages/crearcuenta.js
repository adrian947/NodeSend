import React, {useContext} from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authContext } from "../context/auth/authContext";
import Alerta from "../components/Alerta";


const Crearcuenta = () => {


  const {registrarUsuario} = useContext(authContext)
  

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es Obligatorio"),
      email: Yup.string()
        .email("Email no Valido")
        .required("El email es Obligatorio"),
      password: Yup.string()
        .min(6, "El passwor debe tener al menos 6 caracteres")
        .required("El Password es Obligatorio"),
    }),

    onSubmit: (valores) => {
     
      registrarUsuario(valores)
    },
  });

  return (
    <div>
      <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
            Crear cuenta
          </h2>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
             <Alerta />
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2 "
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    placeholder="Nombre de usuario"
                    autoComplete="off"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.nombre && formik.errors.nombre ? (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.nombre}</p>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2 "
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Email de usuario"
                    autoComplete="off"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2 "
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="password de usuario"
                    autoComplete="off"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.password}</p>
                    </div>
                  ) : null}
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Crear Cuenta"
                />
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Crearcuenta;
