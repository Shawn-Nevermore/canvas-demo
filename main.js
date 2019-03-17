var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var height = document.documentElement.clientHeight
var width = document.documentElement.clientWidth
canvas.setAttribute("width", width)
canvas.setAttribute("height", height)

var using = false
var eraserEnabled = false
var lastPoint = { x: undefined, y: undefined }

// 1.监听鼠标按下
canvas.onmousedown = function (aaa) {
    using = true
    var x = aaa.clientX
    var y = aaa.clientY
    lastPoint = { "x": x, "y": y }
    drawCircle(x, y, 1)

}

// 2.监听鼠标移动
canvas.onmousemove = function (aaa) {
    if (using) {
        var x = aaa.clientX
        var y = aaa.clientY
        newPoint = { "x": x, "y": y }
        drawCircle(x, y, 1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
}

// 3.监听鼠标松开
canvas.onmouseup = function (aaa) {
    using = false
}

/*****************工具函数*****************************************/

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = 2
    context.stroke()
    context.closePath()
}