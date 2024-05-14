import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Stack, HStack } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ROUTES } from "./routes.types";
import { PlayersList } from "@/modules/players/pages/PlayersList/PlayersList";
import { PlayerDetails } from "@/modules/players/pages/PlayerDetails/PlayerDetails";
import { NotFound } from "@/pages/NotFound/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <PlayersList />,
      },
      {
        path: ROUTES.MASTER_PROFILE,
        element: <PlayerDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const Router = () => {
  const queryClient = new QueryClient();

  return (
    <HStack justifyContent="center" p={12}>
      <Stack maxW="1280px" w="100%">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Stack>
    </HStack>
  );
};
