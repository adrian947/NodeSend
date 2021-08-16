import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  AUTH_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
} from "../../types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true
      };
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
      };

    case AUTH_ERROR:
    case REGISTRO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    case LOGIN_EXITOSO:
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };
    case CERRAR_SESION:
      localStorage.removeItem("token");

      return {
        ...state,
        autenticado: null,
        usuario: null,
        mensaje: null,
        token: null,
      };

    default:
      return state;
  }
};
