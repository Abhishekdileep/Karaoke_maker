
function Visualizer(audioContext , audio , ref) {
    var src = audioContext.createMediaElementSource(audio.current); // use ref here 
    var analyser = audioContext.createAnalyser();

    
    src.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var canvas = ref.current;
    var ctx = canvas.getContext("2d");
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;


    
    var barWidth = (WIDTH /(2* bufferLength) );
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);
      // analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        var r = 0;
        var g = 255;
        var b = 0;

        ctx.fillStyle = "rgb(" + r + "," + g + " ," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x +=   1;
      }
    }
    renderFrame()
}

export default Visualizer