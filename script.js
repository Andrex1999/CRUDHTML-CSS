const $btnSignIn = document.querySelector(".sign-in-btn"),
  $btnSignUp = document.querySelector(".sign-up-btn"),
  $sigUp = document.querySelector(".sign-up"),
  $sigin = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
  if (e.target === $btnSignIn || e.target === $btnSignUp) {
    $sigin.classList.toggle("active");
    $sigUp.classList.toggle("active");
  }
});

//Crear Usuario Local Storage
function crearUser() {
  let nombreC = document.getElementById("nombre").value.trim();
  let contraseñaC = document.getElementById("contraseña").value.trim();

  let cuentaC = {
    nombreC,
    contraseñaC
  }
  if (localStorage.getItem("UsuariosEps") === null) {
    let cuentaGuardada = [];
    cuentaGuardada.push(cuentaC);
    localStorage.setItem("UsuariosEps", JSON.stringify(cuentaGuardada));
  } else {
    let cuentaGuardada = JSON.parse(localStorage.getItem("UsuariosEps"));
    cuentaGuardada.push(cuentaC);
    localStorage.setItem("UsuariosEps", JSON.stringify(cuentaGuardada));
  }
  limpiarCrearCuenta();
}

//Limpiar Creador de cuenta
function limpiarCrearCuenta() {
  document.getElementById("nombre").value = "";
  document.getElementById("contraseña").value = "";
}

//Validacion Inicio Sesion.
function inicioSesion() {
  let iNombre = document.getElementById("nombreI").value;
  let iContraseña = document.getElementById("contraseñaI").value;

  let datosInicio = JSON.parse(localStorage.getItem("UsuariosEps"));

  let posicion = buscarCliente(iNombre);

  if (posicion != -1) {
    if (datosInicio[posicion].contraseñaC == iContraseña.trim()) {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Inicio de sesion exitoso!',
        
      })
      setTimeout(() =>{
        window.location.href = "./menu.html";
        console.log("timeout executed...")
    }, 2000);
    } else {
      console.log(datosInicio[posicion].contraseñaC, iContraseña);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Contraseña incorrecta. Usuario y contraseña no coinciden'
      })
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Este usuario no esta registrado'
    })
  }
}

// Entregar Posicion.
function buscarCliente(nombre) {
  usuario = JSON.parse(localStorage.getItem("UsuariosEps"));
  index = usuario.findIndex((obj) => obj.nombreC == nombre);
  console.log("index:" + index);
  return index;
}
