import { clientServices } from "../services/client-service.js";

//Creando la card del producto
const MostrarProductosAdmin = (nombre, precio, descripcion, imagen, id, categoria) => {
  //Creando el div que guarda todo el card
  const cardProducto = document.createElement("div");
  cardProducto.className = "producto__card";
  const contenido = `
  <div class="producto__card__imagen" style="background-Image: url(${imagen})">
    <a class="boton-eliminar" id="${id}" href="#"><img src="./assets/img/eliminar-boton.svg" alt="boton eliminar"></a>
    <a class="boton-editar" href="../editar-producto.html?id=${id}"><img src="./assets/img/editar-boton.svg" alt="boton editar"></a>
  </div>
  <h3 class="producto__card__titulo">${nombre}</h3>
  <p class="producto__card__precio">${precio}</p>
  <p class="producto__card__titulo"></p>
  `
  cardProducto.innerHTML = contenido;

  const btnEliminar = cardProducto.querySelector(".boton-eliminar");
  console.log(btnEliminar);

  btnEliminar.addEventListener("click", () => {
    const id = btnEliminar.id;
    Swal.fire({
      title: 'Estas seguro?',
      text: "Quieres eliminar este producto, esta accion no es revertible!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        clientServices.eliminarProducto(id).then(respuesta => {
          console.log(respuesta);
        }).catch(error => alert("Ocurrio un error al momento de eliminar"))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El producto ha sido eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(function(){
          window.location.reload()
        },2000);
      }
    })
  })

  return cardProducto;
}

//Capturando la seccion para mostrar los productos
const productosAdmin = document.querySelector("[data-productos-admin]");

//Recorrer los datos traidos del JSON
clientServices.listaProductos().then(data => {
  data.forEach(({nombre, precio, descripcion, imagen, id, categoria}) => {
    //Imprimir datos en el index
    const nuevoProducto = MostrarProductosAdmin(nombre, precio, descripcion, imagen, id, categoria);
    productosAdmin.appendChild(nuevoProducto);
  });
}).catch(error => alert("ocurrio un error"));
