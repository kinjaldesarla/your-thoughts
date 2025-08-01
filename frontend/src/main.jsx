import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Dairy from './components/Dairy.jsx'
import Login from './components/Login.jsx'
import DairyPage from './components/DairyPage.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dairy"
        element={
          <ProtectedRoute>
            <Dairy />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dairypage/:dairyId"
        element={
          <ProtectedRoute>
            <DairyPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
 <StrictMode>
<RouterProvider router={router}/>
  </StrictMode>
)
