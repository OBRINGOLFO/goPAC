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
        let div_fecha = document.getElementById("fecha_escritorio");
        if(div_fecha != null){
            div_fecha.innerHTML = d.toLocaleString("es-MX", options);
        }else{
            clearInterval(window.statusDATE);
        }
    }    
    /** ****************************************************** **/
    function TimerSession(){
        $.ajax({
            type: 'POST',
            url: '/index.php?goExec=Index&goAcc=get_sesionTIME',
            success:function(data){
                //console.log(data);
                if((data.restante == 60)){ //Ultimo minuto
                    var xHTML = '<div id="dlg_SESSION_EXPIRE" class="easyui-dialog" title="Tiempo de inactividad detectado" style="width: 350px; height: 150px;"';
                        xHTML += 'data-options="iconCls: \'fas fa-shield-alt\', buttons: \'#cmds_SESSION_EXPIRE\', resizable: false, modal: true, closed: false, cache: false, closable: false">';
                        xHTML += '<center>Hemos detectado que no usas el sistema por casi 10 minutos, en <b>menos de un minuto</b> se cerrará por seguridad.</center>';
                        xHTML += '</div>';
                        xHTML += '<div id="cmds_SESSION_EXPIRE">';
                        xHTML += '<a id="cmd_MASTIEMPO" href="#">Más tiempo</a>';
                        xHTML += '<a id="cmd_CERRARSESION" href="#">Cerrar sesión (00)</a>';
                        xHTML += '</div>';
                    document.body.insertAdjacentHTML('afterbegin', xHTML);
                    $('#dlg_SESSION_EXPIRE').dialog();
                    $('#cmd_MASTIEMPO').linkbutton({
                        iconCls: 'icon-retweet',
                        width: '49%',
                        height: 32
                    });
                    $('#cmd_CERRARSESION').linkbutton({
                        iconCls: 'icon-right-from-bracket',
                        width: '49%',
                        height: 32
                    });
                }else if((data.restante > 1) && (data.restante < 60)){ //Menos de 1 minuto para cerrar
                    //$("#cmd_CERRARSESION").text("Cerrar sesión ("+data.restante+")");
                    $('#cmd_CERRARSESION').linkbutton({text:'Cerrar sesión ('+data.restante+')'});
                }else if(data.restante < 1){ //Tiempo agotado
                    clearInterval(window.TimerSESSION);
                    goRedirect("Usuarios", "logedout");
                }
                $('#cmd_MASTIEMPO').bind('click', function(){
                    $.ajax({
                        type: 'POST',
                        url: '/index.php?goExec=Index&goAcc=set_sesionTIME',
                        success:function(data){
                            $('#dlg_SESSION_EXPIRE').dialog('close');
                            $('#dlg_SESSION_EXPIRE').remove();
                            $('#cmd_MASTIEMPO').remove();
                            $('#cmd_CERRARSESION').remove();
                        }
                    });                    
                });
                $('#cmd_CERRARSESION').bind('click', function(){
                    clearInterval(window.TimerSESSION);
                    goRedirect("Usuarios", "logedout");
                });
            
            }
        });        
    }
    /** ****************************************************** **/
    /** ****************************************************** **/