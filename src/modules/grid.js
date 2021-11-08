import p5 from "p5"

let ogFont = require("./../assets/BananaGrotesk-Bold.otf")

const sketch = (s) => {

    let isDrawing = false

    let initialClick = {
        x: 0,
        y: 0
    }
    let finalClick= {
        x: 0,
        y: 0
    }

    let cube

    let gridSize = 12

    let font
    let textPoints

    let circleCursor
    let circleInit

    let gridBuffer

    s.preload = () => {
        font = s.loadFont(ogFont)
    }

    s.setup = () => {
        s.frameRate(60)

        s.createCanvas(s.windowWidth, s.windowHeight)
        s.noStroke()
        s.background(125)

        gridBuffer = s.createGraphics(s.windowWidth, s.windowHeight)
        gridBuffer.noStroke()
        gridBuffer.fill(0)
        drawGrid(0, gridSize, s.width / gridSize, s.height / gridSize)


        // Textt
        textPoints = font.textToPoints("green", 100, 500, 300, {
            sampleFactor: 0.05
        })
    }

    s.draw = () => {
        s.background(125)
        s.noStroke()

        s.image(gridBuffer, 0, 0, s.windowWidth, s.windowHeight)


        finalClick.x = snap(s.mouseX)
        finalClick.y = snap(s.mouseY)



        // Text
        for (let i = 0; i < textPoints.length; i++){
            s.fill(0, 255, 0, 50)
            let cosa = textPoints[i]
            s.rect(snap(cosa.x), snap(cosa.y), gridSize)
        }

        // Curor dots
        s.fill(0)
        circleCursor = s.circle(snap(s.mouseX), snap(s.mouseY), 6)

        // Draw Rectangle
        if(isDrawing){
            s.noFill()
            s.stroke(0)
            cube = s.rect(initialClick.x, initialClick.y, finalClick.x - initialClick.x, finalClick.y - initialClick.y)

            s.fill(0)
            circleInit = s.circle(initialClick.x, initialClick.y, 6)
        }

    }

    // Resize
    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight)
        gridBuffer.resizeCanvas(s.windowWidth, s.windowHeight)
        drawGrid(0, gridSize, s.width / gridSize, s.height / gridSize)

    }

    // Mouse Press
    s.mousePressed = () => {
        isDrawing = true

        initialClick.x = snap(s.mouseX)
        initialClick.y = snap(s.mouseY)

    }

    // Mouse Press
    s.mouseReleased = () => {
        finalClick.x = s.mouseX
        finalClick.y = s.mouseY
        isDrawing = false
    }


    function drawGrid(margin, size, w, h) {

        for(let rows = 0; rows < w; rows++){
            s.noStroke()
            s.fill(0, 0, 0)

            for(let columns = 0; columns < h; columns++) {
                gridBuffer.ellipse(margin + rows * size, margin + columns * size, 2)
            }
        }
    }


    function snap(op) {
        // subtract offset (to center lines)
        // divide by grid to get row/column
        // round to snap to the closest one
        var cell = Math.round((op - gridSize) / gridSize);
        // multiply back to grid scale
        // add offset to center
        return cell * gridSize + gridSize;
    }

}

const sketchInstance = new p5(sketch, document.body)