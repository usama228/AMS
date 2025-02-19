import { useContext } from "react";
import NotificationContext from "app/context/NotificationContext";

const useNotification = () => useContext(NotificationContext);
export default useNotification;
