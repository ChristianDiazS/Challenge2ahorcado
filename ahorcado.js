
let palabrita = "";
let cantidadErrores = 0;
let cantidadDeAciertos = 0;


var palabras = ["ALFOMBRA", "SILLA", "ALMOHADA", "COCINA", "LIBRO", "MOCHILA", "CAMPERA", "PANTALON", "BOLSILLO", "JARRON", "ALCOHOL", "ASCENSOR", "TECLADO", "ESPEJO",
                "PLANCHA", "CELULAR", "HUESO", "CARGADOR", "PARED", "CORTINA", "GUITARRA", "ESCOBA", "SINGAPUR", "UNIVERSO", "SEMAFORO", "SEMILLA", "PERMISO", "REMERA"];
var boton1 = id("jugar");

var imagen = id("imagen");
var botonLetras = document.querySelectorAll("#letras button");

boton1.addEventListener("click", iniciar);


function id(string){
    return document.getElementById(string); 
}

function obtenerRandom(numeroMinimo, numeroMaximo){
    var amplitudValores = numeroMaximo - numeroMinimo;
    var valorAlAzar = Math.floor(Math.random() * amplitudValores) + numeroMinimo;
    return valorAlAzar;
}

function iniciar(event){

    imagen.src = "imagenes/img0.png";
    boton1.disabled = true;
    cantidadErrores = 0;
    cantidadDeAciertos = 0;
    var parrafo = id("palabra_a_adivinar");
    parrafo.innerHTML = "";
    var cantidadPalabras = palabras.length;
    var valorAlAzar = obtenerRandom(0, cantidadPalabras);

    palabrita = palabras[valorAlAzar];
    console.log(palabrita);
    var cantidadLetras = palabrita.length;

    for(let i = 0; i < botonLetras.length; i++){
        botonLetras[i].disabled = false;
    }

    for(let i = 0; i < cantidadLetras; i++){
        var span = document.createElement("span");
        parrafo.appendChild(span);
    }
}

    for(let i = 0; i < botonLetras.length; i++){
        botonLetras[i].addEventListener("click", clickLetras);
    }

function agregarPalabra(){

    var boton = document.querySelector(".input-padron").value;
    boton = boton.toUpperCase();     
    boton !="" && ! palabras.includes(boton)
    palabras.push(boton);
    console.log(palabras);    
    var cantidadLetras = document.querySelector(".input-padron").value;
    cantidadLetras = cantidadLetras.length;

    if(cantidadLetras > 8){
        id(".input-padron").innerHTML = alert("Palabra ingresada excede la cantidad de letras permitidas");    

    }else{ 
        alert("Tu palabra se agregó correctamente");
    }
}

function clickLetras (event){    
    var spans = document.querySelectorAll("#palabra_a_adivinar span")
    var button = event.target;
    button.disabled = true;

    var letra = button.innerHTML.toUpperCase();
    var palabra = palabrita.toUpperCase();

    let acerto = false;
    for(let i = 0; i < palabra.length; i++){
        if(letra == palabra[i]){
            spans[i].innerHTML = letra;
            cantidadDeAciertos++;
            acerto = true;
        }
    }

        if(acerto == false){
            cantidadErrores++;
            var source = `imagenes/img${cantidadErrores}.png`;
            var imagen = id("imagen");
            imagen.src = source;
        }

        if(cantidadErrores == 6){
            
            id("resultado").innerHTML = confirm("Perdiste!! Fin del Juego, la palabra era " + palabrita);
            gameOver();
        }else if(cantidadDeAciertos == palabrita.length){
            id("resultado").innerHTML = confirm("Ganaste, Felicidades!!");
            gameOver();
        }

        console.log("la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto);        
}    

function gameOver (){
    for(let i = 0; i < botonLetras.length; i++){
        botonLetras[i].disabled = true;
    }
    boton1.disabled = false;
}

gameOver();