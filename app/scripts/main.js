 'use strict';
$(document).ready(function () {
           
   
//-----------------CODIGO PARA VALIDATE---------- 


// Dr. Alfonso dice: 
			//"Mirate antes: http://jqueryvalidation.org/"  
   

   $('#frm_validar').validate(
       {            
           rules: {
               nombre: {
                   required: true,
                   minlength:4
                   
               }, 
               apellidos: {
                   required: true,
                   remote: "http://localhost:9000"
               },
               edad: {
                   required: true,
                   min:1,
                   max:99                    
               },
               email: {
                   email: true,
                   required: true,
                   remote: "php/validar_email_db.php"
               },
               email2: {
                   equalTo: "#email"
               }              
           },
           messages: {
               nombre: {
                   required: "Debes escribir tu nombre"
               },
               apellidos: {
                   required: "Debes escribir tus apellidos"
               },                
               edad: {
                   required: "Escribe una edad",
                   min:"Escribe una edad correcta",
                   max:"Escribe una edad correcta"
               },
               email: {
                   email: "El correo electronico no es valido",
                   required: "Escribe tu correo electrónico"
               },
               email2: {
                   email: "El correo electronico no es valido",
                   required: "Escribe tu correo electrónico",
                   equalTo: "Introduce el mismo email"
               }
           }
       });
   

   

   
   
   
   
   
   
   
});