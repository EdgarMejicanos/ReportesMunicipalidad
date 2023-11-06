import { useNavigate, Navigate } from "react-router-dom";
import React,{useEffect} from "react";
import imagen from "./muni.png";
import banner from "./banner.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';
import authProvider from "../../auth/AuthProvider";


export default function DefaultLayout({ children }) {

  const nav = useNavigate();

  const handleLogout = () =>{
    authProvider.logout();
    nav("/login")
  }

  const rol = authProvider.getRol();


  return (
    <>
      <header>
      <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between px-3">
        <Navbar.Brand href="/dashboard">
          <img src={imagen} id="logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="MuniReportes" id="basic-nav-dropdown">
              <NavDropdown.Item href="#" onClick={handleLogout} className="text-danger">Cerrar sesión</NavDropdown.Item>
              
          </NavDropdown>

            <Nav.Link href="/dashboard">Inicio</Nav.Link>
            <Nav.Link href="/reportes">Reportes</Nav.Link>
            <Nav.Link href="/acercaDe">Acerca de</Nav.Link>
            {
              rol.identificador === "municipal" && (

                <NavDropdown title="Administrar" id="basic-nav-dropdown">
              <NavDropdown.Item href="/administrar/reportes_all" className="">Todos los reportes</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="/administrar/reportes_en_espera" className="bg-warning">Reportes en espera</NavDropdown.Item>
              <NavDropdown.Item href="/administrar/reportes_en_reparacion" className="bg-info">Reportes en reparación</NavDropdown.Item>
              <NavDropdown.Item href="/administrar/reportes_aprobados" className="bg-success">Reportes aprobados</NavDropdown.Item>
              <NavDropdown.Item href="/administrar/reportes_rechazados" className="bg-danger">Reportes rechazados</NavDropdown.Item>
              <NavDropdown.Item href="/administrar/reportes_solucionados" className="bg-secondary text-white">Reportes solucionados</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/administrar">
                Ver acciones
              </NavDropdown.Item>
            </NavDropdown>

              )
            }
            
            
          

          </Nav>
        </Navbar.Collapse>
        <img src={banner} id="banner"/>
    </Navbar>
      
      </header>

      <main>{children}</main>
    </>
  );
}