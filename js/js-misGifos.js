/* DECLARACIONES DE CANCELACION DE SUBIDA DE GIFO */

const controller = new AbortController();
const signal = controller.signal;

/* API KEY */

apiKey = "D1S75ra9LrFB5yUfA4KZd0o47LpX3X4T";

/* EMPIEZA ESTILAR BOTON LISTO A ROJO */
let buttonParar = document.getElementById("botonPararGrabacion");

function estilarBotonListoARojo() {
  buttonParar.style.backgroundColor = "#FF6161";
}

/* TERMINA ESTILAR BOTON LISTO A ROJO */

/* DECLARACION GIFO VISTAPREVIA */

let gifoVistaPrevia = document.getElementById("gifoVistaPrevia");

/* EMPIEZA FUNCION MOSTRAR VISTA PREVIA */

function mostrarVistaPrevia() {
  mostrarVistaPreviaVentana();

  gifoVistaPreviaImagen = document.createElement("img");

  gifoVistaPreviaImagen.src = urlGif;

  gifoVistaPreviaImagen.classList.add("width100");
  gifoVistaPreviaImagen.classList.add("height100");

  gifoVistaPrevia.appendChild(gifoVistaPreviaImagen);
}

/* TERMINA FUNCION MOSTRAR VISTA PREVIA */

/* EMPIEZA MOSTRAR GIFO SUBIDO EN ULTIMA VENTANA */

function mostrarGifoSubidoUltimaVentana(gifSubidoUrlPreview) {
  let gifoVistaPrevia = document.getElementById("guifoSubido");

  gifoVistaPreviaSubidoImagen = document.createElement("img");

  gifoVistaPreviaSubidoImagen.src = gifSubidoUrlPreview;

  gifoVistaPreviaSubidoImagen.classList.add("width100");

  gifoVistaPrevia.appendChild(gifoVistaPreviaSubidoImagen);
}

/* TERMINA EMPIEZA MOSTRAR GIFO SUBIDO EN ULTIMA VENTANA */

/* EMPIEZA MOSTRAR VIDEO */

function getStreamAndRecord() {
  let video = document.getElementById("video");

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: {
          max: 480
        }
      }
    })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();

      function cruzCerrarCapturaCierraVentana() {
        document.getElementById("creargifos2").classList.remove("show");
        document.getElementById("creargifos2").classList.add("hide");
        stream.stop();
      }

      let cruzCerrarCaptura = document.getElementById("cruzCerrarCaptura");
      cruzCerrarCaptura.addEventListener(
        "click",
        cruzCerrarCapturaCierraVentana
      );
    });
}

/* TERMINA MOSTRAR VIDEO */

/* EMPIEZA FUNCION UPLOADEAR VIDEO */

function funcionUpload(form, recorder) {
  let botonCancelarSubida = document.getElementById("botonCancelarSubida");
  let noError = false;

  //Set handlers to cancel, delayed to avoid errors with the loading bar
  setTimeout(function() {
    {
      botonCancelarSubida.addEventListener("click", function cancelApiUpload() {
        noError = true;
        controller.abort();
      });
    }
  }, 600);

  const upload = fetch(
    "https://upload.giphy.com/v1/gifs" + "?api_key=" + apiKey,
    {
      method: "POST", // or 'PUT'
      body: form,
      signal: signal
    }
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      

      return data;
    })

    .then(data => {
      gifID = data.data.id;

      cerrarVentanaSubiendoAbrirVentanaExito();
      // GUARDA ID EN EL LOCAL STORAGE
      guardarLocalStorageGuifosID(gifID);

      getURLbyID(gifID);

      return data;
    })

    .catch(error => {
      if (!noError) {
        uploadCanceled = true;
        setTimeout(function() {
          alert("Ha ocurrido un error al subir el guifo.");
          // VUELVE A CARGAR LA PAGINA
          window.location.href = "misgifos.html";
        }, 600);

        return error;
      } else {
        uploadCanceled = true;
        
        alert("Has cancelado subir tu guifo.");
        // VUELVE A CARGAR LA PAGINA
        window.location.href = "misgifos.html";
        
      }
    });
  return upload;
}

/* TERMINA FUNCION UPLOADEAR VIDEO */

/* EMPIEZA CAPTURAR VIDEO */

