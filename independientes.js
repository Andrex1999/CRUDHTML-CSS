document.getElementById("formulario").addEventListener("submit",crear);
function crear(e){
   
    T_identidad=document.getElementById("T_identidad").value
    N_identidad=document.getElementById("N_identidad").value
    nombre=document.getElementById("nombre").value
    ciudad=document.getElementById("ciudad").value
    direccion=document.getElementById("direccion").value
    correo=document.getElementById("correo").value
    barrio=document.getElementById("barrio").value
    sede=document.getElementById("sede").value
    let independiente={
        T_identidad,
        N_identidad,
        nombre,
        ciudad,
        direccion,
        correo,
        barrio,
        sede
    }
    
    if(localStorage.getItem("Independientes") ===null){
        let independientes=[]
        independientes.push(independiente)
        localStorage.setItem("Independientes",JSON.stringify(independientes))
        Swal.fire({
            icon: 'success',
            title: 'Excelente',
            text: 'Registro exitoso!',
            
          })
    }
    else{
        // falta colocar condicionales de registro
        let independientes=JSON.parse(localStorage.getItem("Independientes"))

        independientes.push(independiente)
        localStorage.setItem("Independientes",JSON.stringify(independientes))
        Swal.fire({
            icon: 'success',
            title: 'Excelente',
            text: 'Registro exitoso!',
            
          })
    }
    leer();
    document.getElementById("formulario").reset();
    e.preventDefault()
    $("#new_user_modal").modal('hide');
}
$("#new_user_modal").on("hidden.bs.modal", function (event) {
    let formulario1 = $("#new_user_modal").find("form");
    formulario1[0].reset();
  });

  function leer(){
    let independientes=JSON.parse(localStorage.getItem("Independientes"));
    //localStorage.clear();
    document.getElementById("tbody").innerHTML="";
    for(let i=0; i < independientes.length ; i++){
        let T_identidad=independientes[i].T_identidad
        let N_identidad=independientes[i].N_identidad
        let nombre=independientes[i].nombre
        let ciudad=independientes[i].ciudad
        let direccion=independientes[i].direccion
        let correo=independientes[i].correo
        let barrio=independientes[i].barrio
        let sede=independientes[i].sede
        document.getElementById("tbody").innerHTML += 
        `<tr>
            <td> ${T_identidad}</td>
            <td> ${N_identidad}</td>
            <td> ${nombre}</td>
            <td> ${ciudad}</td>
            <td> ${direccion}</td>
            <td> ${correo}</td>
            <td> ${barrio}</td>
            <td> ${sede}</td>
            <td> <button onclick="eliminar('${N_identidad}')" class="btn btn-danger"> Eliminar </button></td>
            <td> <button onclick="editar('${N_identidad}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#edit_modal">Editar</button></td>

        </tr>`
    }
}

function editar(N_identidad){
    let independientes =JSON.parse(localStorage.getItem("Independientes"));
    for(let i=0; i<independientes.length; i++){
        if(independientes[i].N_identidad===N_identidad){
            document.getElementById("edit_modal").innerHTML = 
            `<div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Editar registro de Independientes</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" id="modal">
                <div class="card">
                  <div class="card-header">
                    <h3> Nuevos datos de registro</h3>
                  </div>
                  <div class="card-body">
                    <form id="formulario">
                      <div class="form-group">
                        <label class="form-label"> Tipo de identificaion:</label>
                        <select class="form-control" id="new_Tidentidad">
                          <option>Cedula</option>
                          <option>Pasaporte</option>
                          <option>T.identitad</option>
                          <option>C.extranjera</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label class="form-label"> Numero:</label>
                        <input
                          type="num"
                          id="New_Nidentidad"
                          class="form-control"
                          value="${independientes[i].N_identidad}"
                        />
                      </div>
                      <div class="form-group">
                        <label class="form-label"> Nombre:</label>
                        <input
                          id="new_nombre"
                          type="text"
                          class="form-control"
                          value="${independientes[i].nombre}"
                        />
                      </div>
                      <div class="form-group">
                        <label class="form-label"> Ciudad:</label>
                        <select class="form-control" id="new_ciudad">
                          <option>Barranquilla</option>
                          <option>Bogota</option>
                          <option>Medellin</option>
                          <option>Cali</option>
                          <option>Cartagena</option>
                          <option>Santa Marta</option>
                        </select>
                      </div>
                      <div class="form-group">
                          <label class="form-label"> Direccion:</label>
                          <input
                            id="new_direccion"
                            type="text"
                            class="form-control"
                            value="${independientes[i].direccion}"
                          />
                      </div>
                      <div class="form-group">
                          <label class="form-label"> Correo:</label>
                          <input
                            id="new_correo"
                            type="email"
                            class="form-control"
                            value="${independientes[i].correo}"
                          />
                      </div>
                      <div class="form-group">
                          <label class="form-label"> Barrio:</label>
                          <input
                            id="new_barrio"
                            type="text"
                            class="form-control"
                            value="${independientes[i].barrio}"
                          />
                      </div>
                      <div class="form-group">
                          <label class="form-label"> Sede:</label>
                          <select class="form-control" id="new_sede">
                            <option>Norte</option>
                            <option>Sur</option>
                            <option>este</option>
                            <option>oeste</option>
                            <option>Centro</option>
                          </select>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
              
                <button type="button" class="btn btn-success" onclick="actualizar('${i}')"> Actualizar 
                </button>
                  
              </div>
            </div>
          </div>`

         
        }
    }
}
function actualizar(i){
    let independientes=JSON.parse(localStorage.getItem("Independientes"));
    independientes[i].T_identidad=document.getElementById("new_Tidentidad").value
    independientes[i].N_identidad=document.getElementById("New_Nidentidad").value
    independientes[i].nombre=document.getElementById("new_nombre").value
    independientes[i].ciudad=document.getElementById("new_ciudad").value
    independientes[i].direccion=document.getElementById("new_direccion").value
    independientes[i].correo=document.getElementById("new_correo").value
    independientes[i].barrio=document.getElementById("new_barrio").value
    independientes[i].sede=document.getElementById("new_sede").value
    localStorage.setItem("Independientes",JSON.stringify(independientes));
    Swal.fire({
        icon: 'success',
        title: 'Excelente',
        text: 'Edicion completa!',
        
      })
    $("#edit_modal").modal('hide');
    leer();
}
function eliminar(N_identidad){
    let independientes =JSON.parse(localStorage.getItem("Independientes"));
    for(let i=0; i<independientes.length; i++){
        if(independientes[i].N_identidad===N_identidad){
            independientes.splice(i,1);
        }
    }
    localStorage.setItem("Independientes",JSON.stringify(independientes));
    leer();
}
leer();