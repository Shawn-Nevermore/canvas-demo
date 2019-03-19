// var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
// var eraser = document.getElementById('eraser')
// var brush = document.getElementById('brush')
// var wipe = document.getElementById('wipe')
var lineWidth = 2

var isTouchDevice = 'ontouchstart' in document.documentElement
// 1.自动初始化画布
autoSetCanvasSize(canvas)

// 2.监听用户操作
listenToUser(canvas)

// 3.设置功能按钮
// var brushEnabled = true
var eraserEnabled = false
// 工具选择
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}


eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}


wipe.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

// 颜色选择
black.onclick = function () {
    eraserEnabled = false
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = 'black'
}

red.onclick = function () {
    eraserEnabled = false
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = 'red'
}
green.onclick = function () {
    eraserEnabled = false
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    context.strokeStyle = 'green'
}
blue.onclick = function () {
    eraserEnabled = false
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    context.strokeStyle = 'blue'
}

// 粗细选择
thin.onclick = function () {
    lineWidth = 2
}

mid.onclick = function () {
    lineWidth = 5
}

thick.onclick = function () {
    lineWidth = 8
}

// 下载保存
download.onclick = function () {
    var url = canvas.toDataURL('image/png', 1.0)
    var link = document.createElement('a')
    document.body.appendChild(link)
    link.href = url
    link.download = "my_works"
    link.click()

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
    context.lineWidth = lineWidth
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize(canvas) {
    // 初始化canvas的size
    setCanvasSize()

    // 窗口拖动后重置canvas的size
    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {

        var pageHeight = document.documentElement.clientHeight
        var pageWidth = document.documentElement.clientWidth
        canvas.setAttribute("width", pageWidth)
        canvas.setAttribute("height", pageHeight)
    }

}

function listenToUser(canvas) {

    // 开始使用鼠标绘图
    var using = false

    // 建立一个可迭代的上一个点，来实时更新鼠标移动的位置
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    if (isTouchDevice) {
        canvas.ontouchstart = function (aaa) {
            using = true
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 30, 30)
            } else {

                lastPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, 1)
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 30, 30)
            } else {
                newPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (aaa) {
            using = false
        }
    } else {
        // 1.监听鼠标按下
        canvas.onmousedown = function (aaa) {
            using = true
            var x = aaa.clientX
            var y = aaa.clientY
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 30, 30)
            } else {

                lastPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, 1)
            }

        }

        // 2.监听鼠标移动
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 30, 30)
            } else {
                newPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        // 3.监听鼠标松开
        canvas.onmouseup = function (aaa) {
            using = false
        }

    }
}


