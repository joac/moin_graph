var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();



function init(){
    //init data
    var json =  {"id": "PyAr", "children": [{"id": "Chistes", "children": [{"id": "PyWars", "name": "PyWars"}], "name": "Chistes"}, {"id": "PreferenciasDelUsuario", "children": [{"id": "UserPreferences", "name": "UserPreferences"}, {"id": "NombreWiki", "name": "NombreWiki"}], "name": "PreferenciasDelUsuario"}, {"id": "Noticias/2005", "children": [{"id": "Noticias/Inmersion54", "name": "Noticias/Inmersion54"}, {"id": "NubIs", "name": "NubIs"}, {"id": "Noticias/FotoByMail", "name": "Noticias/FotoByMail"}, {"id": "LucioTorre", "name": "LucioTorre"}, {"id": "Proyectos/PythonPalm", "name": "Proyectos/PythonPalm"}, {"id": "Eventos/Reuniones/Reunion07", "name": "Eventos/Reuniones/Reunion07"}, {"id": "Eventos/Reuniones/Reunion08", "name": "Eventos/Reuniones/Reunion08"}, {"id": "PyAr", "name": "PyAr"}, {"id": "ListaDeCorreo", "name": "ListaDeCorreo"}, {"id": "Noticias/2004", "name": "Noticias/2004"}], "name": "Noticias/2005"}, {"id": "Noticias/2006", "children": [{"id": "Eventos/Reuniones/Reunion20", "name": "Eventos/Reuniones/Reunion20"}, {"id": "Eventos/Conferencias/CaFeConf2006", "name": "Eventos/Conferencias/CaFeConf2006"}, {"id": "PyAr", "name": "PyAr"}, {"id": "Eventos/Reuniones/Reunion19", "name": "Eventos/Reuniones/Reunion19"}, {"id": "Bandera/resultados", "name": "Bandera/resultados"}, {"id": "Eventos/Reuniones/ProximaReunion", "name": "Eventos/Reuniones/ProximaReunion"}, {"id": "ListaDeCorreo", "name": "ListaDeCorreo"}, {"id": "Eventos/Reuniones/Reunion18", "name": "Eventos/Reuniones/Reunion18"}, {"id": "AlejandroDavidWeil", "name": "AlejandroDavidWeil"}, {"id": "AlejandroJCura", "name": "AlejandroJCura"}, {"id": "FacundoBatista", "name": "FacundoBatista"}, {"id": "LucioTorre", "name": "LucioTorre"}, {"id": "MarianoDraghi", "name": "MarianoDraghi"}, {"id": "NubIs", "name": "NubIs"}, {"id": "Proyectos/AlocadoAlocador", "name": "Proyectos/AlocadoAlocador"}, {"id": "Eventos/Reuniones/Reunion16", "name": "Eventos/Reuniones/Reunion16"}, {"id": "Eventos/Sprints/WikipediaOffline1", "name": "Eventos/Sprints/WikipediaOffline1"}, {"id": "Eventos/Reuniones/Reunion15", "name": "Eventos/Reuniones/Reunion15"}, {"id": "ColectaDeHardware", "name": "ColectaDeHardware"}, {"id": "EtiquetaPyAr", "name": "EtiquetaPyAr"}, {"id": "Eventos/Reuniones/Reunion14", "name": "Eventos/Reuniones/Reunion14"}, {"id": "Eventos/Conferencias/PyCon2006", "name": "Eventos/Conferencias/PyCon2006"}, {"id": "Remeras", "name": "Remeras"}, {"id": "MoinMoin", "name": "MoinMoin"}, {"id": "Sugerencias", "name": "Sugerencias"}, {"id": "Recursos", "name": "Recursos"}, {"id": "Noticias/2005", "name": "Noticias/2005"}, {"id": "Noticias/2004", "name": "Noticias/2004"}], "name": "Noticias/2006"}, {"id": "Noticias/2007", "children": [{"id": "WhyFloss", "name": "WhyFloss"}, {"id": "PyAr", "name": "PyAr"}, {"id": "Eventos/Reuniones/Reunion23", "name": "Eventos/Reuniones/Reunion23"}, {"id": "Eventos/Reuniones/ProximaReunion", "name": "Eventos/Reuniones/ProximaReunion"}, {"id": "Noticias/GvRyBandera", "name": "Noticias/GvRyBandera"}, {"id": "Noticias/2006", "name": "Noticias/2006"}, {"id": "Noticias/2005", "name": "Noticias/2005"}, {"id": "Noticias/2004", "name": "Noticias/2004"}], "name": "Noticias/2007"}, {"id": "Noticias/2008", "children": [{"id": "PythonDay", "name": "PythonDay"}, {"id": "PyAr", "name": "PyAr"}, {"id": "Eventos/Reuniones/Reunion30", "name": "Eventos/Reuniones/Reunion30"}, {"id": "Eventos/Conferencias/8JRSL", "name": "Eventos/Conferencias/8JRSL"}, {"id": "RemerasV2", "name": "RemerasV2"}, {"id": "MiembrosDePyAr", "name": "MiembrosDePyAr"}, {"id": "LaBanderaDePyAr", "name": "LaBanderaDePyAr"}, {"id": "Eventos/Reuniones/ProximaReunion", "name": "Eventos/Reuniones/ProximaReunion"}, {"id": "Noticias/2007", "name": "Noticias/2007"}, {"id": "Noticias/2006", "name": "Noticias/2006"}, {"id": "Noticias/2005", "name": "Noticias/2005"}, {"id": "Noticias/2004", "name": "Noticias/2004"}], "name": "Noticias/2008"}, {"id": "Noticias/2009", "children": [{"id": "PyGame", "name": "PyGame"}, {"id": "PyAr", "name": "PyAr"}, {"id": "MoinMoin", "name": "MoinMoin"}, {"id": "Noticias/2008", "name": "Noticias/2008"}, {"id": "Noticias/2007", "name": "Noticias/2007"}, {"id": "Noticias/2006", "name": "Noticias/2006"}, {"id": "Noticias/2005", "name": "Noticias/2005"}, {"id": "Noticias/2004", "name": "Noticias/2004"}], "name": "Noticias/2009"}, {"id": "Eventos/Conferencias/8JRSL/Carteles", "children": [], "name": "Eventos/Conferencias/8JRSL/Carteles"}, {"id": "Proyectos/GeInE", "children": [{"id": "CategoryTemplate", "name": "CategoryTemplate"}], "name": "Proyectos/GeInE"}, {"id": "Noticias/2004", "children": [{"id": "PyAr", "name": "PyAr"}, {"id": "Noticias/ListadoDePIGs", "name": "Noticias/ListadoDePIGs"}, {"id": "Noticias/Python24", "name": "Noticias/Python24"}, {"id": "Noticias/AritmeticaDecimal", "name": "Noticias/AritmeticaDecimal"}], "name": "Noticias/2004"}, {"id": "ServidorPyAr/SCSI", "children": [{"id": "PyAr", "name": "PyAr"}, {"id": "SebastianBassi", "name": "SebastianBassi"}], "name": "ServidorPyAr/SCSI"}, {"id": "CharlasAbiertas2010/Introducci\u00f3nALaProgramaci\u00f3n", "children": [{"id": "CategoryVideo", "name": "CategoryVideo"}], "name": "CharlasAbiertas2010/Introducci\u00f3nALaProgramaci\u00f3n"}, {"id": "Recetario/GtkStockItems", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/GtkStockItems"}, {"id": "Ejercicios/RespuestaProblema1", "children": [{"id": "CategoryCategory", "name": "CategoryCategory"}], "name": "Ejercicios/RespuestaProblema1"}, {"id": "Recetario/AutocomplecionEnConsolaInteractiva", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/AutocomplecionEnConsolaInteractiva"}, {"id": "GtkLabelConColor", "children": [], "name": "GtkLabelConColor"}, {"id": "GtkDialog", "children": [], "name": "GtkDialog"}, {"id": "CompilarPython", "children": [], "name": "CompilarPython"}, {"id": "Bandera/cambiadas", "children": [], "name": "Bandera/cambiadas"}, {"id": "Proyectos", "children": [{"id": "juegos", "name": "juegos"}, {"id": "PyAr", "name": "PyAr"}, {"id": "Proyectos/GauchitoGil", "name": "Proyectos/GauchitoGil"}, {"id": "Proyectos/Caucho", "name": "Proyectos/Caucho"}, {"id": "Proyectos/STIM", "name": "Proyectos/STIM"}, {"id": "Proyectos/AlocadoAlocador", "name": "Proyectos/AlocadoAlocador"}, {"id": "Proyectos/UnManualEnCadaUniversidad", "name": "Proyectos/UnManualEnCadaUniversidad"}, {"id": "Proyectos/RevistaPythonComunidad", "name": "Proyectos/RevistaPythonComunidad"}, {"id": "Proyectos/UsoDePythonEnLaUniversidad", "name": "Proyectos/UsoDePythonEnLaUniversidad"}, {"id": "Proyectos/PythonPalm", "name": "Proyectos/PythonPalm"}, {"id": "Proyectos/GeInE", "name": "Proyectos/GeInE"}, {"id": "TurboGears", "name": "TurboGears"}, {"id": "CategoryProyectos", "name": "CategoryProyectos"}], "name": "Proyectos"}, {"id": "Eventos/Reuniones/ReleaseProcedure", "children": [{"id": "PyAr", "name": "PyAr"}, {"id": "ListaDeCorreo", "name": "ListaDeCorreo"}, {"id": "Eventos/Reuniones/ProximaReunion", "name": "Eventos/Reuniones/ProximaReunion"}, {"id": "Inicio", "name": "Inicio"}], "name": "Eventos/Reuniones/ReleaseProcedure"}, {"id": "GtkGladeHolaMundoOO", "children": [], "name": "GtkGladeHolaMundoOO"}, {"id": "PyCamp2009Resultados", "children": [{"id": "PyAr", "name": "PyAr"}, {"id": "RamiroMorales", "name": "RamiroMorales"}], "name": "PyCamp2009Resultados"}, {"id": "ListaDeCorreo/Migraci\u00f3n", "children": [], "name": "ListaDeCorreo/Migraci\u00f3n"}, {"id": "VPSs", "children": [], "name": "VPSs"}, {"id": "RemerasV2/LauBenech5", "children": [{"id": "RemerasV2", "name": "RemerasV2"}], "name": "RemerasV2/LauBenech5"}, {"id": "RemerasV2/LauBenech4", "children": [{"id": "RemerasV2", "name": "RemerasV2"}, {"id": "AlejandroJCura", "name": "AlejandroJCura"}], "name": "RemerasV2/LauBenech4"}, {"id": "RemerasV2/LauBenech6", "children": [{"id": "RemerasV2", "name": "RemerasV2"}, {"id": "LauBenech", "name": "LauBenech"}], "name": "RemerasV2/LauBenech6"}, {"id": "RemerasV2/LauBenech1", "children": [{"id": "RemerasV2", "name": "RemerasV2"}], "name": "RemerasV2/LauBenech1"}, {"id": "RemerasV2/LauBenech3", "children": [{"id": "RemerasV2", "name": "RemerasV2"}, {"id": "RicardoKirkner", "name": "RicardoKirkner"}], "name": "RemerasV2/LauBenech3"}, {"id": "dise\u00f1o", "children": [{"id": "Remeras", "name": "Remeras"}, {"id": "CategoryCategory", "name": "CategoryCategory"}], "name": "dise\u00f1o"}, {"id": "GtkHolaMundoOO", "children": [{"id": "GtkHolaMundo", "name": "GtkHolaMundo"}], "name": "GtkHolaMundoOO"}, {"id": "QtMultiThread", "children": [], "name": "QtMultiThread"}, {"id": "HGTTP/Disertantes", "children": [], "name": "HGTTP/Disertantes"}, {"id": "Proyectos/RevistaPythonComunidad/PET2/InfoPython", "children": [], "name": "Proyectos/RevistaPythonComunidad/PET2/InfoPython"}, {"id": "Proyectos/RevistaPythonComunidad/Release1", "children": [], "name": "Proyectos/RevistaPythonComunidad/Release1"}, {"id": "Recetario/ExtraerMails", "children": [{"id": "JuanjoConti", "name": "JuanjoConti"}], "name": "Recetario/ExtraerMails"}, {"id": "PyCamp/2011/QueLlevar", "children": [{"id": "CategoryPyCamp", "name": "CategoryPyCamp"}], "name": "PyCamp/2011/QueLlevar"}, {"id": "WxPython", "children": [{"id": "CategoryCategory", "name": "CategoryCategory"}], "name": "WxPython"}, {"id": "Web2Py", "children": [{"id": "AppAdmin", "name": "AppAdmin"}], "name": "Web2Py"}, {"id": "aLetras", "children": [{"id": "CesarPortela", "name": "CesarPortela"}], "name": "aLetras"}, {"id": "UsuariosBuscandoHosting", "children": [{"id": "AlejandroDavidWeil", "name": "AlejandroDavidWeil"}, {"id": "GustavoSalvini", "name": "GustavoSalvini"}], "name": "UsuariosBuscandoHosting"}, {"id": "PyConArgentina/2009/AlojamientoCompartido", "children": [], "name": "PyConArgentina/2009/AlojamientoCompartido"}, {"id": "Recetario/PythonVersionCheck", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/PythonVersionCheck"}, {"id": "Xdg-Sudo", "children": [], "name": "Xdg-Sudo"}, {"id": "GtkRichText", "children": [{"id": "TextView", "name": "TextView"}, {"id": "TextBuffer", "name": "TextBuffer"}], "name": "GtkRichText"}, {"id": "juegos/TypusPocus", "children": [{"id": "PyAr", "name": "PyAr"}], "name": "juegos/TypusPocus"}, {"id": "LucioTorre", "children": [{"id": "CategoryHomepage", "name": "CategoryHomepage"}], "name": "LucioTorre"}, {"id": "ComoLevantarUnServidorHttpMultithread", "children": [], "name": "ComoLevantarUnServidorHttpMultithread"}, {"id": "Recetario/EstilosRst2Pdf", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/EstilosRst2Pdf"}, {"id": "Recetario/ProgressbarUrllib2", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/ProgressbarUrllib2"}, {"id": "Eventos/PythonDay3", "children": [], "name": "Eventos/PythonDay3"}, {"id": "Remeras", "children": [{"id": "PyAr", "name": "PyAr"}, {"id": "RemerasV2", "name": "RemerasV2"}, {"id": "PabloZiliani", "name": "PabloZiliani"}, {"id": "LucioTorre", "name": "LucioTorre"}, {"id": "MarianoDraghi", "name": "MarianoDraghi"}, {"id": "FacundoBatista", "name": "FacundoBatista"}, {"id": "NubIs", "name": "NubIs"}], "name": "Remeras"}, {"id": "HGTTP/Logistica", "children": [{"id": "WiFi", "name": "WiFi"}], "name": "HGTTP/Logistica"}, {"id": "Recetario/SaberSiNlibreriaEstaInstalada", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/SaberSiNlibreriaEstaInstalada"}, {"id": "Recetario/QtExtraerTextoRecurso", "children": [{"id": "CategoryRecetas", "name": "CategoryRecetas"}], "name": "Recetario/QtExtraerTextoRecurso"}, {"id": "Snippets", "children": [{"id": "MarianoGuerra", "name": "MarianoGuerra"}], "name": "Snippets"}, {"id": "ColectaDeHardware", "children": [{"id": "NubIs", "name": "NubIs"}, {"id": "AlejandroJCura", "name": "AlejandroJCura"}, {"id": "LucioTorre", "name": "LucioTorre"}, {"id": "DanielMoisset", "name": "DanielMoisset"}], "name": "ColectaDeHardware"}, {"id": "Eventos/Reuniones/Reunion27", "children": [{"id": "FacundoBatista", "name": "FacundoBatista"}, {"id": "PabloZiliani", "name": "PabloZiliani"}, {"id": "ManuelKaufmann", "name": "ManuelKaufmann"}, {"id": "MarianoReingart", "name": "MarianoReingart"}, {"id": "RicardoKirkner", "name": "RicardoKirkner"}, {"id": "AlejandroJCura", "name": "AlejandroJCura"}, {"id": "LeitoMonk", "name": "LeitoMonk"}, {"id": "PabloCarballo", "name": "PabloCarballo"}, {"id": "MarianoDraghi", "name": "MarianoDraghi"}, {"id": "LucasDevescovi", "name": "LucasDevescovi"}, {"id": "MarioZorz", "name": "MarioZorz"}, {"id": "JohnLenton", "name": "JohnLenton"}, {"id": "MauroMackinze", "name": "MauroMackinze"}, {"id": "RobertoRodriguez", "name": "RobertoRodriguez"}, {"id": "SebastianBassi", "name": "SebastianBassi"}, {"id": "GuilloGonzo", "name": "GuilloGonzo"}, {"id": "JavierKragenSitaker", "name": "JavierKragenSitaker"}, {"id": "JavierBurroni", "name": "JavierBurroni"}, {"id": "PyAr", "name": "PyAr"}, {"id": "PyCon", "name": "PyCon"}, {"id": "WiFi", "name": "WiFi"}, {"id": "PyCamp", "name": "PyCamp"}], "name": "Eventos/Reuniones/Reunion27"}, {"id": "Eventos/Reuniones/Reunion26", "children": [{"id": "LosCocos", "name": "LosCocos"}, {"id": "PyAr", "name": "PyAr"}, {"id": "DineroMail", "name": "DineroMail"}, {"id": "PayPal", "name": "PayPal"}, {"id": "PyCamp", "name": "PyCamp"}, {"id": "PyCon", "name": "PyCon"}, {"id": "PyWeek", "name": "PyWeek"}], "name": "Eventos/Reuniones/Reunion26"}], "name": "PyAr"} ;
    //end
    
    //init RGraph
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        interpolation: "polar",
        levelDistance: 250,
        injectInto: 'infovis',
        //Optional: create a background canvas that plots
        //concentric circles.
        background: {
          CanvasStyles: {
            strokeStyle: '#555'
          }
        },
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
          enable: true,
          panning: true,
          zooming: 10
        },
        //Set Node and Edge styles.
        Node: {
            color: '#ddeeff'
        },
        Edge: {
          color: '#C17878',
          lineWidth:1.0
        },

        onBeforeCompute: function(node){
        },
        onAfterCompute: function(){
        },
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                rgraph.onClick(node.name);
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

          if (node._depth <= 1) {
              style.fontSize = "0.4em";
              style.color = "#ccc";
          } else if(node._depth == 2){
              style.fontSize = "0.6em";
              style.color = "#494949";
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data
    rgraph.loadJSON(json);
    //trigger small animation
    rgraph.graph.eachNode(function(n) {
      var pos = n.getPos();
      pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
      modes:['polar'],
      duration: 2000
    });
    //end
    //append information about the root relations in the right column
}
