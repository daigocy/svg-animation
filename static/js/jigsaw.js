var start = $("#jigsaw").offset().top - $(window).height() -60;
var end = $("#jigsaw").offset().top - 100;

const lastPosition = [];
const jigsaws = $("#jigsaw svg g");
for(let i=0;i<20;i++) {
  let x = 220 + Math.floor(i/2) * 47.3;
  let y = (i%2)?127:80;
  let deg = 90;
  if(i%4===0 | i%4 ===3) {
    deg = 0;
  }
  let opacity = Math.random() * 0.4 + 0.1;
  lastPosition.push({x:x, y:y, deg:deg, opacity:opacity });
  jigsaws[i].setAttribute("transform", `translate(${x},${y}) rotate(${deg} 40 23.5)`);
  jigsaws[i].setAttribute("opacity",opacity.toFixed(2)+'');
}

const  displacements= [];
for(let i=0;i<20;i++){
  if(i<10) {
    let dx = (8 - Math.floor(i/2) * 2 + Math.random()) * 22;
    let dy = (8 - Math.floor(i/2) * 2 + Math.random()) * 5;
    let ddeg = (8 - Math.floor(i/2) * 2 + Math.random()) * 20;
    if(Math.random()>0.5) {
      ddeg = ddeg * -1;
    }
    displacements.push({dx:dx, dy:dy, ddeg:ddeg});
  }else {
    let dx = (Math.floor((i-10)/2) * 2 + Math.random()) * 22;
    let dy = (Math.floor((i-10)/2) * 2 + Math.random()) * 5;
    let ddeg = (Math.floor((i-10)/2) * 2 + Math.random()) * 10;
    if(Math.random()>0.5) {
      ddeg = ddeg * -1;
    }
    displacements.push({dx:dx, dy:dy, ddeg:ddeg});
  }
}

var resetStart = function() {
  start = $("#jigsaw").offset().top - $(window).height() -60;
}

var moveJigsaws = function(){
  if(window.scrollY>start&&window.scrollY<end){
    let k = ($("#jigsaw")[0].getBoundingClientRect().top -100)/($(window).height()-40);
    k = k *k;
    for(let i=0;i<20;i++) {
      let last = lastPosition[i];
      let displacement = displacements[i];
      let x,y,deg = 0;
      if(i<10) {
        x = last.x - displacement.dx*k;
      }else {
        x = last.x + displacement.dx*k;
      }
      if(i%2){
        y = last.y + displacement.dy*k;
      }else {
        y = last.y - displacement.dy*k;
      }
      deg = last.deg + displacement.ddeg*k;
      
      jigsaws[i].setAttribute("transform",`translate(${x}, ${y}) rotate(${deg} 40 23.5)`);
    }  
  }
}

window.addEventListener("scroll", moveJigsaws);
window.addEventListener("resize", resetStart);