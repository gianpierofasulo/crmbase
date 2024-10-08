
function clearCanvas(element_id) {
    var canvas = document.getElementById("sig-canvas" + element_id);
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width; // Clear the canvas
    // Reset any other data or UI elements
    var sigText = document.getElementById("sig-dataUrl" + element_id);
    if (sigText) {
      sigText.value = "";
    }

    var sigImage = document.getElementById("sig-image" + element_id);

    if (sigImage) {
        sigImage.parentNode.removeChild(sigImage);
    }

    initializeSignatureCanvas(element_id);
}

function initializeSignatureCanvas(element_id) {
      console.log("initializeSignatureCanvas"+ element_id);
      // Your existing JavaScript code here
      (function () {
          window.requestAnimFrame = function (callback) {
            return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };
          }();

          var canvas = document.getElementById("sig-canvas" + element_id);
          var ctx = canvas.getContext("2d");
          ctx.strokeStyle = "#222222";
          ctx.lineWidth = 4;

          var drawing = false;
          var mousePos = {
            x: 0,
            y: 0 };

          var lastPos = mousePos;

          canvas.addEventListener("mousedown", function (e) {
            drawing = true;
            lastPos = getMousePos(canvas, e);
          }, false);

          canvas.addEventListener("mouseup", function (e) {
            drawing = false;
            var dataUrl = canvas.toDataURL();
            var sigText = document.getElementById("sig-dataUrl" + element_id);
            sigText.value = dataUrl;

            if (elementExistsById("sig-image" + element_id)) {
                var sigImage = document.getElementById("sig-image" + element_id);
                sigImage.setAttribute("src", dataUrl);
            }

            console.log("test",dataUrl);

          }, false);

          canvas.addEventListener("mousemove", function (e) {
            mousePos = getMousePos(canvas, e);
          }, false);

          // Add touch event support for mobile
          canvas.addEventListener("touchstart", function (e) {

          }, false);

          canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var me = new MouseEvent("mousemove", {
              clientX: touch.clientX,
              clientY: touch.clientY });

            canvas.dispatchEvent(me);
          }, false);

          canvas.addEventListener("touchstart", function (e) {
            mousePos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var me = new MouseEvent("mousedown", {
              clientX: touch.clientX,
              clientY: touch.clientY });

            canvas.dispatchEvent(me);
          }, false);

          canvas.addEventListener("touchend", function (e) {
            var me = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(me);
   
          }, false);

          function getMousePos(canvasDom, mouseEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
              x: mouseEvent.clientX - rect.left,
              y: mouseEvent.clientY - rect.top };

          }

          function getTouchPos(canvasDom, touchEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
              x: touchEvent.touches[0].clientX - rect.left,
              y: touchEvent.touches[0].clientY - rect.top };

          }

          function renderCanvas() {
            if (drawing) {
              ctx.moveTo(lastPos.x, lastPos.y);
              ctx.lineTo(mousePos.x, mousePos.y);
              ctx.stroke();
              lastPos = mousePos;
            }
          }

          // Prevent scrolling when touching the canvas
          document.body.addEventListener("touchstart", function (e) {
            if (e.target == canvas) {
              e.preventDefault();
            }
          }, false);
          document.body.addEventListener("touchend", function (e) {
            if (e.target == canvas) {
              e.preventDefault();
                //sigImage.setAttribute("src", dataUrl);

            }

          }, false);
          document.body.addEventListener("touchmove", function (e) {
            if (e.target == canvas) {
              e.preventDefault();
            }
          }, false);

          (function drawLoop() {
            requestAnimFrame(drawLoop);
            renderCanvas();
          })();

          function clearCanvas(element_id) {
            canvas.width = canvas.width;
            console.log("MM");
            initializeSignatureCanvas(element_id);
          }
          console.log(1);
          // Set up the UI
          var sigText = document.getElementById("sig-dataUrl" + element_id);
          var sigImage = document.getElementById("sig-image" + element_id);
          var clearBtn = document.getElementById("sig-clearBtn" + element_id);
          //var submitBtn = document.getElementById("sig-submitBtn");
          clearBtn.addEventListener("click", function (e) {
            clearCanvas(element_id);
            sigText.innerHTML = "Data URL for your signature will go here!";
            sigImage.setAttribute("src", "");
          }, false);
          console.log(2);
          /*submitBtn.addEventListener("click", function (e) {
            var dataUrl = canvas.toDataURL();
            sigText.innerHTML = dataUrl;
            sigImage.setAttribute("src", dataUrl);
          }, false);*/

        })();
    }

    function elementExistsById(elementId) {
      return !!document.getElementById(elementId);
    }

 $(document).on("ready xcrudafterrequest", function(event, container)
 {
     // Initialize the canvas when the page loads
     if (elementExistsById("sig-canvas")) {
         document.addEventListener("DOMContentLoaded", function() {
            //initializeSignatureCanvas();
         });
     }
});