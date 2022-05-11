import { clientServices } from "../services/client-service.js";
import { MostrarProductos } from "./mostrar.productos.controller.js";

//contenedor de resultados
const resultados = document.querySelector("[data-productos-busqueda]");
const tituloBusqueda = document.querySelector("[data-titulo-busqueda]");

const mostrarResultadoBuscado = async () => {

  const url = new URL(window.location);
  const nombreBuscado = url.searchParams.get("texto");

  if(nombreBuscado === null){
    console.log("Hubo un error al momento de buscar el producto");
  }

  let cantidadResultados = 0;
  
  //Resultados busqueda
  clientServices.listaProductos().then(data => {
    data.forEach(({nombre, precio, descripcion, imagen, id, categoria}) => {
      const nombreMinuscula = nombre.toLowerCase();
      if(nombreBuscado === nombreMinuscula){
        const mostrarResultadoBuscado = MostrarProductos(nombre, precio, descripcion, imagen, id, categoria);
        resultados.appendChild(mostrarResultadoBuscado);
        cantidadResultados++;
      }
    });
    //Mostrar mensajes cuando no haya resultados
    if(cantidadResultados == 0){
      const textoInformativo = `
      <h2 class="productos__resultados_mensaje">No se encontraron resultados para esta busqueda</h2>
      `
      tituloBusqueda.innerHTML = textoInformativo;
    }
  })
}
mostrarResultadoBuscado();



//Nueva busqueda
const buscador = document.querySelector("[data-buscador]");

//Enviando nombre de la busqueda a pagina resultados busqueda
buscador.addEventListener("input", evento => {
  const texto = evento.target.value;
  buscador.addEventListener("keypress", eventoDos => {
    if (eventoDos.key === 'Enter') {
      
      clientServices.listaProductos().then(data => {
        data.forEach(({nombre, precio, descripcion, imagen, id, categoria}) => {
          if(texto === nombre){
            const mostrarProductoBuscado = MostrarProductos(nombre, precio, descripcion, imagen, id, categoria);
            resultados.appendChild(mostrarProductoBuscado);
          }
        });
      })
    }
  });
});