import React from 'react';

const Canvas = ({ startDrawing, finishDrawing, draw}) => {
  // const canvas = React.useRef()

  // React.useEffect(() => {
  //   const canvas = document.getElementById("drawing-area");
  //   canvas.width = window.innerWidth / 2
  //   canvas.height = canvas.width / 2

  //   const context = canvas.getContext("2d")
  //   context.scale(1, 1)
  //   context.lineCap = 'round'
  //   context.strokeStyle = 'black'
  //   context.lineWidth = 5
  //   // contextRef.current = context
  // })

  return (
    <div className='canvas-container'>
      <canvas 
      id="drawing-area" style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </div>
  )
}

export default Canvas;
