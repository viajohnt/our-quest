import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import React from 'react'
import '../index.css'
import ErrorPage from './ErrorPage.jsx'
import Quest from "./Quests"
import Header from "./Header"
import Footer from "./Footer"
import Home from "./Home"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export default function App() {

  const Root = () => {
    return (
      <>
        <Header/>
        <div>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element ={<Home />}/>
        <Route path="/quest" element ={<Quest />}/>
        <Route path="/login" element ={<LoginForm />}/>
        <Route path="/signup" element ={<SignUpForm />}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}