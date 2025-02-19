import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { MatxTheme } from "./components";
import SettingsProvider from "./context/SettingsContext";
import routes from "./routes";
import "../fake-db"; 
import { ProvideAuth } from "./context/AuthContext";

export default function App() {
  const content = useRoutes(routes);

  return (
    <ProvideAuth>
      <SettingsProvider> 
        <MatxTheme> 
          <CssBaseline />
          {content} 
        </MatxTheme>
      </SettingsProvider>
    </ProvideAuth>
  );
}
