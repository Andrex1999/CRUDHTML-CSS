document.getElementById("formulario").addEventListener("submit",crear);

/*function select(){
    var opcion = document.getElementById("T_identidad");
    var selected = opcion.options[opcion.selectedIndex].text;
    return selected;
}*/
//funcion crear:
function crear(e){
   
    T_identidad=document.getElementById("T_identidad").value
    N_identidad=document.getElementById("N_identidad").value
    nombre=document.getElementById("nombre").value
    Fecha_hora=document.getElementById("Fecha_hora").value
    especialidad=document.getElementById("especialidad").value
    let usuario={
        T_identidad,
        N_identidad,
        nombre,
        Fecha_hora,
        especialidad
    }
    
    if(localStorage.getItem("Usuarios") ===null){
        let usuarios=[]
        usuarios.push(usuario)
        localStorage.setItem("Usuarios",JSON.stringify(usuarios))
        Swal.fire({
            icon: 'success',
            title: 'Excelente',
            text: 'Registro exitoso!',
            
          })
    }
    else{
        // falta colocar condicionales de registro
        let usuarios=JSON.parse(localStorage.getItem("Usuarios"))

        usuarios.push(usuario)
        localStorage.setItem("Usuarios",JSON.stringify(usuarios))
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
    let usuarios=JSON.parse(localStorage.getItem("Usuarios"));
    //localStorage.clear();
    document.getElementById("tbody").innerHTML="";
    for(let i=0; i < usuarios.length ; i++){
        let T_identidad=usuarios[i].T_identidad
        let N_identidad=usuarios[i].N_identidad
        let nombre=usuarios[i].nombre
        let Fecha_hora=usuarios[i].Fecha_hora
        let especialidad=usuarios[i].especialidad
        document.getElementById("tbody").innerHTML += 
        `<tr>
            <td> ${T_identidad}</td>
            <td> ${N_identidad}</td>
            <td> ${nombre}</td>
            <td> ${Fecha_hora}</td>
            <td> ${especialidad}</td>
            <td> <button onclick="eliminar('${N_identidad}')" class="btn btn-danger"> Eliminar </button></td>
            <td> <button onclick="editar('${N_identidad}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#edit_modal">Editar</button></td>

        </tr>`
    }
}

function editar(N_identidad){
    let usuarios =JSON.parse(localStorage.getItem("Usuarios"));
    for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].N_identidad===N_identidad){
            document.getElementById("edit_modal").innerHTML = 
            `<div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Editar citas medicas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="modal">
                  <div class="card">
                      <div class="card-header">
                          <h3> Nuevos Datos de la cita</h3>
                      </div>
                      <div class="card-body">
                          <form id="formulario">
                              <div class="form-group">
                                  <label class="form-label"> Tipo de identificaion:</label>
                                  <select class="form-control"  id="new_Tidentidad" >
                                      <option >Cedula</option>
                                      <option >Pasaporte</option>
                                      <option >T.identitad</option>
                                      <option >C.extranjera</option>
                                  </select>

                              </div>
                              <div class="form-group">
                                  <label class="form-label"> Numero:</label>
                                  <input type="num" id="new_Nidentidad" class="form-control" value="${usuarios[i].N_identidad}">
                              </div>
                              <div class="form-group">
                                  <label class="form-label"> Paciente:</label>
                                  <input id="new_nombre" type="text" class="form-control"  value="${usuarios[i].nombre}">
                              </div>
                              <div class="form-group">
                                  <label class="form-label"> Fecha y hora:</label>
                                  <input id="new_Fecha_hora" type="datetime-local" class="form-control" value="${usuarios[i].Fecha_hora}">
                              </div>
                              <div class="form-group">
                                  <label class="form-label"> Especialidad:</label>
                                  <select class="form-control"  id="new_especialidad" >
                                      <option >Medicina general</option>
                                      <option >Oftalmologia</option>
                                      <option >Otorrinolaringologia</option>
                                      <option >Cardiologia</option>
                                      <option >pediatria</option>
                                  </select> 
                                 
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" onclick="actualizar('${i}')"> Actualizar </button>
              </div>
            </div>
          </div>`

         
        }
    }
}
function actualizar(i){
    let usuarios=JSON.parse(localStorage.getItem("Usuarios"));
    usuarios[i].T_identidad=document.getElementById("new_Tidentidad").value
    usuarios[i].N_identidad=document.getElementById("new_Nidentidad").value
    usuarios[i].nombre=document.getElementById("new_nombre").value
    usuarios[i].Fecha_hora=document.getElementById("new_Fecha_hora").value
    usuarios[i].especialidad=document.getElementById("new_especialidad").value
    localStorage.setItem("Usuarios",JSON.stringify(usuarios));
    Swal.fire({
        icon: 'success',
        title: 'Excelente',
        text: 'Edicion completa!',
        
      })
    $("#edit_modal").modal('hide');
    leer();
}

function eliminar(N_identidad){
    let usuarios =JSON.parse(localStorage.getItem("Usuarios"));
    for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].N_identidad===N_identidad){
            usuarios.splice(i,1);
        }
    }
    localStorage.setItem("Usuarios",JSON.stringify(usuarios));
    leer();
}
leer();
