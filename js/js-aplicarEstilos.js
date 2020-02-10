/* ABRE ELEGIR TEMA DROPDOWN */

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

function mostrarLinks() {
  document.getElementById("myDropdown").classList.toggle("show");
}
let button = document.getElementById("dropbtn1");
button.addEventListener("click", mostrarLinks);

/* CIERRA ELEGIR TEMA DROPDOWN */

// ABRE ESTILAR SAILOR DAY

function estilarSailorDayVariables() {
  var estiloSailorDayAplicado;

  document.getElementById("imagenLogoGifos").src = "img/gifOF_logo.png";

  if (document.getElementById("imagenBotonBuscarLupa")) {
    document.getElementById("imagenBotonBuscarLupa").src =
      "img/lupa_inactive.svg";
  }

  let theme = document.getElementById("themeCss");

  theme.href = "css/style-themeday.css";

  localStorage.removeItem("estiloSailorDayAplicado");
  localStorage.setItem("estiloSailorDayAplicado", "estilarSailorDayVariables");
}

// CIERRA ESTILAR SAILOR DAY

// ABRE ESTILAR SAILOR NIGHT

function estilarSailorNightVariables() {
  var estiloSailorDayAplicado;

  document.getElementById("imagenLogoGifos").src = "img/gifOF_logo_dark.png";

  if (document.getElementById("imagenBotonBuscarLupa")) {
    document.getElementById("imagenBotonBuscarLupa").src =
      "img/Combined Shape.svg";
  }

  let theme = document.getElementById("themeCss");

  theme.href = "css/style-themenight.css";

  localStorage.removeItem("estiloSailorDayAplicado");
  localStorage.setItem(
    "estiloSailorDayAplicado",
    "estilarSailorNightVariables"
  );
}

// CIERRA ESTILAR SAILOR NIGHT

// BOTONES Y FUNCIONES

let botonSailorDay = document.getElementById("botonSailorDay");
botonSailorDay.addEventListener("click", estilarSailorDayVariables);

let botonSailorNight = document.getElementById("botonSailorNight");
botonSailorNight.addEventListener("click", estilarSailorNightVariables);

// MUESTRA SI HAY ESTILO MAPLICADO ANTERIORMENTE

window.onload = () => {
  console.log(
    "Estilo Aplicado Anteriormente (default: Day)): " +
    localStorage.estiloSailorDayAplicado
  );
};

/*FUNCION DE APLICAR TEMA SI EL LOCAL STORAGE ES FALSE O TRUE SI YA LO TOCO EL USUARIO EN OTRA PAGINA */

function estilarPorSessionV2() {
  if (localStorage.estiloSailorDayAplicado) {
    switch (localStorage.estiloSailorDayAplicado) {
      case "estilarSailorDayVariables": {
        estilarSailorDayVariables();
      }
      break;
    case "estilarSailorNightVariables": {
      estilarSailorNightVariables();
    }
    break;
    }
  } else {
    console.log("no hay tema precargado");
  }
}

estilarPorSessionV2();