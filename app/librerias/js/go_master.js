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
    function status_getFecha() {
        const d = new Date();
        var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric",  minute: "numeric", hour12: "false" };
        document.getElementById("fecha_escritorio").innerHTML = d.toLocaleString("es-MX", options);
    }    
    /** ****************************************************** **/
    /** ****************************************************** **/
    /** ****************************************************** **/