
(function() {
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
        //init RGraph
        var rgraph = new $jit.RGraph({
            //Where to append the visualization
            interpolation: "polar",
            levelDistance: 200,
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
                style.fontSize = 1/node._depth + "em";

              if (node._depth <= 1) {
                  style.color = "#ccc";
              } else if(node._depth == 2){
                  domElement.style.alpha = 0;
              } else if (node._depth > 5){
                    node.exist = false; 
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
})

    var labelType, useGradients, nativeTextSupport, animate;

    (function() {
      var ua = navigator.userAgent,
          iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
          typeOfCanvas = typeof HTMLCanvasElement,
          nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
          textSupport = nativeCanvasSupport 
            && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
      labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
      nativeTextSupport = labelType == 'Native';
      useGradients = nativeCanvasSupport;
      animate = !(iStuff || !nativeCanvasSupport);
    })();

    var Log = {
      elem: false,
      write: function(text){}
    };


    function init(){
        //init data
    var infovis = document.getElementById('infovis');
        var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
        var ht = new $jit.Hypertree({
          injectInto: 'infovis',
          radius : "600",
          Node: {
              dim: 2,
              color: "#FFF"
          },
          Edge: {
              lineWidth: 0.2,
              color: "#aaa"
          },
          Navigation: {
            enable: true,
            panning: true,
            zooming: 50
         },
          onBeforeCompute: function(node){
          },
          onCreateLabel: function(domElement, node){
              domElement.innerHTML = node.name;
              jQuery(domElement).click(function(event) {
                  event.stopPropagation()
                  jQuery.getJSON("/node/" + node.name, function(response) {
                      ht.op.sum(response, {
                          type: "fade:con"
                      });
                      ht.onClick(node.id);
                      curr_element = document.getElementById("header");
                      curr_element.innerHTML = "<h1><a target='_blank' href='http://python.org.ar/pyar/" + node.name + "'>" + node.name + "</a></h1>"; 
                  });
              });
          },
          onPlaceLabel: function(domElement, node){
              var style = domElement.style;
              style.cursor = 'pointer';
              if(node._depth == 0) {
                  var element = jQuery(domElement)
                  if(element.is(":visible")) {
                      jQuery(domElement).animate({fontSize: "20px"}, 300)
                  }
              }
              if (node._depth == 1) {
                  style.fontSize = "0.8em";
                  var color = style.color;
                  var zIndex = style.zIndex;
                  jQuery(domElement).hover(function() {
                      style.color = "#f00"
                      style.backgroundColor = "#000"
                      style.zIndex = 1000;
                      jQuery(this).stop().animate({fontSize: "20px"}, 200)
                  }, function() {
                      style.color = color;
                      style.background = "none";
                      style.zIndex = zIndex;
                      jQuery(this).stop().animate({fontSize: "0.8em"}, 200)
                  });

              } else if (node._depth > 1) {
                  var color = style.color;
                  style.fontSize = "0.7em";
                  jQuery(domElement).hover(function() {
                      style.color = "#f00"
                      jQuery(this).stop().animate({fontSize: "15px"}, 200)
                  }, function() {
                      style.color = color;
                      jQuery(this).stop().animate({fontSize: "0.7em"}, 200)
                  });

              }

              var left = parseInt(style.left);
              var w = domElement.offsetWidth;
              style.left = (left - w / 2) + 'px';
          },
          
          onAfterCompute: function(){
          }
        });
        //load JSON data.
        ht.loadJSON(json);
        //compute positions and plot.
        ht.refresh();
        //end
        ht.controller.onAfterCompute();
    }
