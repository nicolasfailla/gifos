// DECLARACION BOTON LUPA BUSCAR

let buscarLupaBoton = document.getElementById("buscarLupaBoton");

// APIKEY

apiKey = "D1S75ra9LrFB5yUfA4KZd0o47LpX3X4T";

// BUSCAR GIFOS

function getSearchResults() {
  // ELIMINA GIFOS CARGADOS PREVIAMENTE

  contGeneralBusquedas = document.getElementById("contGeneralBusquedas");
  while (contGeneralBusquedas.firstChild) {
    contGeneralBusquedas.removeChild(contGeneralBusquedas.firstChild);
  }

  let valorTextoBuscador = textoBuscador.value;

  // FETCH BUSCA TEXTO BUSCADO EN GIPHY

  const found = fetch(
    "https://api.giphy.com/v1/gifs/search?q=" +
      valorTextoBuscador +
      "&api_key=" +
      apiKey +
      "&limit=20"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      // GENERA IMAGENES BUSCADAS EN EL NAVEGADOR
      for (i = 0; i < 20; i++) {
        gif1 = data.data[i].images.preview_gif.url;

        imageHeight = data.data[i].images.preview_gif.height;

        imageWidth = data.data[i].images.preview_gif.width;

        contGeneralBusquedas = document.getElementById("contGeneralBusquedas");

        imagenCont280 = document.createElement("div");
        imagenCont280.classList.add("imagenCont280x280V2");

        // AGREGA URL AL DIV Y FUNCION ONCLICK
        imagenCont280.setAttribute("data-foo", data.data[i].url);
        imagenCont280.setAttribute(
          "onclick",
          "abrirGifoUrl('" + data.data[i].url + "')"
        );

        contGeneralBusquedas.appendChild(imagenCont280);

        imgBusqueda = document.createElement("div");

        imgBusqueda.style.backgroundImage = "url(" + gif1 + ")";

        imgBusqueda.classList.add("divBackground");

        imagenCont280.appendChild(imgBusqueda);

        // GIF ANCHO OCUPA DOS COLUMNAS

        function aplicarAnchoOcupadoAGuifo() {
          if (imageHeight / imageWidth < 0.6) {
            imagenCont280.classList.add("imagenCont280x280OcupaDosColumnas");
            imgBusqueda.style.paddingBottom = "50%";
          } else {
            imagenCont280.classList.add("imagenCont280x280V2OcupaUnaColumna");
          }
        }
        aplicarAnchoOcupadoAGuifo();
      }

      return data;
    })
    .catch(error => {
      return error;
    });
  return found;
}

// FUNCION BOTON BUSCAR

buscarLupaBoton.addEventListener("click", function() {
  getSearchResults();
  guardarBusquedaLocalStorage();
  mostrarBusquedasGuardadas();
});

// TERMINA FUNCION BOTON BUSCAR

// FUNCION MOSTRAR TENDENCIAS

function mostrarTendencias() {
  const found = fetch(
    "https://api.giphy.com/v1/gifs/trending?" +
      "&api_key=D1S75ra9LrFB5yUfA4KZd0o47LpX3X4T"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (i = 0; i < 20; i++) {
        gif1 = data.data[i].images.preview_gif.url;

        if (data.data[i].images.preview_gif.url != undefined) {
          imageHeight = data.data[i].images.preview_gif.height;

          imageWidth = data.data[i].images.preview_gif.width;

          contGeneralBusquedas = document.getElementById(
            "contGeneralBusquedas"
          );

          imagenCont280 = document.createElement("div");
          imagenCont280.classList.add("imagenCont280x280V2");

          // AGREGA URL AL DIV Y FUNCION ONCLICK
          imagenCont280.setAttribute("data-foo", data.data[i].url);
          imagenCont280.setAttribute(
            "onclick",
            "abrirGifoUrl('" + data.data[i].url + "')"
          );

          contGeneralBusquedas.appendChild(imagenCont280);

          imgBusqueda = document.createElement("div");

          imgBusqueda.style.backgroundImage = "url(" + gif1 + ")";

          imgBusqueda.classList.add("divBackground");

          imagenCont280.appendChild(imgBusqueda);

          // QUE OCUPE DOS COLUMNAS SI LA RELACION DE ASPECTO ES HORIZONTAL

          function aplicarAnchoOcupadoAGuifo() {
            if (imageHeight / imageWidth < 0.6) {
              imagenCont280.classList.add("imagenCont280x280OcupaDosColumnas");
              imgBusqueda.style.paddingBottom = "50%";
            } else {
              imagenCont280.classList.add("imagenCont280x280V2OcupaUnaColumna");
            }
          }
          aplicarAnchoOcupadoAGuifo();
        }
      }

      return data;
    })
    .catch(error => {
      return error;
    });
  return found;
}

// EJECUTA MOSTRAR TENDENCIAS

mostrarTendencias();

// TERMINA FUNCION MOSTRAR TENDENCIAS

// FUNCION VER MAS GIFOS (HARDCODEADOS)

function verMasGifos(valorTextoBuscador) {
  contGeneralBusquedas = document.getElementById("contGeneralBusquedas");
  while (contGeneralBusquedas.firstChild) {
    contGeneralBusquedas.removeChild(contGeneralBusquedas.firstChild);
  }

  const found = fetch(
    "https://api.giphy.com/v1/gifs/search?q=" +
      valorTextoBuscador +
      "&api_key=" +
      apiKey +
      "&limit=20"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (i = 0; i < 20; i++) {
        gif1 = data.data[i].images.preview_gif.url;

        imageHeight = data.data[i].images.preview_gif.height;

        imageWidth = data.data[i].images.preview_gif.width;

        contGeneralBusquedas = document.getElementById("contGeneralBusquedas");

        imagenCont280 = document.createElement("div");
        imagenCont280.classList.add("imagenCont280x280V2");
       
         // AGREGA URL AL DIV Y FUNCION ONCLICK
        imagenCont280.setAttribute("data-foo", data.data[i].url);
        imagenCont280.setAttribute(
          "onclick",
          "abrirGifoUrl('" + data.data[i].url + "')"
        );

        contGeneralBusquedas.appendChild(imagenCont280);

        imgBusqueda = document.createElement("div");

        imgBusqueda.style.backgroundImage = "url(" + gif1 + ")";

        imgBusqueda.classList.add("divBackground");

        imagenCont280.appendChild(imgBusqueda);

      // QUE OCUPE DOS COLUMNAS SI LA RELACION DE ASPECTO ES HORIZONTAL

        function aplicarAnchoOcupadoAGuifo() {
          if (imageHeight / imageWidth < 0.6) {
            imagenCont280.classList.add("imagenCont280x280OcupaDosColumnas");
            imgBusqueda.style.paddingBottom = "50%";
          } else {
            imagenCont280.classList.add("imagenCont280x280V2OcupaUnaColumna");
          }
        }
        aplicarAnchoOcupadoAGuifo();
      }

      return data;
    })
    .catch(error => {
      return error;
    });
  return found;
}

// TERMINA FUNCION VER MAS GIFOS (HARDCODEADOS)

// FUNCION ABRIR GIFO URL ORIGINAL

function abrirGifoUrl(gifoUrl2) {
  window.open(gifoUrl2, "_blank");
}
