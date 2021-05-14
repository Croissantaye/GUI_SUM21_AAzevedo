var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    
    var R = Math.random();
    var G = Math.random();
    var B = Math.random();

    gl.clearColor( R, G, B, 1.0 );

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onclick = init;