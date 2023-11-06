import * as React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Reporte from "./pages/Reporte/Reporte";
import 'bootstrap/dist/css/bootstrap.css';
import Administrar from "./pages/Administrar/Administrar";
import Reportes_por_aprobar from "./pages/Administrar/ReportesPorAprobar";
import ReportesPorAprobar from "./pages/Administrar/ReportesPorAprobar";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./App.css"
import ReportesAprobados from "./pages/Administrar/ReportesAprobados";
import ReportesRechazados from "./pages/Administrar/ReportesRechazados";
import ReportesSinFiltro from "./pages/Administrar/ReportesSinFiltro";
import ReportesSolucionados from "./pages/Administrar/ReportesSolucionados";
import AcercaDe from "./pages/AcercaDe/AcercaDe";
import ReportesEnReparacion from "./pages/Administrar/ReportesEnReparacion";
import Registro from "./pages/Registro/Registro";

const rutas = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/registro",
    element: <Registro/>
  },

  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/reportes",
        element: <Reporte/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar",
        element: <Administrar/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar/reportes_en_espera",
        element: <Reportes_por_aprobar/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar/reportes_aprobados",
        element: <ReportesAprobados/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar/reportes_rechazados",
        element: <ReportesRechazados/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar/reportes_all",
        element: <ReportesSinFiltro/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar/reportes_solucionados",
        element: <ReportesSolucionados/>
      }
    ]
  },{
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/administrar/reportes_en_reparacion",
        element: <ReportesEnReparacion/>
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/acercaDe",
        element: <AcercaDe/>
      }
    ]
  }
  

]);

function App() {
  return <RouterProvider router={rutas}/>;
}

export default App;