function empiezaGrabacion() {
  document.getElementById("creargifos2").classList.remove("show");
  document.getElementById("creargifos2").classList.add("hide");
  document.getElementById("creargifos3").classList.remove("hide");
  document.getElementById("creargifos3").classList.add("show");

  estilarBotonListoARojo();

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })

    .then(async function(stream) {
      let recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240
      });
      recorder.startRecording();

      let video = document.getElementById("videoCapturado");
      video.srcObject = stream;
      video.play();

      // FUNCION CERRAR CAPTURA DE GIFO

      function cruzCerrarCapturandoTuGifo() {
        document.getElementById("creargifos3").classList.remove("show");
        document.getElementById("creargifos3").classList.add("hide");
        
        recorder.stopRecording();
        recorder.clearRecordedData();
        recorder.destroy();
      }

      let cruzCerrarCapturaEliminaRecorder = document.getElementById(
        "cruzCerrarCapturaEliminaRecorder"
      );
      cruzCerrarCapturaEliminaRecorder.addEventListener(
        "click",
        cruzCerrarCapturandoTuGifo
      );

      // TERMINA FUNCION CERRAR CAPTURA DE GIFO

      // FUNCION PARAR GRABACION Y GRABA BLOB

      function pararGrabacion() {
        recorder.stopRecording(function() {
          let blob = recorder.getBlob();
          /* invokeSaveAsDialog(blob); */
        });

        urlGif = URL.createObjectURL(recorder.getBlob());

        mostrarVistaPrevia();

        /* ABRE FUNCION CONVIERTE BLOB A GIF Y UPLOADEA A GIPHY */

        function subirGifo() {
          let form = new FormData();
          form.append("file", recorder.getBlob(), "myGif.gif");
        
          cerrarVistaPreviaAbrirSubiendo();
          funcionUpload(form, recorder);
        }

        let botonSubirGifo = document.getElementById("subirGifo");
        botonSubirGifo.addEventListener("click", subirGifo);

        /* TERMINA FUNCION CONVIERTE BLOB A GIF Y UPLOADEA A GIPHY */

        // ABRE FUNCION DE CRUZ EN CAPTURANDO TU GIFO

        function cancelarCaptura() {
          stream.stop();
          cerrarCapturandoGifo();
        }

        let cruzCerrarCapturaEliminaRecorder = document.getElementById(
          "cruzCerrarCapturaEliminaRecorder"
        );
        cruzCerrarCapturaEliminaRecorder.addEventListener(
          "click",
          cancelarCaptura
        );

        // CIERRA FUNCION DE CRUZ EN CAPTURANDO TU GIFO

        // ABRE REPETIR CAPTURA Y CIERRA VISTA PREVIA (ELIMINA BLOB)

        function repetirCaptura() {
          recorder.stopRecording();
          recorder.clearRecordedData();
          recorder.destroy();
          let gifoVistaPrevia = document.getElementById("gifoVistaPrevia");
          while (gifoVistaPrevia.firstChild) {
            gifoVistaPrevia.removeChild(gifoVistaPrevia.firstChild);
          }

          mostrarCheckeoCerrarVistaPrevia();
        }

        let botonRepetirCaptura = document.getElementById("repetirCaptura");
        botonRepetirCaptura.addEventListener("click", repetirCaptura);

        // TERMINA REPETIR CAPTURA Y CIERRA VISTA PREVIA (ELIMINA BLOB)

        // ABRE FUNCION CRUZ DE VISTA PREVIA

        function cerrarVistaPrevia2() {
          recorder.clearRecordedData();
          recorder.destroy();

          document.getElementById("creargifos4").classList.remove("show");
          document.getElementById("creargifos4").classList.add("hide");
        }

        let cruzCerrarVistaPrevia = document.getElementById(
          "cruzCerrarVistaPrevia"
        );
        cruzCerrarVistaPrevia.addEventListener("click", cerrarVistaPrevia2);

        // TERMINA FUNCION CRUZ DE VISTA PREVIA

        // TERMINA PARAR GRABACION
      }

      let buttonParar = document.getElementById("botonPararGrabacion");
      buttonParar.addEventListener("click", pararGrabacion);
    });
}

/* TERMINA CAPTURAR VIDEO */

/* EVENT LISTENER CAPTURAR GRABACION */

let buttonCapturar = document.getElementById("botonCapturar");
buttonCapturar.addEventListener("click", empiezaGrabacion);

/* EMPIEZA ABRIR Y CERRAR VENTANAS, BOTONES */

// EMPIEZA VENTANA CREAR GIFOS

function comenzar1() {
  document.getElementById("creargifos1").classList.remove("show");
  document.getElementById("creargifos1").classList.add("hide");
  document.getElementById("creargifos2").classList.remove("hide");
  document.getElementById("creargifos2").classList.add("show");
  getStreamAndRecord();
}

