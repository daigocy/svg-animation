const SVG_NS = "http://www.w3.org/2000/svg"
var titleGroup = $(".block-1 svg .svg-title");
var titleText = $(".block-1 svg .svg-title text")[0];
var targetElement = null;
function titleAnimationStart() {
  var textClip = document.createElementNS(SVG_NS, "clipPath");
  var textClipRect = document.createElementNS(SVG_NS, "rect");
  textClip.setAttribute("id", "text-clip");
  textClipRect.setAttribute("x", 110);
  textClipRect.setAttribute("y", 14);
  textClipRect.setAttribute("height", 26);
  textClipRect.setAttribute("width", 110);
  textClip.appendChild(textClipRect);
  titleGroup.children()[0].appendChild(textClip);
  titleText.setAttribute("clip-path", "url(#text-clip)");
  targetElement = textClipRect;
  // var clipAnimate = document.createElementNS(SVG_NS, "animate");
  // clipAnimate.setAttribute("id", "clip-animate");
  // clipAnimate.setAttribute("attributeType", "XML");
  // clipAnimate.setAttribute("attributeName", "width");  
  // clipAnimate.setAttribute("from","0");  
  // clipAnimate.setAttribute("to","100");  
  // clipAnimate.setAttribute("dur","3s");
  // textClipRect.appendChild(clipAnimate);
  // textClipRect.setAttribute("transition", "all 10s"); 
}
titleAnimationStart();
var startTime = new Date();
var update = function () {
  let nowTime = new Date();
  if(nowTime - startTime < 3000) {
    targetElement.setAttribute("transform", "scale("+ ((nowTime-startTime)/3000).toFixed(2) +",1)");
    requestAnimationFrame(update);
  }
  else {
    startTime = nowTime;
    targetElement.setAttribute("transform", "scale(0,1)");
    requestAnimationFrame(update);
  }
  
}
requestAnimationFrame(update);

  