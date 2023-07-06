const colorOptions = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const lineWidth = document.getElementById("line-width")
const modeButton = document.getElementById("mode-btn")
const deleteButton = document.getElementById("delete-btn")
const eraseButton = document.getElementById("erase-btn")
const fileInput = document.getElementById("file")
const textInput = document.getElementById("text")
const saveButton = document.getElementById("save")

canvas.height = 800;
canvas.width = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"
let isPainting = false
let isFilling = false

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke()
    }else{
        ctx.beginPath()
        ctx.moveTo(event.offsetX,event.offsetY)
    }
}
function startPainting(event){
    isPainting = true
} 

function stopPainting(){
    isPainting = false
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorEvent(event){
    changeLineColor(event.target.value); 
}

function onColorClick(event){
    const colorValue = event.target.dataset.color
    changeLineColor(colorValue); 
    color.value= colorValue
}

function changeLineColor(color){
    ctx.strokeStyle =color;
    ctx.fillStyle =color;
}

function onModeButtonClicked(){
    if(isFilling){
        isFilling = false
        modeButton.innerText = "Fill"
    }else{
        isFilling = true
        modeButton.innerText = "Draw"
    }
}

function onCanvasClicked(){
    if(isFilling){
        ctx.fillRect(0,0,800,800)
    }
}

function onDeleteButtonClicked(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,800,800)
}

function onEraseButtonClicked(){
    ctx.strokeStyle = "white"
    isFilling = false
    modeButton.innerText = "Fill"
}

function onFileChange(event){
     const file = event.target.files[0] // Javascript itself has no access to the file, the file is stored in the current browser memory, so no other browser can access the file either 
     const url = URL.createObjectURL(file)
     const image = new Image() // same as <img src=""> in html
     image.src = url;
     image.onload = function(){
        ctx.drawImage(image, 0,0,800,800)
     }
}

function onDoubleClicked(event){
    const textValue = textInput.value
    if(!textInput.value) return; 

    ctx.save();
    ctx.lineWidth = 1
    ctx.font = "40px serif"
    ctx.strokeText(textValue, event.offsetX,event.offsetY,200)
    ctx.restore()
}

function onSaveClicked(){
      const url = canvas.toDataURL();
      //same as <a href="" download/>
      const a = document.createElement("a")
      a.href = url
      a.download = "myDrawing.png"
      a.click()
}

canvas.addEventListener("dblclick", onDoubleClicked)
canvas.addEventListener("mousedown", startPainting)
canvas.addEventListener("mouseup", stopPainting)
canvas.addEventListener("mouseleave", stopPainting)
canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("click", onCanvasClicked)

lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorEvent)
colorOptions.forEach(color=> color.addEventListener("click", onColorClick))
modeButton.addEventListener("click", onModeButtonClicked)
deleteButton.addEventListener("click", onDeleteButtonClicked)
eraseButton.addEventListener("click", onEraseButtonClicked)
fileInput.addEventListener("change", onFileChange)
saveButton.addEventListener("click", onSaveClicked)
