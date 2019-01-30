window.addEventListener('load',function(){
    var map;
    var btnPosicion = document.getElementById("btnPosicion");
    btnPosicion.addEventListener('click',()=>{
        let marker = new google.maps.Marker({
            position:miPosicion,
            map:map,
        })
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

    //Usando la geolocalización(nativo de JavaScript)
    let getLocation = ()=>{
        if(navigator.geolocation){
            //significa que el navegador tiene disponible la geolocalozación
            navigator.geolocation.getCurrentPosition((position)=>{
                miPosicion.lat = position.coords.latitude;
                miPosicion.lng = position.coords.longitude;
                initMap();
            },(error)=>{
                console.log("error",error);
            });
        }else{
            //el navegador no soporta geolocalización
            alert("Tu navegador no soporta geolocalización");
        }
    }

    getLocation();
        
});




