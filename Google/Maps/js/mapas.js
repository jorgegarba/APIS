window.addEventListener('load',function(){
    /**
     * Firebase
     */
    firebase.initializeApp(config);
    /**
     * Variables de Mapas
     */
    var map;
    var mapaLatLng;
    var marker;
    var markerLatLng;
    var btnPosicion = document.getElementById("btnPosicion");
    var btnBorrarPosicion = document.getElementById("btnBorrarPosicion");
    var btnGetCanchas = document.getElementById("btnGetCanchas");
    var divCanchas = document.getElementById("canchas");
    var btnCrearCancha = document.getElementById("btnCrearCancha");
    var inputLatitud = document.getElementById("inputLatitud");
    var inputLongitud = document.getElementById("inputLongitud");

    var canchasFirebase = [];
    var marcadoresFirebase = [];

    var cargando = document.createElement("img");
    cargando.setAttribute("src","./img/cargando.gif")

    divCanchas.append(cargando);

    //1. crear la referencia al nodo en firebase
    var referencia = firebase.database().ref('canchitas');

    btnGetCanchas.addEventListener('click',()=>{

        //2. usar funcion de obtención de registros [on,once]
        //ONCE: Trae la data una sola vez
        // referencia.once('value',(data)=>{
        //     llenarCanchas(data);
        // });
        //ON: Trae la data cada vez que ésta es alterada
        referencia.on('value',(data)=>{
            llenarCanchas(data);
        });
    });

    btnPosicion.addEventListener('click',()=>{
        marker = new google.maps.Marker(
            {
                // position:miPosicion,
                position:{lat:miPosicion.lat,lng:miPosicion.lng},
                map:map,
                draggable:true,
                icon: './img/marcador.png'
            }
        );
    });

    btnBorrarPosicion.addEventListener('click',()=>{
        marker.setMap(null);
    });


    var div = document.getElementById('map');

    var miPosicion = {
        lat:0,
        lng:0
    }

    function initMap() {
        map = new google.maps.Map(div, {
            center: miPosicion,
            zoom: 13
        });
    }
    function initMapLatLng(){
        mapaLatLng = new google.maps.Map(document.getElementById('mapaLatLng'), {
            center: miPosicion,
            zoom: 13
        });
        mapaLatLng.addListener('click',(coors)=>{
          if(markerLatLng){
              markerLatLng.setMap(null);
          }

          inputLatitud.setAttribute("value",coors.latLng.lat());
          inputLongitud.setAttribute("value",coors.latLng.lng());

          markerLatLng = new google.maps.Marker(
            {
              position:coors.latLng,
              map:mapaLatLng,
              icon: './img/marcador.png'
            });

        });
    }


    //Usando la geolocalización(nativo de JavaScript)
    let getLocation = ()=>{
        if(navigator.geolocation){
            //significa que el navegador tiene disponible la geolocalozación
            navigator.geolocation.getCurrentPosition((position)=>{
              //en este punto, se solicita al usuario permitir conocer su ubicación
                miPosicion.lat = position.coords.latitude;
                miPosicion.lng = position.coords.longitude;
                initMap();
                initMapLatLng();
            },(error)=>{
                console.log("error",error);
            });
        }else{
            //el navegador no soporta geolocalización
            alert("Tu navegador no soporta geolocalización");
        }
    }

    getLocation();

    let llenarCanchas = (data)=>{
        //data es el arreglo de elementos tomados de Firebase
        if(data){
            divCanchas.innerHTML = "";
            //recorremos el arreglo de canchas de firebase
            //representado en el objeto fila en cada iteración
            data.forEach((fila)=>{
                //agregando cada cancha mapeada en el objeto Cancha
                //al arreglo canchasFirebase
                canchasFirebase.push(new Cancha(fila.key,
                                                fila.val().direccion,
                                                fila.val().lat,
                                                fila.val().lng,
                                                fila.val().nombre,
                                                fila.val().telefono));
            });

            /**
             * Creando la tabla de canchas
             */

             let tabla = document.createElement("table");
             tabla.setAttribute('class','table');
             canchasFirebase.forEach((cancha)=>{

                let tr = document.createElement("tr");
                let tdId = document.createElement("td");
                tdId.innerHTML = cancha.id;
                let tdNombre = document.createElement("td");
                tdNombre.innerHTML = cancha.nombre;
                tr.append(tdId,tdNombre);
                tabla.append(tr);

                //llenando marcadores en el mapa
                //creamos un marcador
                let marcadorTmp = new google.maps.Marker({
                    position:{lat:cancha.lat,lng:cancha.lng},
                    map:map,
                    icon: './img/marcador.png'
                });

                marcadoresFirebase.push(marcadorTmp);


             });
             divCanchas.append(tabla);
        }else{
            divCanchas.innerHTML = "<h2>No hay canchitas</h2>";
        }
    }

    btnCrearCancha.addEventListener('click',()=>{
        //generando un ID nuevo para la cancha
        const nuevaKey = referencia.push().key;
        //funcion set en firebase
        //set, asigna valores a un determinado nodo o child o ref,
        //set toma la data de un JSON
        referencia.child(nuevaKey).set({
            direccion:$('#inputDireccion').val(),
            nombre:$('#inputNombre').val(),
            telefono:$('#inputTelefono').val(),
            lat:markerLatLng.getPosition().lat(),
            lng:markerLatLng.getPosition().lng(),
        },(error)=>{
          if(error){
            alert("Ups!, No se pudo crear la canchita");
          }
        });
    })

});
