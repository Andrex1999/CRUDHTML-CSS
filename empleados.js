document.getElementById("formulario").addEventListener("submit", crear);

function crear(e) {
  T_identidad = document.getElementById("T_identidad").value;
  N_identidad = document.getElementById("N_identidad").value;
  empresa = document.getElementById("empresa").value;
  ciudad_ingreso = document.getElementById("ciudad").value;
  direccion_ingreso = document.getElementById("direccion").value;
  correo_ingreso = document.getElementById("correo").value;
  codigo_postal = document.getElementById("codigoP").value;
  regimen_ingreso = document.getElementById("regimensc").value;
  let empleado = {
    T_identidad,
    N_identidad,
    empresa,
    ciudad_ingreso,
    direccion_ingreso,
    correo_ingreso,
    codigo_postal,
    regimen_ingreso,
  };

  if (localStorage.getItem("Empleados") === null) {
    let Empleados = [];
    Empleados.push(empleado);
    localStorage.setItem("Empleados", JSON.stringify(Empleados));
    Swal.fire({
      icon: 'success',
      title: 'Excelente',
      text: 'Registro exitoso!',
      
    })
  } else {
    // falta colocar condicionales de registro
    let Empleados = JSON.parse(localStorage.getItem("Empleados"));

    Empleados.push(empleado);
    localStorage.setItem("Empleados", JSON.stringify(Empleados));
    Swal.fire({
      icon: 'success',
      title: 'Excelente',
      text: 'Registro exitoso!',
      
    })
  }
  leer();
  document.getElementById("formulario").reset();
  e.preventDefault();
  $("#new_user_modal").modal('hide');
}
$("#new_user_modal").on("hidden.bs.modal", function (event) {
  let formulario1 = $("#new_user_modal").find("form");
  formulario1[0].reset();
});

/// INYECTAR HTML
function leer() {
  let Empleados = JSON.parse(localStorage.getItem("Empleados"));

  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < Empleados.length; i++) {
    let T_identidad = Empleados[i].T_identidad;
    let N_identidad = Empleados[i].N_identidad;
    let empresa = Empleados[i].empresa;
    let ciudad = Empleados[i].ciudad_ingreso;
    let direccion = Empleados[i].direccion_ingreso;
    let correo = Empleados[i].correo_ingreso;
    let codgiop = Empleados[i].codigo_postal;
    let regimensc = Empleados[i].regimen_ingreso;
    document.getElementById("tbody").innerHTML += `<tr>
              <td> ${T_identidad}</td>
              <td> ${N_identidad}</td>
              <td> ${empresa}</td>
              <td> ${ciudad}</td>
              <td> ${direccion}</td>
              <td> ${correo}</td>
              <td> ${codgiop}</td>
              <td> ${regimensc}</td>
              <td> <button onclick="eliminar('${N_identidad}')" class="btn btn-danger"> Eliminar </button></td>
              <td> <button onclick="editar('${N_identidad}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#edit_modal">Editar</button></td>
  
          </tr>`;
  }
}
leer();

function editar(N_identidad) {
  let empleados = JSON.parse(localStorage.getItem("Empleados"));
  for (let i = 0; i < empleados.length; i++) {
    if (empleados[i].N_identidad === N_identidad) {
      document.getElementById("edit_modal").innerHTML = `
      
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar Empleados</h5>
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
                  <h3>Actualizacion de datos</h3>
                </div>
                <div class="card-body">
                  <form id="formulario">
                    <div class="form-group">
                      <label class="form-label"> Tipo de identificaion:</label>
                      <select class="form-control" id="New_T_identidad">
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
                        id="New_identidad"
                        class="form-control"
                        
                        value ="${empleados[i].N_identidad}"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label"> Empresa:</label>
                      <input
                        id="New_empresa"
                        type="text"
                        class="form-control"
                       
                        value ="${empleados[i].empresa}"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label"> Ciudad:</label>
                      <input
                        id="New_ciudad"
                        type="text"
                        class="form-control"
                       
                        value ="${empleados[i].ciudad_ingreso}"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label"> Direccion:</label>
                      <input
                        id="New_direccion"
                        type="text"
                        class="form-control"
                        value ="${empleados[i].direccion_ingreso}"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label"> Correo:</label>
                      <input
                        id="New_correo"
                        type="email"
                        class="form-control"
                       
                        value ="${empleados[i].correo_ingreso}"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label"> Codigo Postal:</label>
                      <input
                        id="New_codigoP"
                        type="number"
                        class="form-control"
                        
                        value ="${empleados[i].codigo_postal}"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label"> Regimen:</label>
                      <select class="form-control" id="New_regimensc">
                        <option>Subsidiado</option>
                        <option>Contributivo</option>
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
        </div> `;
    }
  }
}
function actualizar(i) {
  let Empleados = JSON.parse(localStorage.getItem("Empleados"));
  Empleados[i].T_identidad = document.getElementById("New_T_identidad").value;
  Empleados[i].Nidentidad = document.getElementById("New_identidad").value;
  Empleados[i].empresa = document.getElementById("New_empresa").value;
  Empleados[i].ciudad_ingreso = document.getElementById("New_ciudad").value;
  Empleados[i].direccion_ingreso =
    document.getElementById("New_direccion").value;
  Empleados[i].correo_ingreso = document.getElementById("New_correo").value;
  Empleados[i].codigo_postal = document.getElementById("New_codigoP").value;
  Empleados[i].regimen_ingreso = document.getElementById("New_regimensc").value;
  localStorage.setItem("Empleados", JSON.stringify(Empleados));
  Swal.fire({
    icon: 'success',
    title: 'Excelente',
    text: 'Edicion completa!',
    
  })
$("#edit_modal").modal('hide');
leer();
}


function eliminar(N_identidad) {
  let empleados = JSON.parse(localStorage.getItem("Empleados"));
  for (let i = 0; i < empleados.length; i++) {
    if (empleados[i].N_identidad === N_identidad) {
      empleados.splice(i, 1);
    }
  }
  localStorage.setItem("Empleados", JSON.stringify(empleados));
  leer();
}
leer();
