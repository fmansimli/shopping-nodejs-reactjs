import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilStateLoadable, useRecoilValue } from "recoil";

import { initSelector, tokenSelector } from "./store/auth.state";

import { Navbar, Footer, Aside } from "./components/_common";

import HomePage from "./pages/HomePage";

import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import NewProductPage from "./pages/products/NewProductPage";
import ProductEditPage from "./pages/products/ProductEditPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import ShoppingCardPage from "./pages/shop/ShoppingCartPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/admin/AdminPage";

import { ToastContainer } from "react-toastify";

function App() {
  const [auth, setAuth] = useRecoilStateLoadable(initSelector);
  const token = useRecoilValue(tokenSelector);

  useEffect(() => {
    if (auth.state === "hasValue") {
      setAuth(auth.contents);
    }
  }, [auth.state]);

  return (
    <BrowserRouter>
      {auth.state == "loading" ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="text-2xl text-blue-600">Loading...</div>
        </div>
      ) : auth.state == "hasValue" ? (
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="mx-20 mb-2 mt-20 flex flex-1 gap-x-5">
            <aside className="w-full md:w-1/5">
              <Aside />
            </aside>
            <main className="w-full md:w-4/5">
              <Routes>
                {token ? (
                  <Fragment>
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/new" element={<NewProductPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/products/edit/:id" element={<ProductEditPage />} />

                    <Route path="/shop/shopping-cart" element={<ShoppingCardPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                  </Fragment>
                )}
                
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="text-2xl text-blue-600">Error...</div>
        </div>
      )}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
