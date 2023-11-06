import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DefaultLayout from "../../components/DefaultLayout";
import authProvider from "../../auth/AuthProvider";
import api from "../../helpers/api";
import { estadosBasicos } from "../../helpers/constants";
import Badge from "react-bootstrap/Badge";
import SweetAlert from "react-bootstrap-sweetalert";
import BootstrapTable from 'react-bootstrap-table-next';
import { getImageUrl } from "../../helpers/media";


export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const usuario = authProvider.getUsuario();

  useEffect(() => {
    setLoading(true);
    api.getUserReportes().then((response) => {
      const informacion = response.data.data.map((reporte) => {
        return {
          id: reporte.id,
          ...reporte.attributes,
        };
      });
      setData(informacion);
      setLoading(false);
      console.log(informacion);
    });
  }, []);

  const showImageClick = (id) => {
    const reporte = data.find(reporte => reporte.id === id);

    if(reporte) {
      if(!!reporte.Fotografia.data) {
        const images = reporte.Fotografia.data.map(foto => {
          return getImageUrl(foto);
        });
  
        setImages(images);
        setShowModal(true);

      }

      }
      
  };

  const columns = [
    {
      dataField: "id",
      text: " ID ",
    },
    {
      dataField: "Descripcion",
      text: "Descripcion del caso",
    },
    {
      dataField: "Estado",
      text: "Estado del reporte",
      formatter: (cell, row) => {
        let classes = "";
        if (cell === estadosBasicos.APROBADO) {
          classes += "success";
        } else if (cell === estadosBasicos.ESPERA) {
          classes += "warning";
        } else if (cell === estadosBasicos.REPARACION) {
          classes += "info";
        } else if (cell === estadosBasicos.RECHAZADO) {
          classes += "danger";
        } else if (cell === estadosBasicos.TERMINADO) {
          classes += "secondary";
        }
        return <Badge bg={classes}>{cell}</Badge>;
      },
    },
    {
      dataField: "Comentario",
      text: "Comentario sobre su reporte:"
    },
    {
      dataField: "Direccion",
      text: "Dirección",
    },
    {
      dataField: "createdAt",
      text: "Creado en:",
    },
    {
      dataField: "#",
      text: "Acciones",
      formatter: (cell, row) => {
        return (
          <button
            onClick={() => {
              showImageClick(row.id);
            }}
            className="btn btn-primary"
          >
            Ver Imagenes
          </button>
        );
      },
    },
  ];

  return (
    <>
      <DefaultLayout>
        <center>
          <h2>Bienvenido {usuario.nombre}!</h2>
          <h3>¡Estamos listos para tomar tu reporte!</h3>
        </center>
        {!loading ? (
          <BootstrapTable keyField="id" data={data} columns={columns} />
        ) : (
          <div className="d-flex justify-content-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <SweetAlert
          customClass="update-modal"
          showCancel={false}
          onConfirm={() => {setShowModal(false); setImages([]);}}
          show={showModal}
          className="h-80"
        >
          <div className="w-100 h-100">
          {
            images?.map(image => {
              return (
                <img className="w-100" src={image.src} width={image.width} height={image.height}/>
              );
            })
          }
          </div>
          
        </SweetAlert>

        <img src="foto_muni.jpg"></img>
      </DefaultLayout>
    </>
  );
}
