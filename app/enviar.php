<?php
	$fecha = date("d/m/Y H:i:s");
	$nombre = $_REQUEST['nombre'] ;
	$apellidos = $_REQUEST['apellidos'] ;
	$email = $_REQUEST['email'] ;
	$confirmacion = "Estos son los datos que has introducido. Muchas gracias por tu participación:<br /><br />Nombre: $nombre <br />Apellidos: $apellidos2";
		mysql_connect ('servidor', 'usuario', 'contraseña') or die ('Error: ' . mysql_error());
		mysql_select_db ('nombre_bd');
	$query="INSERT INTO prueba (fecha, nombre, apellidos, email) VALUES ('$fecha', '$nombre', '$apellidos', '$email')";
		mysql_query($query) or die ('Error en la carga de datos');
		mail($email, "Asunto del mensaje", $confirmacion, "From: correo@dominio.xx");
		header("location:http://www.tudominio.es/respuesta.html")
?>