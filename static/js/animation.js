const SVG_NS = "http://www.w3.org/2000/svg";
var allGroup = document.querySelector(".block-1 svg .svg-all");
var allSnap = Snap(".block-1 svg .svg-all");
var titleGroup = document.querySelector(".block-1 svg .svg-title");
var titleText = document.querySelector(".block-1 svg .svg-title text");
var textClipRect = null;
var startTime = null;

// 原生javascript SVG API
function titleAnimationStart() {
  // 创建
  var textClip = document.createElementNS(SVG_NS, "clipPath");
  textClipRect = document.createElementNS(SVG_NS, "rect");
  // 修改属性
  textClip.setAttribute("id", "text-clip");
  textClipRect.setAttribute("x", 110);
  textClipRect.setAttribute("y", 14);
  textClipRect.setAttribute("height", 26);
  textClipRect.setAttribute("width", 110);
  // 挂载
  textClip.appendChild(textClipRect);
  titleGroup.children[0].appendChild(textClip);
  titleText.setAttribute("clip-path", "url(#text-clip)");
  startTime = new Date();
  titleAnimationUpdate();
}
function titleAnimationUpdate() {
  let nowTime = new Date();
  let duration = 2000;
  if(nowTime - startTime < duration) {
    textClipRect.setAttribute("transform", "scale("+ ((nowTime-startTime)/duration).toFixed(2) +",1)");
    // web动画 动画下一帧绘制完成回调函数
    requestAnimationFrame(titleAnimationUpdate);
  }
  else {
    titleAnimationEnd();
  }
}
function titleAnimationEnd() {
  let textClip = document.getElementById("text-clip");
  titleGroup.children[0].removeChild(textClip);
  waitAnimationStart();
}
function waitAnimationStart() {
  // let waitSvg = document.createElementNS(SVG_NS, "svg");
  // let path1 = document.createElementNS(SVG_NS, "path");
  // let path2 = document.createElementNS(SVG_NS, "path");
  // let animateT = document.createElementNS(SVG_NS, "animateTransform");
  // waitSvg.setAttribute("id", "wait-svg");
  // waitSvg.setAttribute("x", "325");
  // waitSvg.setAttribute("y", "250");
  // waitSvg.setAttribute("viewBox", "0 0 32 32");
  // waitSvg.setAttribute("width", "40");
  // waitSvg.setAttribute("height", "40");
  // waitSvg.setAttribute("fill", "#aaa");
  // waitSvg.setAttribute("style", "border: 1px solid black;");
  // path1.setAttribute("opacity", ".25");
  // path1.setAttribute("d", "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4");
  // path2.setAttribute("d", "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z");
  // animateT.setAttribute("attributeName", "transform");
  // animateT.setAttribute("type", "rotate");
  // animateT.setAttribute("from", "0 16 16");
  // animateT.setAttribute("to", "360 16 16");
  // animateT.setAttribute("dur", "0.8s");
  // animateT.setAttribute("repeatCount", "indefinite");
  // allGroup.appendChild(waitSvg);
  // waitSvg.appendChild(path1);
  // waitSvg.appendChild(path2);
  // path2.appendChild(animateT);
  
  let waitSvg = Snap();
  waitSvg.attr({
    id:"wait-svg",x: 325,y:250,viewBox:"0 0 32 32", width:40, height:40,fill: "#aaa",style:"border: 1px solid black;"
  })
  let path1 = waitSvg.path("M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4")
  .attr({
    opacity: ".25"
  });
  let path2 = waitSvg.path("M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z");
  let animateT = path2.paper.el("animateTransform", {
    attributeName:"transform", type:"rotate", from:"0 16 16", to:"360 16 16", dur:"0.8s", repeatCount:"indefinite"
  });
  path2.append(animateT);
  
  allGroup.append(waitSvg.node);
  startTime = new Date();
  waitAnimationUpdate();
}
function waitAnimationUpdate() {
  let nowTime = new Date();
  let duration = 1000;
  if(nowTime - startTime > duration) {
    waitAnimationEnd();
  }
  else {
    requestAnimationFrame(waitAnimationUpdate);
  }
}
function waitAnimationEnd() {
  let waitSvg = document.getElementById("wait-svg");
  allGroup.removeChild(waitSvg);
  contentAnimationStart()
}
function contentAnimationStart() {
  // 使用 Snap.js库新建svg
  let contentSvg = Snap();
  // 设置属性
  contentSvg.attr({
    opacity:"1", y:"40", width:"690", height:"460", viewBox:"0 0 750 500", preserveAspectRatio:"xMinYMin slice"
  })
  // 创建group
  let groups = contentSvg.group().attr({fill:"#FF9100", fillRule:"evenodd"});
  //1 group
  {
    let g = groups.group().transform("translate(358 335)");
    // 在group中添加 path rect
    g.path("M.3 6h88.2v4.7H.3z");
    g.path("M.3 18.5h180v4.7H.3zM.3 30.5h45v4.7H.3zM133.3 30.5h55v4.7h-55zM50.3 30.5h78v4.7h-78z").attr({opacity:".5"});
    g.rect(272,38,38,2).attr({opacity:".2"});
    g.rect(228,38,38,2).attr({opacity: ".2"})
    g.path("M296 15c0 2.6-2 4.6-4.7 4.6-2.5 0-4.5-2-4.5-4.6 0-2.6 2-4.6 4.5-4.6 2.6 0 4.6 2 4.6 4.6zm-14 11.7c0-3.2 6-5 9-5 3.2 0 9.3 1.8 9.3 5v1.5H282v-1.5zM247.5 28s7.5-7.7 7.5-11.7c0-4-3.4-7.3-7.5-7.3-4 0-7.5 3.3-7.5 7.3s7.5 11.7 7.5 11.7zm0-9.8c1.4 0 2.6-1.2 2.6-2.5 0-1.4-1-2.6-2.5-2.6-1.4 0-2.6 1.3-2.6 2.7 0 1.3 1 2.5 2.5 2.5z")
    .attr({opacity:".8"});
  }
  //2 group
  {
    let g = groups.group().transform("translate(358 79)");
    g.rect(0,0,310,230,4);
    let gg = g.group().transform("translate(101 90)");
    gg.path("M37 1l20.5 34.4L75.7 23l30 35H.3").attr({opacity:".8"});
    gg.ellipse(93.1,9.7,8.7,8.7).attr({opacity:".8"});
  }
  //3 group
  {
    let g = groups.group();
    //3.1 group
    {
      let gg = g.group().transform("translate(83 335)");
      gg.path("M63.3 11.7H129v4.7H63.3z");
      gg.path("M63.3 23.4h129.2V28H63.3zM63.3 35.2h131.3V40H63.3z").attr({opacity:".5"});
      gg.rect(0,0,51.6,51,6,2).attr({opacity:".2"})
      let ggg = gg.group().transform("translate(7, 15) scale(0.35)");
      ggg.path("M37 1l20.5 34.4L75.7 23l30 35H.3").attr({opacity:".8"});
      ggg.ellipse(93.1,9.7,8.7,8.7).attr({opacity:".8"});
    }
    //3.2 group
    {
      let gg = g.group().transform("translate(83 270)");
      gg.path("M63.3 11.7h76.2v4.7H63.3z");
      gg.path("M63.3 23.4H210V28H63.2zM63.3 35.2h129V40h-129z").attr({opacity:".5"});
      gg.rect(0,0,51.6,51,6,2).attr({opacity:".2"});
      let ggg = gg.group().transform("translate(7, 15) scale(0.35)");
      ggg.path("M37 1l20.5 34.4L75.7 23l30 35H.3").attr({opacity:".8"});
      ggg.ellipse(93.1,9.7,8.7,8.7).attr({opacity:".8"});
    }
    //3.3 group
    {
      let gg = g.group().transform("translate(83 205)");
      gg.path("M63.3 10H158v4.7H63.3zM163.6 10h10.8v4.7h-10.8z");
      gg.path("M63.3 21.7h140v4.7h-140zM63.3 33.5h59.2v4.7H63.3z").attr({opacity:".5"});
      gg.rect(0,0,51.6,51,6,2).attr({opacity:".2"});
      let ggg = gg.group().transform("translate(7, 15) scale(0.35)");
      ggg.path("M37 1l20.5 34.4L75.7 23l30 35H.3").attr({opacity:".8"});
      ggg.ellipse(93.1,9.7,8.7,8.7).attr({opacity:".8"});
    }
    //3.4 group
    {
      let gg = g.group().transform("translate(83 140)");
      gg.path("M63.3 11.7h76.2v4.7H63.3z");
      gg.path("M63.3 23.4H210V28H63.2zM63.3 35.2h129V40h-129z").attr({opacity:".5"});
      gg.rect(0,0,51.6,51,6,2).attr({opacity:".2"});
      let ggg = gg.group().transform("translate(13,13)");
      ggg.path("M13 26c7.2 0 13-5.8 13-13S20.2 0 13 0 0 5.8 0 13s5.8 13 13 13zM9 12.6V6l5.7 3.3 5.7 3.3-5.7 3.3L9 19v-6.6z");
    }
    //3.5 group
    {
      let gg = g.group().transform("translate(83 75)");
      gg.path("M63.3 10H116v4.7H63.4zM122 10h17.5v4.7H122z");
      gg.path("M63.3 21.7H210v4.7H63.2zM63.3 33.5H210v4.7H63.2z").attr({opacity:".5"});
      gg.rect(0,0,51.6,51,6,2).attr({opacity:".2"});
      let ggg = gg.group().transform("translate(13,13)");
      ggg.path("M13 26c7.2 0 13-5.8 13-13S20.2 0 13 0 0 5.8 0 13s5.8 13 13 13zM9 12.6V6l5.7 3.3 5.7 3.3-5.7 3.3L9 19v-6.6z");
    }
  }
  groups.path("M0 0h750v34H0z");
  groups.path("M20.5 8L29 25H12").attr({fill: "#fff"});
  groups.text(45,15,"MySite").attr({
    style:"font-size: 14px; fill: rgb(255, 255, 255); font-weight: bold;",dy:"0.3em"
  })
  groups.circle(720,17,9).attr({stroke:"#fff",strokeWidth:"1"});
  groups.rect(600,8,100,18,8).attr({stroke:"#fff", strokeWidth:"1"});
  // contentSvg 为Snap中定义的接口对象，其node属性才是真正的svg节点对象
  allGroup.appendChild(contentSvg.node);
  startTime = new Date();
  contentAnimationUpdate();
}
function contentAnimationUpdate() {
  let nowTime = new Date();
  let duration = 1000;
  if(nowTime - startTime < duration){
    // svg节点内搜索
    allSnap.select("svg").attr({opacity: (nowTime-startTime)/duration+""})
    requestAnimationFrame(contentAnimationUpdate);
  }
  else {
    dialog1AnimationStart();
  }
}
function dialog1AnimationStart() {
  allSnap.path("M0,40 h690 v460 h-690 Z").attr({opacity: "0", id:"content-cover", fill:"black"});
  let g = allSnap.group().attr({opacity: "0", id:"svg-dialog", transform: "translate(225,102)"});
  // 未定义的svg tag类型使用 element.paper.el() 方法创建，创建后需要手动将创建的tag挂载到父节点上
  let clipPath = g.paper.el("clipPath").attr({id: "welcomeModalButton"});
  let clipPathRect = g.rect(154,82,76,22,3,3);
  let gDefs = g.paper.el("defs");
  // 手动挂载
  g.append(gDefs);
  gDefs.append(clipPath);
  clipPath.append(clipPathRect);
  g.rect(0,6,240,108,3,3).attr({fill:"rgba(0,0,0,0.2)"});
  g.rect(0,0,240,114,3,3).attr({fill:"white"});
  g.path("M3 0 L237 0 Q240 0 240 3 L240 26 Q240 26 240 26 L0 26 Q0 26 0 26 L0 3 Q0 0 3 0 Z").attr({fill: "rgb(33,150,243)"});
  g.text(10,13,"Welcome").attr({style:"fill: white; font-size: 14px;", dy:"0.3em"});
  // text()函数的第三个参数设置成数组可在生成的 text图形 内创建 tspan图形
  let textContent = g.text(0,36,["Thanks for joining MySite! Would you", "like to take a quick tour?"]).attr({style:"fill: black; font-size: 13px;"});
  let tspans = textContent.children();
  tspans[0].attr({x:10, dy:"1em"});
  tspans[1].attr({x:10, dy:"1.5em"});
  g.rect(154,82,76,22,3,3).attr({style: "fill: rgb(33, 150, 243);"});
  g.text(164,82,"start Tour").attr({style:"fill: white; font-size: 13px;", dy:"1.2em"});
  startTime = new Date();
  dialog1AnimationUpdate1();
}
function dialog1AnimationUpdate1() {
  let nowTime = new Date();
  let duration = 1000 //,duration2 = 4000;
  if(nowTime - startTime < duration) {
    allSnap.select("#content-cover").attr({opacity: 0.4*(nowTime-startTime)/duration +""});
    allSnap.select("#svg-dialog").attr({
      opacity: (nowTime-startTime)/duration +"",
      transform: `translate(225, ${102+100*(nowTime-startTime)/duration+''})`
    });
    requestAnimationFrame(dialog1AnimationUpdate1);
  }
  else {
    buttonAnimationStart(192,94,dialog1AnimationUpdate2);
  }
}
function dialog1AnimationUpdate2() {
  let nowTime = new Date();
  let duration = 1000 
  if(nowTime - startTime < duration) {
    //allSnap.select("#content-cover").attr({opacity: (0.4-0.4*(nowTime-startTime)/duration) +""});
    allSnap.select("#svg-dialog").attr({
      opacity: (1-(nowTime-startTime)/duration) +"",
      transform: `translate(225, ${202-100*(nowTime-startTime)/duration})`
    });
    requestAnimationFrame(dialog1AnimationUpdate2);
  }
  else dialog1AnimationEnd() 
}

