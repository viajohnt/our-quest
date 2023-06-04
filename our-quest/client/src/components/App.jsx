import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import React from 'react'
import '../index.css'
import ErrorPage from './ErrorPage.jsx'
import Quest from "./Quests"
import Header from "./Header"
import Footer from "./Footer"


// function App() {

//   return (
//     <div className='App'>

//       <Header />
//       <Quest />
//       <Footer />

//     </div>
//   );
// }
// export default App;


export default function App() {
  // const [currentUser, setCurrentUser] = useState(null)

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
        <Route index element ={<Quest />}/>
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