let buttonComenzar = document.getElementById("botonComenzar");
buttonComenzar.addEventListener("click", comenzar1);

function crearGifosBoton() {
  if (
    // EVITA ABRIR VENTANA "CREAR GIFOS" SI OTRAS VENTANAS FUERON ABIERTAS
    document.getElementById("creargifos2").classList.contains("hide") &&
    document.getElementById("creargifos3").classList.contains("hide") &&
    document.getElementById("creargifos4").classList.contains("hide") &&
    document.getElementById("creargifos5").classList.contains("hide") &&
    document.getElementById("creargifos6").classList.contains("hide")
  ) {
    document.getElementById("creargifos1").classList.remove("hide");
    document.getElementById("creargifos1").classList.add("show");
  }
}



let buttonCrear = document.getElementById("botonCrear");
buttonCrear.addEventListener("click", crearGifosBoton);

function cancelar() {
  document.getElementById("creargifos1").classList.remove("show");
  document.getElementById("creargifos1").classList.add("hide");
}

let buttonCancelar = document.getElementById("botonCancelar");
buttonCancelar.addEventListener("click", cancelar);

// TERMINA VENTANA CREAR GIFOS

// EMPIEZA VENTANA UN CHECKEO

let botonIniciarCaptura = document.getElementById("botonCapturar");
botonIniciarCaptura.addEventListener("click", empiezaGrabacion);

function mostrarVistaPreviaVentana() {
  document.getElementById("creargifos3").classList.remove("show");
  document.getElementById("creargifos3").classList.add("hide");
  document.getElementById("creargifos4").classList.remove("hide");
  document.getElementById("creargifos4").classList.add("show");
}

function cerrarCapturandoGifo() {
  document.getElementById("creargifos3").classList.remove("show");
  document.getElementById("creargifos3").classList.add("hide");
}

// TERMINA VENTANA UN CHECKEO

// EMPIEZA VENTANA CAPTURANDO TU GIFO

function mostrarCheckeoCerrarVistaPrevia() {
  document.getElementById("creargifos4").classList.remove("show");
  document.getElementById("creargifos4").classList.add("hide");
  comenzar1();
}

// TERMINA VENTANA CAPTURANDO TU GIFO

// EMPIEZA VENTANA VISTA PREVIA

function cerrarVistaPreviaAbrirSubiendo() {
  document.getElementById("creargifos4").classList.remove("show");
  document.getElementById("creargifos4").classList.add("hide");
  document.getElementById("creargifos5").classList.remove("hide");
  document.getElementById("creargifos5").classList.add("show");
}


// TERMINA VENTANA VISTA PREVIA

// EMPIEZA VENTANA SUBIENDO GIFO

function cerrarVentanaSubiendoAbrirVentanaExito() {
  document.getElementById("creargifos5").classList.remove("show");
  document.getElementById("creargifos5").classList.add("hide");
  document.getElementById("creargifos6").classList.remove("hide");
  document.getElementById("creargifos6").classList.add("show");
}

function cerrarVentanaSubiendo() {
  document.getElementById("creargifos5").classList.remove("show");
  document.getElementById("creargifos5").classList.add("hide");
}

// TERMINA VENTANA SUBIENDO GIFO

/* TERMINA ABRIR Y CERRAR VENTANAS */

/* FUNCION BUSCAR GIFO POR ID */

function getURLbyID(gifID) {
  const foundID = fetch(
    "https://api.giphy.com/v1/gifs/" + gifID + "?api_key=" + apiKey
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      gifSubidoUrlPreview = data.data.images.fixed_height_downsampled.url;

      var gifSubidoUrl = data.data.url;

      // go to GIF Url with Download Button
      botonDescargarGuifo = document.getElementById("descargarGuifo");
      botonDescargarGuifo.onclick = function() {
        window.open(gifSubidoUrl, "_blank");
      };

      mostrarGifoSubidoUltimaVentana(gifSubidoUrlPreview);

      contGeneralBusquedas = document.getElementById("contGeneralBusquedas");

      imagenCont280 = document.createElement("div");
      imagenCont280.classList.add("imagenCont280x280V2");
      // AGREGA FUNCION PARA IR A LA URL ORIGINAL
      imagenCont280.setAttribute("data-foo", gifSubidoUrl);
      imagenCont280.setAttribute(
        "onclick",
        "abrirGifoUrl('" + gifSubidoUrl + "')"
      );

      contGeneralBusquedas.insertBefore(
        imagenCont280,
        contGeneralBusquedas.childNodes[0]
      );

      imgBusqueda = document.createElement("div");

      imgBusqueda.style.backgroundImage = "url(" + gifSubidoUrlPreview + ")";

      imgBusqueda.classList.add("divBackground");

      imagenCont280.appendChild(imgBusqueda);

      // Copy URL to clipboard

      botonCopiarEnlace = document.getElementById("copiarEnlace");
      let input = document.createElement("input");
      input.className = "originalSizeUrl";
      input.readOnly = true;
      input.style.display = "none";

      botonCopiarEnlace.appendChild(input);
      input.value = gifSubidoUrl;

      botonCopiarEnlace.onclick = function() {
        input.style.display = "block";
        input.select();
        document.execCommand("copy");
        input.style.display = "none";
      };

      // termina Copy URL to clipboard

      return data;
    })
    .catch(error => {
      return error;
    });
  return foundID;
}

