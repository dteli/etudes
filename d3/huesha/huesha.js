


require(['d3.min','sha1.min'], function (d3, sha1) {
    // return function (x) {return jssha1(x);};



    //var txtbxd3 = d3.select("#txtbx");

  
  var svg = d3.select("#huesvg");
  //var svgdefs = svg.append("defs");

  //var huegrad = svgdefs.select("#huegrad")
  //.attr("id", "hgradient")
  // .attr("x1","0%").attr("x2","0%").attr("y1","100%").attr("y2","0%");
  // bargradient.append("stop").attr("class", "stop0").attr("offset","0");
  // bargradient.append("stop").attr("class", "stop1").attr("offset","1");



    var txtbx = document.getElementById("txtbx");


  
  


  function update() {

      //var newtxt = document.getElementById("txtbx").value;
      var newtxt = txtbx.value;
  console.log(newtxt);
  
  // get SHA-1 hash
  var newsha = sha1(newtxt);

  // split hash into 5x6 + 5x2
  //var newcolors = [ newsha.slice(0,6),newsha.slice(6,12),
  //                  newsha.slice(12,18),newsha.slice(18,24),newsha.slice(24,30) ];
  var newcolors = newsha.slice(0,30).match(/.{6}/g)
                        .map(x => "#" + x);
  console.log(newcolors);
  
  
  // new stop offset values (sorted, in percents, as strings)
  var newstops = newsha.slice(30).match(/.{2}/g)
                       .map(y => 100 * parseInt(y,16) / 255)
                       .sort(function(a,b){return a-b;})
                       .map(y => y.toString() + "%");
  console.log(newstops);


      //// UNTIL THIS IS DONE IN D3:

      document.getElementById("hgstop0").style.setProperty("stop-color",newcolors[0]);
      document.getElementById("hgstop1").style.setProperty("stop-color",newcolors[1]);
      document.getElementById("hgstop2").style.setProperty("stop-color",newcolors[2]);
      document.getElementById("hgstop3").style.setProperty("stop-color",newcolors[3]);
      document.getElementById("hgstop4").style.setProperty("stop-color",newcolors[4]);
      
      document.getElementById("hgstop0").setAttribute("offset",newstops[0]);
      document.getElementById("hgstop1").setAttribute("offset",newstops[1]);
      document.getElementById("hgstop2").setAttribute("offset",newstops[2]);
      document.getElementById("hgstop3").setAttribute("offset",newstops[3]);
      document.getElementById("hgstop4").setAttribute("offset",newstops[4]);
      


  };

    txtbx.addEventListener("input", update);
    
    // return {
    //     update: update
    // }
    
});
