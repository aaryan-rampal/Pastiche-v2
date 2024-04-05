import React from 'react';

const Canvas = ({ startDrawing, finishDrawing, draw}) => {

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
