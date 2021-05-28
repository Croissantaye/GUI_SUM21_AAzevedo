
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
           0.5, 0.5, 0.5,       // 0
           0.5, -0.5, 0.5,      // 1
           -0.5, -0.5, 0.5,     // 2
           -0.5, 0.5, 0.5,      // 3
           0.5, 0.5, -0.5,      // 4
           0.5, -0.5, -0.5,     // 5
           -0.5, -0.5, -0.5,    // 6
           -0.5, 0.5, -0.5      // 7
            ]),
        numComponents : 3
    };

    this.colors = {
        values : [], 
        numComponents: 3
    };

    function randomColor() {
        return [Math.random(), Math.random(), Math.random()];
    }

    for (let face = 0; face < 6; face++) {
        let faceColor = randomColor();
        for (let vertex = 0; vertex < 6; vertex++) {
            this.colors.values.push(...faceColor);
        }
    }

    this.colors.values = new Float32Array(this.colors.values);
    
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
            //front face
            0, 1, 3, 
            3, 1, 2, 
            //bottom face
            1, 2, 5,
            5, 2, 6, 
            //back face
            4, 7, 5,
            5, 7, 6,
            //top face
            4, 7, 0,
            0, 7, 3,
            //left face
            3, 7, 2,
            2, 7, 6,
            //right face
            4, 0, 5,
            5, 0, 1
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.colors.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colors.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW);

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.colors.attributeLoc = gl.getAttribLocation( this.program, "color");
    gl.enableVertexAttribArray( this.colors.attributeLoc);

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.uniformLocations = {
        matrix: gl.getUniformLocation(program, `matrix`),
    };
    
    let canvas = document.querySelector("canvas");

    this.matrix = mat4.create();
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, 
        75 * Math.PI/180,
        canvas.width/canvas.height,
        1e-4,
        1e4
    );
    this.finalMatrix = mat4.create();
    
    mat4.translate(matrix, matrix, [.2, .5, 0]);
    


    this.animate = function() {
        requestAnimationFrame(animate);
        mat4.rotateZ(this.matrix, this.matrix, Math.PI/2 / 70);
        mat4.rotateX(this.matrix, this.matrix, .09);
        mat4.multiply(this.finalMatrix, this.projectionMatrix, this.matrix);
        gl.uniformMatrix4fv(this.uniformLocations.matrix, false, this.finalMatrix);
    }

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer);
        gl.vertexAttribPointer( this.colors.attributeLoc, this.colors.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        gl.enable(gl.DEPTH_TEST);
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
        
        this.animate; 
        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};