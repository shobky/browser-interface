import AddFavorites from "@/components/AddFavorites";
import SearchBox from "@/components/SearchBox";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { getMetadata } from "@/utils/getMetadata";
import { Suspense, lazy } from "react";

const Favorites = lazy(() => import("@/components/Favorites"));


export default function home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8 p-4 md:p-0">
      <SearchBox />
      <Suspense fallback={<div className="text-black">Loading cities...</div>}>
        <FavoritesProvider>
          <Favorites />
          <AddFavorites />
        </FavoritesProvider>
      </Suspense>
    </main>
  );
}
