import { useContext } from "react";
import { SettingsContext } from "app/context/SettingsContext";

const useSettings = () => useContext(SettingsContext);
export default useSettings;
