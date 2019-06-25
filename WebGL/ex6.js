var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' + 'void main(){\n' + 'gl_Position = a_Position;\n' + 'gl_PointSize = 10.0;\n' + '}\n';

var FSHADER_SOURCE = 'void main(){\n' + 'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n' + '}\n';

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed');
        return;
    }
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed');
        return;
    }
    
    var n = initVertexBuffers(gl);
    if(n<0){
        console.log('Failed');
        return;
    }
    
    gl.clearColor(0,0,0,1);
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    //gl.drawArrays(gl.POINTS, 0, n);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    //gl.drawArrays(gl.LINE_LOOP, 0, n);
    
}

function initVertexBuffers(gl){
    var vertices = new //Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
    //Float32Array([-0.25,-0.5,-0.75,-0.5,-0.5,0.5,0.25,-0.5,0.75,-0.5,0.5,0.5])
    
    Float32Array([-0.5,0.5,
                  -0.5,-0.5,
                  0.5,0.5,
                  0.5,-0.5]);
    
    //var n=3;    
    //var n=6;
    var n=4;
    
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed');
        return -1;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position<0){
        console.log('Failed');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    
    return n;
}





























