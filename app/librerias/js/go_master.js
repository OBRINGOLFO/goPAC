/**
 * @autor Rixio Danilo Iguarán Chourio.
 * @cédula-profesional 12196442
 * @correo-eletrónico atencion.clientes@obringolfo.com
 * @denominacion OBRAS INFORMÁTICAS DEL GOLFO
 * @empresa OBRINGOLFO S.A.S. DE C.V.
 * @proyecto  goPAC.
 * @copyright 2021
 */


    /** ****************************************************** **/
    function goRedirect(controlador, accion){
        window.location.replace("/index.php?goExec=" + controlador + "&goAcc=" + accion);
    }
    /** ****************************************************** **/
    function goTasaW(tasa){
        var MyV = $(window).width();
        return ((MyV * tasa)/100);
    }
    /** ****************************************************** **/
    function goTasaH(tasa){
        var MyH = $(window).height();
        return ((MyH * tasa)/100);
    }
    /** ****************************************************** **/
    function statusMSG(msg){
        $("#mensaje_escritorio").html(msg);
    }
    /** ****************************************************** **/
    function statusMSG_clear(){
        $("#mensaje_escritorio").html('');
    }
    /** ****************************************************** **/
    function show_XProgreso(){
        var dlg = $.messager.progress({
            border: 'thin',
            msg: '<center>Procesando, espere...</center><br><img src="/app/librerias/img/loading1.gif" class="mx-auto d-block" style="height:48px">'
        });
        $.messager.progress('bar').hide();
        dlg.dialog('resize');
    }   
    /** ****************************************************** **/
    function status_getFecha() {
        const d = new Date();
        var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric",  minute: "numeric", hour12: "false" };
        let div_fecha = document.getElementById("fecha_escritorio");
        if(div_fecha != null){
            div_fecha.innerHTML = d.toLocaleString("es-MX", options);
        }else{
            clearInterval(window.statusDATE);
        }
    }    
    /** ****************************************************** **/
    $.extend($.fn.combobox.methods, {
        appendItem: function(jq, item){
            return jq.each(function(){
                var state = $.data(this, 'combobox');
                var opts = state.options;
                var items = $(this).combobox('getData');
                items.push(item);
                $(this).combobox('panel').append(
                    '<div id="' + state.itemIdPrefix+'_'+(items.length-1) + '"  class="combobox-item">' +
                    (opts.formatter ? opts.formatter.call(this, item) : item[opts.textField]) +
                    '</div>'
                )
            })
        }
    })
    /** ****************************************************** **/
    $.extend($.fn.textbox.defaults.rules, {
        satRFC: {
            validator: function(value, param){
                return rfcValido(value, param[0]);
            },
            message: 'Ingrese un RFC válido.'
        },
        renapoCURP: {
            validator: function(value, param){
                return curpValida(value);
            },
            message: 'Ingrese una CURP válida.'
        }
    });








    /** 
     * Función para validar un RFC 
     * Devuelve el RFC sin espacios ni guiones si es correcto
     * Devuelve false si es inválido
     * (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
     * ****************************************************** **/
    function rfcValido(rfc, aceptarGenerico = true) {
        const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        var   validado = rfc.match(re);

        if (!validado)  //Coincide con el formato general del regex?
            return false;

        //Separar el dígito verificador del resto del RFC
        const digitoVerificador = validado.pop(),
            rfcSinDigito      = validado.slice(1).join(''),
            len               = rfcSinDigito.length,

        //Obtener el digito esperado
            diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
            indice            = len + 1;
        var   suma,
            digitoEsperado;

        if (len == 12) suma = 0
        else suma = 481; //Ajuste para persona moral

        for(var i=0; i<len; i++)
            suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
        digitoEsperado = 11 - suma % 11;
        if (digitoEsperado == 11) digitoEsperado = 0;
        else if (digitoEsperado == 10) digitoEsperado = "A";

        //El dígito verificador coincide con el esperado?
        // o es un RFC Genérico (ventas a público general)?
        if ((digitoVerificador != digitoEsperado)
        && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
            return false;
        else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
            return false;
        return rfcSinDigito + digitoVerificador;
    }    

    /** 
     * Función para validar la CURP 
     * Devuelve la CURP sin espacios ni guiones si es correcto
     * Devuelve false si es inválido
     * (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
     * ****************************************************** **/
    function curpValida(curp) {
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);
        
        if (!validado)  //Coincide con el formato general?
            return false;
        
        //Validar que coincida el dígito verificador
        function digitoVerificador(curp17) {
            //Fuente https://consultas.curp.gob.mx/CurpSP/
            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                lngSuma      = 0.0,
                lngDigito    = 0.0;
            for(var i=0; i<17; i++)
                lngSuma= lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
            lngDigito = 10 - lngSuma % 10;
            if(lngDigito == 10)
                return 0;
            return lngDigito;
        }
        if (validado[2] != digitoVerificador(validado[1])) 
            return false;
            
        return true; //Validado
    }
     /** ****************************************************** **/
    function check_privilegios(_modulo, _funcion){
        //VERIFICANDO PERMISOS DEL USUARIO
        var xData = { modulo: _modulo, funcion: _funcion };
        return $.ajax({
            type: 'POST',
            url: '/index.php?goExec=Usuarios&goAcc=check_privilegio',
            data: xData,
            cache: false,            
            success:function(respuesta){
                //console.log('respuesta: '+respuesta);   
            }
        });
    }     
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/