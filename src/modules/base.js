import p5 from "p5"

let fontFile = require("./../assets/BananaGrotesk-Bold.otf")
let font

const sketch = (s) => {

    s.preload = () => {
        font = s.loadFont(fontFile)
    }

    s.setup = () => {
        s.frameRate(60)
        s.createCanvas(s.windowWidth, s.windowHeight)

        s.background(125)
        s.noStroke()

    }

    s.draw = () => {
        s.background(125)
        s.noStroke()

    }

    // Resize
    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight)
    }

    // Mouse Press
    s.mousePressed = () => {

    }

}

const sketchInstance = new p5(sketch, document.body)