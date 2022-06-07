var sectionBotones = document.querySelector("#section-botones");
var campoTexto;
var container;
var leyenda;

var bttnAgregarPalabra = document.querySelector("#agrego-palabra");
bttnAgregarPalabra.addEventListener("click", function(){

	sectionBotones.style.display = "none";

	campoTexto = document.createElement("textarea");
	campoTexto.placeholder = "Ingrese una palabra...";
	campoTexto.classList.add("nuevoCampoTexto");
	document.body.appendChild(campoTexto);
	leyenda = document.createElement("p");
	leyenda.classList.add("aclaracion-leyenda");
	leyenda.textContent = "ACLARACIÓN: La palabra a ingresar tiene que ser escrita en mayúsculas y no debe superar los 8 caracteres; no deben usarse números ni caracteres especiales."
	document.body.appendChild(leyenda);
	crearBotonesAgregado();
});

function crearBotonesAgregado(){
	container = document.createElement("div");
	document.body.appendChild(container);
	var bttnGuardado = document.createElement("button");
	bttnGuardado.textContent = "Guardar y Empezar";
	container.appendChild(bttnGuardado);

	var bttnCancelar = document.createElement("button");
	bttnCancelar.textContent = "Cancelar";
	container.appendChild(bttnCancelar);
	bttnGuardado.onclick = agregarPalabra;
	bttnCancelar.onclick = cancelarAgregado;
}

function agregarPalabra(){
	var habilitarAgregado = true;
	palabraAgregada = campoTexto.value;
	var largoPalabra = palabraAgregada.length;
	if(largoPalabra == 0 || largoPalabra > 8){
		habilitarAgregado = false;
		leyenda.style.textDecoration = "underline";
		leyenda.style.color = "#B30000";
		campoTexto.value = "";
	}
	for(var i = 0; i < largoPalabra; i++){
		if(palabraAgregada.charCodeAt(i) < 65 || palabraAgregada.charCodeAt(i) > 90){
			habilitarAgregado = false;
			leyenda.style.textDecoration = "underline";
			leyenda.style.color = "#B30000";
			campoTexto.value = "";
		}
	}
	if(habilitarAgregado){
		listaPalabras.push(palabraAgregada);
		remover();
		empezarNuevoJuego();
	}
}

function cancelarAgregado(){
	remover();
	sectionBotones.style.display = "block";
}

function remover(){
	campoTexto.remove();
	leyenda.remove();
	container.remove();
}

