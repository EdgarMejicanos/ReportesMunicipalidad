import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../helpers/api";
import BootstrapTable from 'react-bootstrap-table-next';
import SweetAlert from 'react-bootstrap-sweetalert';
import Badge from 'react-bootstrap/Badge';
import { getImageUrl } from "../../helpers/media";

import Select from 'react-select'
import { estados, estadosBasicos } from "../../helpers/constants";



export default function ReportesAprobados(){

    const options = Object.entries(estados).map(([estado, titulo]) => ({label: titulo, value: estado}))

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [direccion, setDireccion] = useState("");
    const [referencias, setReferencias] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado,setEstado] = useState("");
    const [selected, setSelected] = useState("");

    const [images, setImages] = useState([]);
    const [showImagesModal, setShowImagesModal] = useState(false);

    const [comentario, setComentario] = useState ("");

  const handleSave = () => {

    api.actualizarEstado(selected, estado).then(response => {
        setShowModal(false)

        api.getReportes(estadosBasicos.APROBADO).then(response => {
            const informacion = response.data.data.map(reporte => {
                return {
                    id : reporte.id, 
                    ...reporte.attributes
                }
            } )
            setData(informacion) 
        })
    }).catch(
        error => console.log(error)
    )


  }

  const onCancel = (event) => {

    setShowModal(false)

  }

    useEffect(() => {
        api.getReportes(estadosBasicos.APROBADO).then(response => {
            const informacion = response.data.data.map(reporte => {
                return {
                    id : reporte.id, 
                    ...reporte.attributes
                }
            } )
            setData(informacion) 
        })
    }, [])

    const onClick = (id) => {
        const reporte = data.find(reporte =>  reporte.id===id)
        setDescripcion(reporte.Descripcion);
        setReferencias(reporte.Referencias);
        setDireccion(reporte.Direccion);
        setEstado(reporte.Estado);
        setTelefono(reporte.Telefono);
        setSelected(id);
        setComentario(reporte.Comentario);


        setShowModal(true)
    }

    const showImageClick = (id) => {
        const reporte = data.find(reporte => reporte.id === id);
    
        if(reporte) {
          if(!!reporte.Fotografia.data) {
            const images = reporte.Fotografia.data.map(foto => {
                return getImageUrl(foto);
              });
        
              setImages(images)
              setShowImagesModal(true);

            }
        
          }
          
      };

    
    const columns = [{
        dataField: 'id', 
        text: ' ID ',
    }, {
        dataField: 'Descripcion',
        text: 'Descripcion del caso'
    }, {
        dataField: 'Estado',
        text: 'Estado del reporte',
        formatter: (cell,row) => {
            let classes=""
            if(cell===estadosBasicos.APROBADO){
                classes += "success"
            }else if(cell===estadosBasicos.ESPERA){
                classes += "warning"
            }else if(cell===estadosBasicos.REPARACION){
                classes += "info"
            }else if(cell===estadosBasicos.RECHAZADO){
                classes += "danger"
            }else if(cell===estadosBasicos.TERMINADO){
                classes += "secondary"
            }
            return <Badge bg={classes}>{cell}</Badge>
        }
    }, {
        dataField: 'Direccion',
        text: 'Dirección'
    }, {
        dataField: 'createdAt',
        text: 'Creado en:'
    }, {
        dataField: '#',
        text: 'Acciones',
        formatter: (cell,row) => {
            return <div><button onClick={()=> {onClick(row.id)}} className="btn btn-primary me-2">Ver</button>
                        <button onClick={()=> {showImageClick(row.id)}} className="btn btn-primary">Ver imagenes</button>
            </div>
        }

    }
    
    ];

    return(
        <>
        <DefaultLayout>


        <BootstrapTable keyField='id' data={ data } columns={ columns } />


            
        <SweetAlert style={{overflow: "initial"}} customClass="update-modal" onCancel={onCancel} showCancel={true} show={showModal} onConfirm={handleSave} className="h-75" >
           
        <form className="card__form" >
                <div>
                <label>Dirección exacta:</label>
                <input type="text" className="form-control" disabled={true} value={direccion} name="direccion"/>
                </div>

                <div>
                <label>Referencias:</label>
                <input type="text" className="form-control" disabled={true} value={referencias} name="referencias"/>
                </div>

                <div>
                <label>Telefono:</label>
                <input type="text" className="form-control" disabled={true} value={telefono} name="telefono"/>
                </div>

                <div>
                <label>Descripcion de el caso:</label>
                <textarea className="form-control" disabled={true} value={descripcion} name="descripcion"></textarea>
                </div>
                <div>
                <label>Estado:</label>

                <Select options={options} defaultValue={{value: estado, label: estados[estado]}} classNamePrefix="custom-select" onChange={(selection) => {setEstado(selection.value)}} />

                <div>
                <label>Comentario sobre el reporte:</label>
                <textarea className="form-control" value={comentario} name="descripcion" onChange={(event) => {setComentario(event.target.value)}}></textarea>
                </div>

                </div>
            </form>
        </SweetAlert  >
        <SweetAlert
          customClass="update-modal"
          showCancel={false}
          onConfirm={() => {setShowImagesModal(false); setImages([]);}}
          show={showImagesModal}
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

        <center>
        <a className="btn btn-primary btn-lg" href="/administrar">Regresar</a>
        </center>

        </DefaultLayout>

        </>
    )
}