function dialog1AnimationEnd(){
    let dialog = allSnap.select("#svg-dialog");
    dialog.remove();
    contentAnimationEnd();
  }

function buttonAnimationStart(btnx,btny,callback) {
  let g = allSnap.select("#svg-dialog");
  let circle = g.circle(btnx,btny,0).attr({
    fill:"white", opacity:"0.5", r:"0",clipPath:"url(#welcomeModalButton)"
  });
  //circle.node.setAttribute("clip-path","url(#welcomeModalButton)");
  startTime = new Date();
  buttonAnimationUpdate(callback);
}
function buttonAnimationUpdate(callback) {
  let nowTime = new Date();
  let duration = 1000;
  if(nowTime - startTime < duration) {
    let circle = allSnap.select("#svg-dialog circle");
    let k = (nowTime-startTime)/duration;
    circle.attr({r: 50*k*k +''});
    requestAnimationFrame(buttonAnimationUpdate.bind(null, callback));
  }
  else {
    buttonAnimationEnd(callback);
  }
}

function buttonAnimationEnd(callback) {
  let circle = allSnap.select("#svg-dialog circle");
  circle.remove();
  startTime = new Date();
  callback();
}


function contentAnimationEnd() {
  var contentSvg = allSnap.select("svg");
  contentSvg.remove();
  var contentCover = allSnap.select("#content-cover");
  if(contentCover) {
    contentCover.remove();
  }
  requestAnimationFrame(allStart);
}

startTime = new Date();
var allStart = function () {
  titleAnimationStart();
}
requestAnimationFrame(allStart);

  