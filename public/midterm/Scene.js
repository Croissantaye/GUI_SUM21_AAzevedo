var canvas;
var gl;

var ViewOffset;
var Perspective;
var near = 20;
var far = 500;

var time = 0.0;
var timeDelta = 0.5;

var color = [1.0, 0.0, 0.0, 1.0];
var spoke;

function init(){
    canvas = document.getElementById("webgl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);

    if(!gl){ alert("WebGL failed to initialize")};

    gl.clearColor(47/256, 105/256, 204/256, 1);
    gl.enable(gl.DEPTH_TEST);

    for(var name in Cylinders){
        Cylinders[name].model = new Cylinder();
        var cylinder = Cylinders[name].model;

        cylinder.uniforms = {
            color : gl.getUniformLocation(cylinder.program, "color"),
			ModelView : gl.getUniformLocation(cylinder.program, "ModelView"),
			Perspective : gl.getUniformLocation(cylinder.program, "Perspective"),
        };
    }

	for(var name in Tubes){
        Tubes[name].model = new Tube();
        var tube = Tubes[name].model;

        tube.uniforms = {
            color : gl.getUniformLocation(tube.program, "color"),
			ModelView : gl.getUniformLocation(tube.program, "ModelView"),
			Perspective : gl.getUniformLocation(tube.program, "Perspective"),
        };
    }

	for(var name in Planes){
		Planes[name].model = new Plane(Planes[name].source);
		var plane = Planes[name].model;
		plane.uniforms = {
			texture : gl.getUniformLocation(plane.program, "uTexture"),
			ModelView : gl.getUniformLocation(plane.program, "ModelView"),
			Perspective : gl.getUniformLocation(plane.program, "Perspective"),
		}
	}

    resize();

    render();
}

function render(){
    time += timeDelta;

    var MS = new MatrixStack();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    ViewOffset = translate(0, 0, -.1 * (near + far));
    MS.load(ViewOffset);

	for(var obj in Cylinders){
		DrawObject(Cylinders[obj], MS, false);
	}

    for(var obj in Tubes){
        DrawObject(Tubes[obj], MS, false);
    }

	for(var obj in Planes){
		DrawObject(Planes[obj], MS, false);
	}

    MS.pop();

    window.requestAnimationFrame(render);
}

function DrawObject(data, matrixStack, pointMode)
{
	if (!pointMode) {
        pointMode = false;
    }
    if(data.model){
        data.model.PointMode = pointMode;
        // console.log("Point mode on");
    }
	
	//Inherit matrices.
	matrixStack.push();
	
	//Apply transformation matrices using data.
	
	switch(data.type){
		case "Cylinder":
			matrixStack.rotate(data.startAngle + (data.timeScale * time), data.axis);
			matrixStack.rotate(90, [1, 0, 0]);
			matrixStack.translate(data.translate[0], data.translate[1], data.translate[2]);
			matrixStack.scale(data.scale[0], data.scale[1], data.scale[2]);
			break;
		case "Tube":
			// matrixStack.rotate(data.startAngle + (data.timeScale * time), data.axis);
			matrixStack.rotate(data.startAngle + (data.timeScale * time), data.axis);
			matrixStack.translate(data.translate[0], data.translate[1], data.translate[2]);
			matrixStack.scale(data.scale[0], data.scale[1], data.scale[2]);
			break;
		case "Plane":
			matrixStack.rotate(data.startAngle + (data.timeScale * time), data.axis);
			matrixStack.translate(data.translate[0], data.translate[1], data.translate[2]);
			matrixStack.scale(data.scale[0], data.scale[1], data.scale[2]);
	}
	
	//Set the program.
	gl.useProgram(data.model.program);
	
	//Pass in matrix information.
	gl.uniformMatrix4fv(data.model.uniforms.ModelView, false, flatten(matrixStack.current()));
	gl.uniformMatrix4fv(data.model.uniforms.Perspective, false, flatten(Perspective));
	if(data.type === "Cylinder" || "Tube"){
		gl.uniform4fv(data.model.uniforms.color, flatten(data.color));
	}
	else if(data.type === "Plane"){
		gl.uniform1i(data.model.texture, 0);
	}
	
	//Actually render.
	data.model.render();

	//Clear the stack.
	matrixStack.pop();
}

function resize(){
    var w = canvas.clientWidth;
	var h = canvas.clientHeight;
	
	gl.viewport(0, 0, w, h);
	
	var fovy = 50.0;
	var aspect = w / h;
	
	Perspective = perspective(fovy, aspect, near, far);
}

window.onload = init;
window.onresize = resize;