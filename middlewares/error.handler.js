
//Creamos función que nos hará llegar a un middleware de tipo error:

function logsError (error,req,res,next){
  console.error(error) //mostrar el error en servidor para poder monitorearlo
  next(error) //importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal

}

// Crear formato para devolverlo al cliente que se complementa con la función anterior:
function errorHandler(error,req,res,next){ //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  res.status(500).json({//indicar que el error es estatus 500 Internal Server Error
    message:error.message, //mostrar al cliente el mensaje de error
    stack:error.stack //mostrar info del error
  })
}

// Creo función para manipular los errores utilizando la librería boom
function boomErrorHandler(error,req,res,next){
  //Identifico si el error es de tipo boom
  if(error.isBoom){ // Pregunto si el error contiene la propiedad isBoom entra en la condición. Esta propiedad siempre la generan los errores de tipo boom
    const {output} = error // Obtengo la información que trae el error
    res.status(output.statusCode).json(output.payload) // payload contiene la cadena con la respuesta.
  }else{
    next(error) // Le indico que en caso de que el error no sea de tipo error ejecute un error de tipo normal
  }

}
module.exports = {logsError,errorHandler,boomErrorHandler} //exportarlo como modulo
