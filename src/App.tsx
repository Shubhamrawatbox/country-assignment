import React, { Suspense} from "react";
import "./App.css";
import  ThemeProvider  from "./context/ThemeContext";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";
import Layout from "./components/layout/Layout";

function App() {

  //Lazy Loading For Optimization
  const LazyLoadingHome = React.lazy(() => import("./pages/Home"));
  const LazyLoadingDetails = React.lazy(() => import("./pages/Details"));

  return (
    <>
      <ThemeProvider initialTheme={"light"}>
        <Router>
          <Suspense fallback={<Loader/>}>
              <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <LazyLoadingHome />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/details/:id"
                element={
                  <ErrorBoundary>
                    <LazyLoadingDetails />
                  </ErrorBoundary>
                }
              />
            </Routes>
              </Layout>
          </Suspense>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
