

let txtbx = document.getElementById("txtbx");

let sentenceUl = document.getElementById("sentence-ul");





txtbx.addEventListener("input", delay(getThings, 2000));



async function getThings () {

  let sentence = txtbx.value;
  
  let r = await fetch("https://japerk-text-processing.p.rapidapi.com/tag/", {
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "japerk-text-processing.p.rapidapi.com",
      "x-rapidapi-key": "321122142amsh1ead82e0e489ee4p113c70jsn36369fecbb8b",
      "content-type": "application/x-www-form-urlencoded"
    },
    "body": `output=tagged&text=${encodeURIComponent(sentence)}`
  });
  let rjs = await r.json();
  //console.log(rjs);

  displayStats(rjs);
}


function displayStats (rjs) {

  let sA = splitResults(rjs.text);
  //console.log(sA);

  displaySentence(sA);

  displayAnalysis(sA);
}

function splitResults (text) {
  return text.split(' ').map(x => x.split('/'));
}

function displaySentence (ws) {
  clearChildren(sentenceUl);
  for (let w of ws) {
    let li = document.createElement("li");
    let wspan = document.createElement("span");
    wspan.classList.add("word-span");
    wspan.innerText = w[0];
    li.appendChild(wspan);
    let pspan = document.createElement("span");
    pspan.classList.add("pos-span");
    pspan.innerText = w[1];
    li.appendChild(pspan);
    sentenceUl.appendChild(li);
  }
}



let piew = "1000"; let pieh = "1000";
let outerRadius = piew / 2; let innerRadius = 0;
let piecolors = d3.scaleOrdinal(d3.schemeCategory10);

let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

let piesvg = d3.select("#analysis")
    .append("svg")
    .attr("width", piew)
    .attr("height", pieh);


let gholder = piesvg
    .append("g")
    .attr("transform", "translate(500,500)")
    .attr("id", "gholder");





function displayAnalysis (ws) {

  //clearChildren(document.querySelector("svg g"));
  
  let wfreqs = getWordFreqs(ws);

  let pie = d3.pie()
      .value(function (d) {return d.freq;})(wfreqs);




  //console.log(pie);

  //let gs = gholder.selectAll("g");
  //console.log(gs);
  let gpaths = gholder.selectAll("path");

  let gp = gpaths.data(pie, function (d) { return d.data.name; });

  gp.enter().append("path")
    .attr("class", "arc")
    .merge(gpaths)
    .attr("d", arc)
    .style("fill", function (d, i) { return piecolors(i); })
    .each(function(d) { this._current = d; });

  gp.exit().each(x => console.log(x)).remove();
  
  
}


// http://www.cagrimmett.com/til/2016/08/27/d3-transitions.html
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}



function getWordFreqs (ws) {
  let poss = {};
  for (let w of ws) {
    if (Object.keys(poss).includes(w[1])) {
      poss[w[1]]++;
    } else {
      poss[w[1]] = 1;
    }
  }
  let possarr = [];
  for (let k in poss) {
    possarr.push({name: k, freq: poss[k]});
  }
  console.log(possarr);
  return possarr;
}
















// HELPER FUNCTIONS


function clearChildren (e) {
  [...e.children].forEach(x => e.removeChild(x));
}







// https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing

function delay(fn, ms) {
  let timer = 0;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
  };
}
