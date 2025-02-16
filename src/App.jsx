import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import Error from './components/Error/Error'
import AuthContextProvider from './components/Context/AuthContext'
import Guard from './components/Guard/Guard';
import AuthGuard from './components/AuthGuard/AuthGuard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Order from './components/Order/Order';

const queryClient = new QueryClient()

const routes = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Guard><Home /></Guard> },
      { path: 'products', element: <Guard> <Products /></Guard> },
      { path: 'cart', element: <Guard><Cart /></Guard> },
      { path: 'brands', element: <Guard><Brands /> </Guard> },
      { path: 'categories', element: <Guard> <Categories /></Guard> },
      { path: 'details/:id', element: <Guard> <ProductDetails /></Guard> },
      { path: 'order', element: <Guard> <Order /></Guard> },
      { path: 'login', element: <AuthGuard><Login /></AuthGuard> },
      { path: 'register', element: <AuthGuard><Register /></AuthGuard> },
      { path: '*', element: <Error /> },

    ]
  }
])
function App() {

  return <>

    <AuthContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
          <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </>
}

export default App

