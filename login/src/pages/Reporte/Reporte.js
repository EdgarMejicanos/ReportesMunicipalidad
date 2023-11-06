import { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import api from "../../helpers/api";
import Swal from 'sweetalert2';
import Files from 'react-files';
import authProvider from "../../auth/AuthProvider"
export default function Reporte(){

  const [direccion, setDireccion] = useState("");
  const [referencias, setReferencias] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isLoading,setIsLoding] = useState(false);
  const [images,setImages] = useState([]);

  const handleChange = (event) => {
    if(event.target.name === "direccion"){
      setDireccion(event.target.value);
    }
    else if(event.target.name === "referencias"){
      setReferencias(event.target.value);
    }
    else if(event.target.name === "telefono"){
      setTelefono(event.target.value);
    }
    else if(event.target.name === "descripcion"){
      setDescripcion(event.target.value);
    }
  } 

  const handleSubmit = (event) => {
    setIsLoding(true);
    event.preventDefault()
    const usuario = authProvider.getUsuario();

    const data = {
      Direccion: direccion,
      Referencias: referencias,
      Telefono: telefono,
      Descripcion: descripcion,
      user: usuario.id,
    }

    const formData = new FormData();

    images.forEach((file) => {
      formData.append("files.Fotografia", new Blob([file], { type: file.type }), file.name || 'file');
   });

    formData.append("data", JSON.stringify(data));
    
    api.guardarReporte(formData).then(response => {
      setIsLoding(false);
      Swal.fire({
        title: 'Reporte guardado!',
        text: 'Su reporte ha sido guardado con exito.',
        icon: 'success',
        confirmButtonText: 'ok'
      })
    }).catch(error => {
      console.log(error)
      Swal.fire({
        title: 'Error al guardar el reporte!',
        text: 'Algo ha salido mal, su reporte no pudo ser procesado con exito.',
        icon: 'error',
        confirmButtonText: 'ok'
      });
      setIsLoding(false);

    })
  }


  const handleImageChange = (newFiles) => {
    setImages(prevFiles => [...prevFiles, ...newFiles])
 }

  const handleImageError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }
  
return ( 
<>
 
<DefaultLayout>
<center>
<h1>¡Bienvenido!</h1>
<h2>Aquí puedes llenar nuestro formato para reportar un incidente vial</h2>
</center>
  
          <div className="d-flex justify-content-center mt-5">
            <div className="card w-50 p-5">
            <form className="card__form" onSubmit={handleSubmit}>
                <h1>Registro de reportes</h1>

                <h4 align= "right">Reporte # 001</h4>
                
                
                
                <div>
                <label>Dirección exacta:</label>
                <input type="text" className="form-control" value={direccion} onChange={handleChange} name="direccion" required/>
                </div>

                <div>
                <label>Referencias:</label>
                <input type="text" className="form-control" value={referencias} onChange={handleChange} name="referencias" required/>
                </div>

                <div>
                <label>Telefono:</label>
                <input type="text" className="form-control" value={telefono} onChange={handleChange} name="telefono" required/>
                </div>

                <div className="mb-4">
                <label>Adjunta fotografías:</label>
                <div>
                <Files
                  className='btn btn-secondary'
                  onChange={handleImageChange}
                  onError={handleImageError}
                  accepts={['image/png', '.jpg']}
                  multiple
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable>
                      <div>Click para subir imagenes</div>
                </Files>
                {
                    images.length > 0 && (
                      <div className="files-gallery">
                          {images.map(file => (
                            <img
                                key={file.id}
                                className="w-100 files-gallery-item"
                                src={file.preview.url}
                            />
                          ))}
                      </div>
                    )
                  }
                </div>
                </div>

                <div>
                <label>Descripcion de el caso:</label>
                <textarea className="form-control" value={descripcion} onChange={handleChange} name="descripcion" required></textarea>
                </div>
                { 
                  isLoading ? (
                    <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                  ) : <input type="submit" value="Guardar" className="btn btn-primary w-100 mt-4" />
                }
                


            </form>
            </div>
          </div>
    </DefaultLayout>
          
</>
)

}