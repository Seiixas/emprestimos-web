import { SnackbarProvider } from "notistack";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <SnackbarProvider>
      <AppRoutes />
    </SnackbarProvider>
  );
}
