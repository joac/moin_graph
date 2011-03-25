
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
      //I'm setting this based on the fact that ExCanvas provides text support for IE
      //and that as of today iPhone/iPad current text support is lame
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
        
        //init Hypertree
        var ht = new $jit.Hypertree({
          //id of the visualization container
          injectInto: 'infovis',
          radius : "900",
          //canvas width and height
          //Change node and edge styles such as
          //color, width and dimensions.
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
            zooming: 30
         },
          onBeforeCompute: function(node){
              Log.write("centering");
          },
          //Attach event handlers and add text to the
          //labels. This method is only triggered on label
          //creation
          onCreateLabel: function(domElement, node){
              domElement.innerHTML = node.name;
              $jit.util.addEvent(domElement, 'click', function () {
                  ht.onClick(node.id);
              });
          },
          //Change node styles when labels are placed
          //or moved.
          onPlaceLabel: function(domElement, node){
              var style = domElement.style;
              style.display = '';
              style.cursor = 'pointer';
              if (node._depth <= 1) {
                  style.fontSize = "0.8em";
                  style.color = "#ddd";

              } else if(node._depth > 2){
                  style.fontSize = "0.7em";
                  style.color = "#555";

              } else {
                  style.display = 'none';
              }

              var left = parseInt(style.left);
              var w = domElement.offsetWidth;
              style.left = (left - w / 2) + 'px';
          },
          
          onAfterCompute: function(){
              Log.write("done");
              
              //Build the right column relations list.
              //This is done by collecting the information (stored in the data property) 
              //for all the nodes adjacent to the centered node.
              var node = ht.graph.getClosestNodeToOrigin("current");
              var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
              html += "<ul>";
              node.eachAdjacency(function(adj){
                  var child = adj.nodeTo;
                  if (child.data) {
                      var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                      html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
                  }
              });
              html += "</ul>";
          }
        });
        //load JSON data.
        ht.loadJSON(json);
        //compute positions and plot.
        ht.refresh();
        //end
        ht.controller.onAfterCompute();
    }
