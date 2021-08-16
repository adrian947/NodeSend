import "../styles/globals.css";
import { AuthState } from "../context/auth/authState";
import { ArchivosState } from "../context/archivos/archivosState";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <ArchivosState>
        <Component {...pageProps} />
      </ArchivosState>
    </AuthState>
  );
};

export default MyApp;
