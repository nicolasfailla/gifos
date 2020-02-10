// DECLARACION TEXTO BUSCADOR

let textoBuscador = document.getElementById("textoBuscador");

// FUNCION QUE ESTILA EL BUSCADOR SI ESCRIBIS EN EL MISMO

function mostrarOpcionesbuscador() {
  let valorTextoBuscador = textoBuscador.value;

  // ESTILADO SI ESCRIBIS

  if (valorTextoBuscador != "") {
    document
      .getElementById("dropdownOpciones")
      .classList.add("showOpcionesBuscador");
    document
      .getElementById("buscarLupaBoton")
      .classList.remove("buscarLupaBoton");
    document
      .getElementById("buscarLupaBoton")
      .classList.add("buscarLupaBotonActive");
    document.documentElement.style.setProperty(
      "color",
      "var(--colorLetraBotonMisgifosNight)"
    );
    

    
    document
      .getElementById("textoBuscador")
      .style.setProperty("color", "black");

      // ESTILA BUSCADOR SEGUN THEME
       ;
      function cambiarEstiloBuscadorConLetrasPorTheme () {
      if (document.getElementById("themeCss").getAttribute("href") === "css/style-themenight.css" ) {
          document.getElementById("imagenBotonBuscarLupa").src = "img/lupa_light.svg";
          document
    .getElementById("textoBuscar").style.setProperty(
      "color",
      "#FFFFFF"
    );
        }

        if (document.getElementById("themeCss").getAttribute("href") === "css/style-themeday.css" )  {
            document.getElementById("imagenBotonBuscarLupa").src = "img/lupa.svg";
            document
      .getElementById("textoBuscar").style.setProperty(
        "color",
        "#110038"
      );
          }
        }
        cambiarEstiloBuscadorConLetrasPorTheme ();

  }

  // ESTILADO SI EL BUSCADOR ESTA VACIO
  else {
    document
      .getElementById("dropdownOpciones")
      .classList.remove("showOpcionesBuscador");
    document.getElementById("buscarLupaBoton").classList.add("buscarLupaBoton");
    document
      .getElementById("buscarLupaBoton")
      .classList.remove("buscarLupaBotonActive");
    document.documentElement.style.setProperty(
      "--colorLetraBuscarLupaDay",
      " #8F8F8F"
    );
    document.getElementById("imagenBotonBuscarLupa").src =
      "img/Combined Shape.svg";
    document.documentElement.style.setProperty(
      "--colorLetraTextoForm",
      " #110038"
    );

    // ESTILA BUSCADOR SEGUN THEME

    function cambiarEstiloBuscadorSinLetrasPorTheme () {
      if (document.getElementById("themeCss").getAttribute("href") === "css/style-themenight.css" ) {
          document.getElementById("imagenBotonBuscarLupa").src = "img/Combined shape.svg";
          document
    .getElementById("textoBuscar").style.setProperty(
      "color",
      "#8F8F8F"
    );
        }

        if (document.getElementById("themeCss").getAttribute("href") === "css/style-themeday.css" )  {
            document.getElementById("imagenBotonBuscarLupa").src = "img/lupa.svg";
            document
      .getElementById("textoBuscar").style.setProperty(
        "color",
        "#110038"
      );
          }
        }
        cambiarEstiloBuscadorSinLetrasPorTheme ();

  }
}

// EVENT LISTENER DEL BUSCADOR (ACCIONA SI HAY LETRAS)

textoBuscador.addEventListener("input", mostrarOpcionesbuscador);

// GUARDAR BUSQUEDA LOCAL STORAGE

function guardarBusquedaLocalStorage() {
  var arrayBusquedasGifos = [];

  let valorTextoBuscador = textoBuscador.value;

  // IGUALA EL ARRAY A LO QUE HAYA EN EL LOCAL STORAGE

  if (
    JSON.parse(localStorage.getItem("arrayBusquedasGifosLocalStorage")) != null
  ) {
    arrayBusquedasGifos = JSON.parse(
      localStorage.getItem("arrayBusquedasGifosLocalStorage")
    );
  }

  // AGREGA TEXTO BUSCADO AL ARRAY

  arrayBusquedasGifos.unshift(valorTextoBuscador);

  // GUARDA NUEVO ARRAY EN LOCAL STORAGE

  localStorage.setItem(
    "arrayBusquedasGifosLocalStorage",
    JSON.stringify(arrayBusquedasGifos)
  );
}

// MOSTRAR BUSQUEDAS ANTERIORES DEL LOCAL STORAGE

function mostrarBusquedasGuardadas() {
  // BUSCA ARRAY DE COSAS BUSCADAS EN LOCAL STORAGE

  let arrayBusquedasGuardadas = JSON.parse(
    localStorage.getItem("arrayBusquedasGifosLocalStorage")
  );

  // SI NO HAY NADA EN EL LOCAL STORAGE...

  if (arrayBusquedasGuardadas === null) {
    contGenBusquedasGuardadas = document.getElementById(
      "contGenBusquedasGuardadas"
    );
    recuadroResultado = document.createElement("div");
    recuadroResultado.classList.add("recuadroResultado");
    recuadroResultadoTexto = document.createElement("a");
    recuadroResultadoTexto.classList.add("recuadroResultadoTexto");
    textoResultado = document.createTextNode("No hay busquedas guardadas");

    recuadroResultadoTexto.appendChild(textoResultado);

    recuadroResultado.appendChild(recuadroResultadoTexto);

    contGenBusquedasGuardadas.appendChild(recuadroResultado);
  }
  // SI HAY COSAS EN EL LOCAL...
  else {
    let contGenBusquedasGuardadas = document.getElementById(
      "contGenBusquedasGuardadas"
    );
    while (contGenBusquedasGuardadas.firstChild) {
      contGenBusquedasGuardadas.removeChild(
        contGenBusquedasGuardadas.firstChild
      );
    }

    for (i = 0; i < arrayBusquedasGuardadas.length; i++) {
      let contGenBusquedasGuardadas = document.getElementById(
        "contGenBusquedasGuardadas"
      );
      let recuadroResultado = document.createElement("div");
      recuadroResultado.classList.add("recuadroResultado");
      let recuadroResultadoTexto = document.createElement("a");
      recuadroResultadoTexto.classList.add("recuadroResultadoTexto");
      let textoResultado = document.createTextNode(arrayBusquedasGuardadas[i]);
      recuadroResultado.setAttribute("data-foo", arrayBusquedasGuardadas[i]);
      // AGREGA URL Y FUNCION ONCLICK A LOS GIFOS
      recuadroResultado.setAttribute(
        "onclick",
        "verMasGifos('" + arrayBusquedasGuardadas[i] + "')"
      );

      recuadroResultadoTexto.appendChild(textoResultado);

      recuadroResultado.appendChild(recuadroResultadoTexto);

      contGenBusquedasGuardadas.appendChild(recuadroResultado);
    }
  }
}

mostrarBusquedasGuardadas();

// TERMINA MOSTRAR BUSQUEDAS ANTERIORES DEL LOCAL STORAGE
