<?php
header("access-control-allow-origin: *");
/* Descomentaríamos la siguiente línea para mostrar errores de php en el fichero: */
// ini_set('display_errors', '1');
/* Definimos los parámetros de conexión con la bbdd: */
$dbinfo = "mysql:dbname=validacion;host=localhost";
$user = "root";
$pass = "root";
//Nos intentamos conectar:
try {
    /* conectamos con bbdd e inicializamos conexión como UTF8 */
    $db = new PDO($dbinfo, $user, $pass);
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}
/* Para hacer debug cargaríamos a mano el parámetro, descomentaríamos la siguiente línea: */
//$_REQUEST['email'] = "pepito@hotmail.com";
if (isset($_REQUEST['nombre'])) {
    /* La línea siguiente la podemos descomentar para ver desde firebug-xhr si se pasa bien el parámetro desde el formulario */
    //echo $_REQUEST['email'];
    $email = $_REQUEST['nombre'];
    $sql = $db->prepare("SELECT * FROM usuarios WHERE nombre=?");
    $sql->bindParam(1, $email, PDO::PARAM_STR);
    $sql->execute();
    /* Ojo... PDOStatement::rowCount() devuelve el número de filas afectadas por la última sentencia DELETE, INSERT, o UPDATE 
     * ejecutada por el correspondiente objeto PDOStatement.Si la última sentencia SQL ejecutada por el objeto PDOStatement 
     * asociado fue una sentencia SELECT, algunas bases de datos podrían devolver el número de filas devuelto por dicha sentencia. 
     * Sin embargo, este comportamiento no está garantizado para todas las bases de datos y no debería confiarse en él para 
     * aplicaciones portables.
     */
    $valid = 'true';
    if ($sql->rowCount() > 0) {
        $valid= '"Nombre ya registrado"';
    } else {
       $valid='"Nombre disponible"';
    }
}
$sql=null;
$db = null;
echo $valid;
?>
