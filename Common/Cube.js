
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

    const texture = loadTexture(gl, 'barak_obama256.png');

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
        //    0.5, 0.5, 0.5,       // 0
        //    0.5, -0.5, 0.5,      // 1
        //    -0.5, -0.5, 0.5,     // 2
        //    -0.5, 0.5, 0.5,      // 3
        //    0.5, 0.5, -0.5,      // 4
        //    0.5, -0.5, -0.5,     // 5
        //    -0.5, -0.5, -0.5,    // 6
        //    -0.5, 0.5, -0.5      // 7

        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
        ]),
        numComponents : 3
    };
    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
    

    this.textureCoordinates = {
        values: new Float32Array([
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
        ]),
        numComponents: 2
    };
    this.textureCoordinates.count = this.textureCoordinates.values.length;

    this.textureCoordinates.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinates.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.textureCoordinates.values, gl.STATIC_DRAW);

    this.indices = { 
        values : new Uint16Array([
            // // Add your list of triangle indices here
            // // wind clockwise
            // //front face
            // 0, 1, 3,
            // 3, 1, 2,
            // //bottom face
            // 1, 5, 2,
            // 2, 5, 6, 
            // //back face
            // 4, 7, 5,
            // 5, 7, 6,
            // //top face
            // 4, 0, 7,
            // 7, 0, 3,
            // //left face
            // 3, 2, 7,
            // 7, 2, 6,
            // //right face
            // 4, 5, 0,
            // 0, 5, 1

            0,  1,  2,      0,  2,  3,    // front
            4,  5,  6,      4,  6,  7,    // back
            8,  9,  10,     8,  10, 11,   // top
            12, 13, 14,     12, 14, 15,   // bottom
            16, 17, 18,     16, 18, 19,   // right
            20, 21, 22,     20, 22, 23,   // left
        ])
    };
    this.indices.count = this.indices.values.length;

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    //
    // Initialize a texture and load an image.
    // When the image finished loading copy it into the texture.
    //
    function loadTexture(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        // Because images have to be download over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([255, 255, 0, 0]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
    
        const image = new Image();
        image.crossOrigin = undefined;
        image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        requestCORSIfNotSameOrigin(image, 'barak_obama256.png');
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);
    
        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn of mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        };
        image.src = url;
    
        return texture;
    }

    function isPowerOf2(value) {
        return (value & (value - 1)) == 0;
    }

    function requestCORSIfNotSameOrigin(img, url) {
        if ((new URL(url, window.location.href)).origin !== window.location.origin) {
          img.crossOrigin = "barak_obama256.png";
        }
    }

    var pic = loadTexture(gl, "barak_obama256.png")

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, pic);

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    // this.positions.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    // gl.enableVertexAttribArray( this.color.attributeLoc );

    this.textureCoordinates.attributeLoc = gl.getAttribLocation( this.program, "vTexCoord" );
    gl.enableVertexAttribArray( this.textureCoordinates.attributeLoc );

    this.uniforms = {
        values: {
            MV: mat4(),
            PM: mat4(),
            sampler: 0
        },
        locations: {
            MV: undefined, 
            PM: undefined,
            sampler: undefined
        }
    };

    this.uniforms.locations.MV = gl.getUniformLocation(this.program, "MV");
    this.uniforms.locations.PM = gl.getUniformLocation(this.program, "PM");
    this.uniforms.locations.sampler = gl.getUniformLocation(this.program, "uSampler");

    this.angle;
    var time = 0.0;
    var deltaTime = .2;

    this.render = function () {
        time += deltaTime;
        // this.uniforms.values.MV = rotate(deltaTime, [0, 1, 1]);
        var ms = new MatrixStack();

        this.uniforms.values.MV = translate(0, 0, -5);
        ms.load(this.uniforms.values.MV);

        ms.push();
        ms.rotate(time, [0, 0, 1]);
        ms.rotate(time, [0, 1, 0]);
        // ms.translate(0, 0, -5);
        // console.log(time);

        // console.log(this.uniforms.values.PM);
        

        gl.useProgram( this.program );
        gl.enable(gl.DEPTH_TEST);

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
        gl.enableVertexAttribArray(this.positions.attributeLoc);

        gl.bindBuffer( gl.ARRAY_BUFFER, this.textureCoordinates.buffer );
        gl.vertexAttribPointer( this.textureCoordinates.attributeLoc, this.textureCoordinates.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
        gl.enableVertexAttribArray(this.textureCoordinates.attributeLoc);
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( this.uniforms.locations.MV, gl.FALSE, flatten(ms.current()) );
        gl.uniformMatrix4fv( this.uniforms.locations.PM, gl.FALSE, flatten(this.uniforms.values.PM));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.uniform1i(this.uniforms.locations.sampler, 0);

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
        // ms.pop();
    }

};