class Cancha{
    constructor(newId,newDireccion,newLat,newLng,newNombre,newTelefono){
        this._newId = newId;
        this._newDireccion = newDireccion;
        this._newLat = newLat;
        this._newLng = newLng;
        this._newTelefono = newTelefono;
        this._newNombre = newNombre;
    }
    get nombre(){
        return this._newNombre;
    }
    set nombre(newNombre){
        this._newNombre = newNombre;
    }
    //////
    get direccion(){
        return this._newDireccion;
    }
    set direccion(newDireccion){
        this._newDireccion = newDireccion;
    }
    ////
    get lat(){
        return this._newLat;
    }
    set lat(newLat){
        this._newLat = newLat;
    }
    ///
    get lng(){
        return this._newLng;
    }
    set lng(newLng){
        this._newLng = newLng;
    }
    ///
    get id(){
        return this._newId;
    }
    set id(newId){
        this._newId = newId;
    }
    //
    get telefono(){
        return this._newTelefono;
    }
    set telefono(newTelefono){
        this._newTelefono = newTelefono;
    }
}


