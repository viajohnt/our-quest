import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import React from 'react'
import '../index.css'
import ErrorPage from './ErrorPage.jsx'
import Quest from "./Quests"
import Header from "./Header"
import Home from "./Home"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import Settings from './Settings'
import QuestDetail from './QuestDetail'

export default function App() {
  const Root = () => {
    return (
      <>
        <Header/>
        <div>
          <Outlet />
        </div>
      </>
    );
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element ={<Home />}/>
        <Route path="/create_quest" element ={<Quest />}/>
        <Route path="/login" element ={<LoginForm />}/>
        <Route path="/signup" element ={<SignUpForm />}/>
        <Route path="/settings" element ={<Settings />}/>
        <Route path="/quest/:id" element ={<QuestDetail />}/>
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