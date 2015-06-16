'use strict';
$(document).ready(function () {

    //------------------CODIGO PARA VALIDATE-----------    

    var $requerido = '<span class="glyphicon glyphicon-asterisk">';

    $('#frm_validar').validate({
        rules: {
            nombre: {
                required: true,
                minlength: 4

            },
            apellidos: {
                required: true
            },
            telefono: {
                required: true,
                minlength: 9
            },
            email: {
                email: true,
                required: true,
                remote: "http://localhost/validar/email.php"
            },
            email2: {
                equalTo: "#email"
            },
            nif: {
                nifES: true,
                required: true,
                remote: "http://localhost/validar/dni.php"
            },
            cif: {
                cifES: true,
                required: true
            },
            iban: {
                required: true,
                iban: true
            },
            usuario: {
                minlength: 4
            },
            cp: {
                required: true,
                digits: true
            },
            pais: {
                required: true,
                lettersonly: true
            },
            password: {
                required: true
            },
            password2: {
                equalTo: "#password"
            }                
        },
        messages: {
            nombre: {
                required: "Debes escribir tu nombre",
                minlength: "Nombre demasiado corto"
            },
            apellidos: {
                required: "Debes escribir tus apellidos"
            },
            telefono: {
                required: "Debes escribir tu teléfono",
                minlength: "Escribe un teléfono válido"
            },
            email: {
                email: "El correo electronico no es valido",
                required: "Escribe tu correo electrónico"
            },
            email2: {
                email: "El correo electronico no es valido",
                required: "Escribe tu correo electrónico",
                equalTo: "Introduce el mismo email"
            },
            iban: {
                required: "Completa el código IBAN",
                minlength: "Introduce un nombre de usuario de al menos 4 letras"
            },
            cp: {
                required: "Completa el código postal",
                digits: "Introduce sólo números"
            },
            pais: {
                required: "Completa el campo"
            },
            password: {
                required: "Introduce una contraseña"
            },
            password2: {
                equalTo: "Introduce la misma contraseña"
            }

        },
        submitHandler: function (form) {

            $('#myModal').modal('show');
            
             $('#aceptar').click(function(){
                form.submit();
             });
            //$(form).submit();
        }




    });


    $("input:radio[name=demandante]").click(function () {
        completaDemandante('input:radio[name=demandante]:checked');
    });


    $("input[name=nombre]").keyup(completaNombre);
    $("input[name=apellidos]").keyup(completaNombre);

    $("input[name=email]").keyup(function () {
        var user = $(this).val();
        var nombre = user.split('@')[0];
        $("input[name=usuario]").val(nombre);
    });


    $('select#pagos').on('change', function () {
        var valor = $(this).val();
        if (valor == 1) {
            $("#cuota").html("50 euros");
        }
        if (valor == 2) {
            $("#cuota").html("140 euros");
        }
        if (valor == 3) {
            $("#cuota").html("550 euros");
        }
    });



    function completaNombre() {
        var nombre = $("input[name=nombre]").val() + " " + $("input[name=apellidos]").val();
        $("input[name=nombre_empresa]").val(nombre);
    }

    function completaDemandante(objeto) {
        //alert($(objeto).val());                
        if ($(objeto).val() == 'particular') {
            $("label[for=nif]").text("NIF ").append($requerido);
            $("label[for=nombre_empresa]").text("Nombre");
            $("input[name=nif]").removeClass("hide");
            $("input[name=cif]").addClass("hide");
        } else {
            $("label[for=nif]").text("CIF ").append($requerido);
            $("label[for=nombre_empresa]").text("Empresa ").append($requerido);
            $("input[name=cif]").removeClass("hide");
            $("input[name=nif]").addClass("hide");
            //$("label[for=nif]").attr('for','cif');
        }
    }

    $("input[name=cp]").change(completaLocalidad);

    function completaLocalidad() {
        //PASO EL CP DEL DOM AL FICHERO PHP
        if ($(this).val().length == 4) {

            var cp = 0 + $(this).val();
            $(this).val(cp);
        } else {

            var cp = $(this).val();
        }
        $.ajax({
            dataType: "json",
            url: "http://localhost/validar/validar.php",
            type: 'POST',
            async: true,
            data: {
                'parametro1': cp
            }
        }).done(function (provincias) {
            //                     DEVUELVO LA CONSULTA EN UN JSON
            $.each(provincias, function (i, provincia) {
                $("input[name=localidad]").val(provincia.Municipio);
                $("input[name=provincia]").val(provincia.Provincia);

            });
        });
    }

    $('#password').complexify({}, function (valid, complexity) {
        var progressBar = $('#complexity-bar');

        progressBar.toggleClass('progress-bar-success', valid);
        progressBar.toggleClass('progress-bar-danger', !valid);
        progressBar.css({
            'width': complexity + '%'
        });
    });







});