var listaPalabras = ["DESARROLLADOR", "CSS", "HTML", "RESPONSIVE", "AUTO", "GIMNASIO", "VIERNES", "FUTBOL", "MUSICA", "ARGENTINA"];
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d"); 
var ejeX = 100;
var x = 100;
var ejeX_2 = [];
var palabraSecreta;
var error;
var acierto;
var teclasPulsadas = [];
var habilitarJuego = true;

var botonInicio = document.querySelector("#inicio-juego");
botonInicio.onclick = dibujarTablero;

function dibujarTablero(){
	habilitarJuego = true;
	error = 0;
	var sectionBotones = document.querySelector("#section-botones");
	sectionBotones.style.display = "none";
	pantalla.classList.remove("invisible"); 
	pincel.font = "25px Verdana";
	//TABLERO
	pincel.fillStyle = "#072B61";  
	pincel.fillRect(120,20,1200,800);
	//BASE HORCA
	pincel.fillStyle = "#000000";
	pincel.fillRect(550,500,200,5);
	//FUNCIONES A EJECUTAR
	dibujarLineas(elegirPalabra());
	crearBotones();

	return error;
}

function elegirPalabra(){
	var indiceAleatorio = Math.round(Math.random()*(listaPalabras.length-1));
	var palabra = listaPalabras[indiceAleatorio];
	palabraSecreta = palabra;
	return palabraSecreta;
}

function dibujarLineas(palabraSecreta){ 
	acierto = 0;
	for(var i = 0; i < palabraSecreta.length; i++){
		ejeX = ejeX + 80;
		ejeX_2[i] = ejeX + 2;
		pincel.fillStyle = "#000000";
		pincel.fillRect(ejeX,700,40,5);
	}
	return acierto;
}

window.onkeypress = validarTecla;
function validarTecla(event){
	var valorCorrecto = false;
	if(habilitarJuego){
		var codigoIntento = event.keyCode;
		if(codigoIntento >= 65 && codigoIntento <= 90){
			valorCorrecto = true;
		}
		for(var i = 0; i < teclasPulsadas.length; i++){
			if(codigoIntento == teclasPulsadas[i]){
				valorCorrecto = false;
			}
		}
		teclasPulsadas.push(codigoIntento);
		comparar(valorCorrecto,codigoIntento);
	}
};

function comparar(valorCorrecto,codigoIntento){
	if(valorCorrecto == true && palabraSecreta != undefined){
		var letraCorrecta = false;
		for(var i = 0; i < palabraSecreta.length; i++){
			if(codigoIntento == palabraSecreta.charCodeAt(i)){
				letraCorrecta = true;
				acierto++;
				var posicion = i;
				dibujarLetrasCorrectas(posicion);
				verificarGanador();
			}
		}
		if(!letraCorrecta){
			dibujarLetrasIncorrectas(codigoIntento);
			dibujarAhorcado();
		}
	}
}

function dibujarLetrasCorrectas(posicion){
	pincel.font = "3.5em Righteous";
	pincel.fillStyle = "#FFFFFF";
	pincel.fillText(palabraSecreta.charAt(posicion), ejeX_2[posicion], 690);
}

function dibujarLetrasIncorrectas(codigoIntento){
	pincel.font = "3.5em Righteous";
	pincel.fillStyle = "#E60000";
	x = x + 80;
	pincel.fillText(String.fromCharCode(codigoIntento), x, 600);
}

function dibujarAhorcado(){
	error++;
	switch(error){
		case 1:
			//HORCA 1ERA PARTE
			pincel.fillStyle = "#000000";
			pincel.fillRect(600,150,5,350);
			break;
		case 2:
			//HORCA 2DA PARTE
			pincel.fillStyle = "#000000";
			pincel.fillRect(600,150,150,5);	
			break;
		case 3:
			//HORCA 3ERA PARTE
			pincel.fillStyle = "#000000";
			pincel.fillRect(750,150,5,80);
			break;
		case 4:
			//CABEZA
			pincel.fillStyle = "#000000";
			pincel.beginPath();
			pincel.arc(750,250,40,0,2*3.14);
			pincel.fill();	
			break;
		case 5:
			//CUERPO
			pincel.fillStyle = "#000000";
			pincel.fillRect(750,280,5,100);	
			break;
		case 6:
			//BRAZO IZQUIERDA
			pincel.fillStyle = "#000000";
			pincel.beginPath();
			pincel.moveTo(750,300);
			pincel.lineTo(710,350);
			pincel.lineTo(705,350);	
			pincel.fill();
			break;
		case 7:
			//BRAZO DERECHA
			pincel.fillStyle = "#000000";
			pincel.beginPath();
			pincel.moveTo(755,300);
			pincel.lineTo(795,350);
			pincel.lineTo(800,350);	
			pincel.fill();	
			break;
		case 8:
			//PIERNA IZQUIERDA
			pincel.fillStyle = "#000000";
			pincel.beginPath();
			pincel.moveTo(750,380);
			pincel.lineTo(730,430);
			pincel.lineTo(735,440);	
			pincel.fill();		
			break;
		default:
			verificarFinJuego();
	}
}

function verificarFinJuego(){
	if(error == 9){
		//PIERNA DERECHA
		pincel.fillStyle = "#000000";
		pincel.beginPath();
		pincel.moveTo(755,380);
		pincel.lineTo(775,430);
		pincel.lineTo(770,440);	
		pincel.fill();	
		finalizarJuego();
		habilitarJuego = false;
	}
}

function finalizarJuego(){
	pincel.fillStyle = "#E60000";
	pincel.fillText("Fin del juego!", 845, 300);
}

function verificarGanador(){
	if(acierto == palabraSecreta.length){
		dibujarMensajeVictoria();
		habilitarJuego = false;
	}
}

function dibujarMensajeVictoria(){
	pincel.fillStyle = "#00CC00";
	pincel.fillText("Ganaste", 850, 300);
	pincel.fillText("Felicidades!", 850, 350);
}

function crearBotones(){
	//SECCION NUEVA PARA LOS BOTONES DE REINICIO Y DESISTIR
	var sectionNueva = document.querySelector("#nuevos-botones");
	sectionNueva.classList.remove("invisible");

	//BOTON PARA REINICIAR
	var botonReinicio = document.querySelector("#boton-nuevo-juego")
	botonReinicio.onclick = empezarNuevoJuego;

	//BOTON PARA DESISTIR
	var botonDesistir = document.querySelector("#boton-desistir")
	botonDesistir.onclick = volverMenu;
}

function empezarNuevoJuego(){
	error = 0;
	acierto = 0;
	ejeX = 100;
	x = 100;
	ejeX_2 = [];
	teclasPulsadas = [];
	habilitarJuego = true;
	dibujarTablero();
}

function volverMenu(){
	ejeX = 100;
	x = 100;
	ejeX_2 = [];
	teclasPulsadas = [];
	var sectionNueva = document.querySelector("#nuevos-botones");
	sectionNueva.classList.add("invisible");
	pantalla.classList.add("invisible"); 
	var sectionBotones = document.querySelector("#section-botones");
	sectionBotones.style.display = "block";
}
