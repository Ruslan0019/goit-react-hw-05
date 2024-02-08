import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
// import CastPage from "./Cast/CastPage";
// import HomePages from "../Pages/HomePage";

const HomePage = lazy(() => import("../Pages/HomePage"));
const MovieDetailsPage = lazy(() => import("../Pages/MovieDetailsPage"));
const CastPage = lazy(() => import("./Cast/CastPage"));
const ReviewsPage = lazy(() => import("./Reviews/ReviewsPage"));
const MoviesPage = lazy(() => import("../Pages/MoviesPage"));

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />

            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<CastPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
export default App;
