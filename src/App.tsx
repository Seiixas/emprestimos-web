import { SnackbarProvider } from "notistack";
import { Routes } from "./routes";

export default function App() {
  return (
    <SnackbarProvider>
      <Routes />
    </SnackbarProvider>
  );
}
