var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' + 'uniform mat4 u_ModelMatrix;\n' + 'void main(){\n' + 'gl_Position = u_ModelMatrix*a_Position;\n' + '}\n';

var FSHADER_SOURCE = 'void main(){\n' + 'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' + '}\n';

var ANGLE_STEP = 45.0;
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
    
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if(!u_ModelMatrix){
        console.log('Failed');
        return;
    }
    
    var currentAngle = 0.0;
    var modelMatrix = new Matrix4();
    
    var tick = function(){
        currentAngle = animate(currentAngle);
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick, canvas);
    };
    tick();

}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0,0.5,-0.5,-0.5,0.5,-0.5
    ]);
    var n =3;
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
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix){
    modelMatrix.setRotate(currentAngle, 0,0,1);
    modelMatrix.translate(0.35,0,0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}

var g_last = Date.now();
function animate(angle){
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    var newAngle = angle + (ANGLE_STEP*elapsed) / 1000.0;
    return newAngle %= 360;
}

function up(){
    ANGLE_STEP += 10;
}

function down(){
    ANGLE_STEP -= 10;
}

























