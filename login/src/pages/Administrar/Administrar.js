import DefaultLayout from "../../components/DefaultLayout";

export default function Administrar(){

    return(
        <>

<DefaultLayout>
  <center>
      <h2>Desde aquí puedes administrar todos los reportes</h2>
      <h3>Haz click en la acción que deseas realizar</h3>
      <div>
        <br/>
        <br/>
        <a className="btn btn btn-dark btn-lg" href="/administrar/reportes_all">Ver todos los reportes</a>
        <br/>
        <br/>
      </div>
      <div>
        <a className="btn btn btn-warning btn-lg" href="/administrar/reportes_en_espera">Reportes en espera</a>
        <br/>
        <br/>
      </div>
      <div>
        <a className="btn btn-info btn-lg" href="/administrar/reportes_en_reparacion">Reportes en reparación</a>
        <br/>
        <br/>
      </div>
      <div>
        <a className="btn btn-success btn-lg" href="/administrar/reportes_aprobados">Reportes aprobados</a>
        <br/>
        <br/>
      </div>
      <div>
        <a className="btn btn-danger btn-lg" href="/administrar/reportes_rechazados">Reportes rechazados</a>
        <br/>
        <br/>
      </div>
      <div>
        <a className="btn btn-secondary btn-lg" href="/administrar/reportes_solucionados">Reportes Solucionados</a>
        <br/>
        <br/>
      </div>

  </center>


  </DefaultLayout>
        
        </>
    )




}