/* TERMINA FUNCION BUSCAR GIFO POR ID */

/* EMPIEZAN FUNCIONES IMPRIMIR GIFOS LOCAL STORAGE */

// FUNCION GUARDA ID DE GIFO CREADO EN LOCAL STORAGE

function guardarLocalStorageGuifosID(gifID) {
  var arrayGuifosID = [];

  if (arrayGuifosIDObtenido != null) {
    arrayGuifosID = JSON.parse(
      localStorage.getItem("arrayGuifosIDLocalStorage")
    );
  }

  arrayGuifosID.unshift(gifID);

  localStorage.setItem(
    "arrayGuifosIDLocalStorage",
    JSON.stringify(arrayGuifosID)
  );
}

// FUNCION QUE SOLICITA LOS ID DEL LOCAL STORAGE

function solicitarLocalStorageGuifosID() {
  arrayGuifosIDObtenido = JSON.parse(
    localStorage.getItem("arrayGuifosIDLocalStorage")
  );

}

// FETCH QUE BUSCA E IMPRIME LOS IDS DEL LOCAL EN GIPHY

function fetchLocalStorageID(arrayGuifosIDObtenido) {
  const foundIDLocalStorage = fetch(
    "https://api.giphy.com/v1/gifs/" +
      arrayGuifosIDObtenido[i] +
      "?api_key=" +
      apiKey
  )
    .then(response => {
      return response.json();
    })
    .then(data => {

      gifLocalStorage = data.data.images.fixed_height_downsampled.url;

      if (gifLocalStorage != undefined) {
        contGeneralBusquedas = document.getElementById("contGeneralBusquedas");

        imagenCont280 = document.createElement("div");
        imagenCont280.classList.add("imagenCont280x280V2");

        imagenCont280.setAttribute("data-foo", data.data.url);
        imagenCont280.setAttribute(
          "onclick",
          "abrirGifoUrl('" + data.data.url + "')"
        );

        contGeneralBusquedas.appendChild(imagenCont280);

        imgBusqueda = document.createElement("div");

        imgBusqueda.style.backgroundImage = "url(" + gifLocalStorage + ")";

        imgBusqueda.classList.add("divBackground");


        imagenCont280.appendChild(imgBusqueda);
      }
      return data;
    })
    .catch(error => {
      return error;
    });

  return foundIDLocalStorage;
}

// FUNCION QUE CREA DIVS CON GIFOS DEL LOCAL, SI EL LOCAL ESTA VACIO NO HACE NADA

function imprimirGuifoLocalStorage() {
  solicitarLocalStorageGuifosID();

  if (arrayGuifosIDObtenido != null) {
    for (i = 0; i < arrayGuifosIDObtenido.length; i++) {
      fetchLocalStorageID(arrayGuifosIDObtenido);
    }
  }
}

/* TERMINAN FUNCIONES IMPRIMIR GIFOS LOCAL STORAGE */

// MOSTRAR GIFOS DEL LOCAL STORAGE

imprimirGuifoLocalStorage();

// BOTON LISTO

botonListo = document.getElementById("botonListo");
botonListo.onclick = function() {
  window.location.href = "misgifos.html";
};

// CRUZ VENTANA EXITO

cruzExito = document.getElementById("cruzExito");
cruzExito.onclick = function() {
  window.location.href = "misgifos.html";
};

// CLICK EN GIFOS ABRE URL ORIGINAL DE GIPHY

function abrirGifoUrl(gifoUrl2) {
  window.open(gifoUrl2, "_blank");
}
