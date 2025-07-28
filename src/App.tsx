import { lazy, Suspense } from "react";
import { Tab } from "@headlessui/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Layout from "./components/Layout";
import MenuTabs from "./components/MenuTabs";

// Lazy load components
const MenuPanels = lazy(() => import("./components/MenuPanels"));
const FavoritesProvider = lazy(() =>
  import("./context/FavoritesProvider").then((m) => ({
    default: m.FavoritesProvider,
  }))
);

export default function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesProvider>
        <BrowserRouter>
          <Layout>
            <main className="w-full max-w-4xl px-2 mx-auto sm:px-0">
              <h1 className="mb-4 text-2xl font-semibold text-center">
                Crypto Tracker
              </h1>
              <section className="space-y-4 mb-4">
                <Tab.Group defaultIndex={1}>
                  <MenuTabs />
                  <MenuPanels />
                </Tab.Group>
              </section>
            </main>
          </Layout>
        </BrowserRouter>
      </FavoritesProvider>
    </Suspense>
  );
}
