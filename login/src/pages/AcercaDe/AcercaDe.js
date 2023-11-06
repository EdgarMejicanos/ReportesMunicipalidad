import DefaultLayout from "../../components/DefaultLayout";

export default function AcercaDe(){

return(
  <>

    
<DefaultLayout>
  <center>
      <h2>¿Tienes alguna duda?</h2>
      
  </center>
<h1>Estado de los reportes</h1>

<p>Existen diferentes tipos diferentes de estados en los reportes, aquí te mostramos cuales son y su significado, </p>
   <p> recuerda que puedes revisar en tu pagina principal para saber el estado de tu reporte.</p>

<center>
<a className="btn btn btn-warning btn-lg">En espera</a>
<p>El reporte fue enviado exitosamente, está en espera de ser revisado y aprobado. Puedes revisar en tu pagina principal para saber el estado de tu reporte.</p>

<a className="btn btn btn-success btn-lg">Aprobado</a>
<p>El reporte fue revisado por administración, fue aprobado exitosamente y queda a la espera de una fecha para su reparación</p>

<a className="btn btn btn-danger btn-lg">Rechazado</a>
<p>El reporte fue revisado, fue rechazado por alguna razon en administración. Puede revisar el porque fue rechazado en su pagina principal. Puede intentar hacer otro reporte.</p>

<a className="btn btn btn-info btn-lg">En reparación</a>
<p>El reporte fue revisado, fue rechazado por alguna razon en administración. Puede revisar el porque fue rechazado en su pagina principal. Puede intentar hacer otro reporte.</p>

<a className="btn btn btn-secondary btn-lg">Solucionado</a>
<p>El reporte ya fue solucionado y dado por concluido exitosamente.</p>




</center>

  </DefaultLayout>
</>
)

}