// import { LayoutProvider } from "./shared/layout/context/layoutcontext";
import { PrimeReactProvider } from "primereact/api";
import router from "@/router/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/UserContext";
import { RouterProvider } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();
  return (
    <PrimeReactProvider>
      {/* <MainLayout> */}
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </QueryClientProvider>
      {/* </MainLayout> */}
    </PrimeReactProvider>
  );
}

export default App;
