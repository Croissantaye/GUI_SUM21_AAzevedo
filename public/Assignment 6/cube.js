var cube = undefined;
var gl = undefined;
var angle = 0;
const imageURL = "https://static.wikia.nocookie.net/half-life/images/d/dc/Lambda_logo.svg/revision/latest?cb=20100327174546&path-prefix=en";
var canvas = undefined;
var w = undefined;
var h = undefined;
var fovy = undefined;
var aspect = undefined;
const near = 0.1;
const far = 100.0;

time = 0.0;
deltaTime = 0.2;

function init() {
    canvas = document.getElementById( "webgl-canvas" );
    w = canvas.clientWidth;
    h = canvas.clientHeight;

    gl = WebGLUtils.setupWebGL( canvas );
    gl.viewport(0, 0, w, h);

    fovy = 300.0; // degrees
    aspect = w / h;

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.enable( gl.DEPTH_TEST );

    cube = new Cube("barak_obama256.png");
    // cube.uniforms.values.PM = perspective(fovy, aspect, near, far);

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // var ms = new MatrixStack();
    // cube.uniforms.MV.values = translate(0, 0, -0.5 * (near + far));
    // ms.load(cube.uniforms.MV.values);

    // ms.push();
    // ms.translate([0, 0, -5]);

    // angle += 2; // degrees

    // cube.uniforms.values.MV = rotate( angle, [1, 1, 0] );
    // cube.uniforms.values.MV = translate([0, 0, -5]);
    cube.uniforms.values.PM = perspective(fovy, aspect, near, far);
    // time += deltaTime;
    // cube.uniforms.values.MV = rotate(time, [0, 1, 1]);
    cube.render();
    // ms.pop();
  
    window.requestAnimationFrame( render ); // schedule another call to render()
}

window.onresize = function(){
    w = canvas.clientWidth;
    h = canvas.clientHeight;

    gl.viewport(0, 0, w, h);

    aspect = w / h;
};

window.onload = init;