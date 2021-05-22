var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    Cube();

    render();
}

function render() {
    // Cube.animate;
    Cube.render;
}

window.onload = init;