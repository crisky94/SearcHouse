const tipo = document.querySelector("#tipo");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const habitaciones = document.querySelector("#rooms");
const bathrooms = document.querySelector("#bathrooms");

//contenedor
const resultado = document.querySelector("#resultado");

const datosBusqueda = {
  tipo: "",
  minimo: "",
  maximo: "",
  habitaciones: "",
  bathrooms: "",
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarPropiedades(propiedades);
});

tipo.addEventListener("change", (e) => {
  datosBusqueda.tipo = e.target.value;
  filtarPropiedad();
});
minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);
  filtarPropiedad();
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = parseInt(e.target.value);
  filtarPropiedad();
});
habitaciones.addEventListener("change", (e) => {
  datosBusqueda.habitaciones = parseInt(e.target.value);
  filtarPropiedad();
});
bathrooms.addEventListener("change", (e) => {
  datosBusqueda.bathrooms = parseInt(e.target.value);
  filtarPropiedad();
});

function mostrarPropiedades(propiedades) {
  limpiarHTML();
  propiedades.forEach((propiedad) => {
    const { tipo, m2, precio, habitaciones, bathrooms } = propiedad;
    const html = document.createElement("p");

    html.textContent = `

     ${tipo} ${m2}-
     ${precio} €-
      ${habitaciones} habitacion(es)-
      ${bathrooms} baño(s)
     `;
    resultado.appendChild(html);
  });
}

function filtarPropiedad() {
  const resultado = propiedades
    .filter(filtrarTipo)
    .filter(filtrarPrecioMin)
    .filter(filtrarPrecioMax)
    .filter(filtrarNumRooms)
    .filter(filtrarNumBathrooms);
  console.log(resultado);

  if (resultado.length) {
    mostrarPropiedades(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement("div");
  noResultado.classList.add("error", "alerta");
  noResultado.textContent = "No hay resultados";

  resultado.appendChild(noResultado);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function filtrarTipo(propiedad) {
  const { tipo } = datosBusqueda;
  if (tipo) {
    return propiedad.tipo == tipo;
  }
  return propiedad;
}
function filtrarPrecioMin(propiedad) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return propiedad.precio >= minimo;
  }
  return propiedad;
}
function filtrarPrecioMax(propiedad) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return propiedad.precio <= maximo;
  }
  return propiedad;
}
function filtrarNumRooms(propiedad) {
  const { habitaciones } = datosBusqueda;
  if (habitaciones) {
    return propiedad.habitaciones == habitaciones;
  }
  return propiedades;
}
function filtrarNumBathrooms(propiedad) {
  const { bathrooms } = datosBusqueda;
  if (bathrooms) {
    return propiedad.bathrooms == bathrooms;
  }
  return propiedad;
}
