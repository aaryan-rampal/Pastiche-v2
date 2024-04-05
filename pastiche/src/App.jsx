import { useEffect, useRef, useState } from 'react'
import Canvas from './components/Canvas'

function App() {
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState([])
  const distanceLimit = 25

  useEffect(() => {
    const canvas = document.getElementById("drawing-area");
    canvas.width = window.innerWidth / 2
    canvas.height = canvas.width / 2

    const context = canvas.getContext("2d")
    context.scale(1, 1)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
    setPoints([{ x: offsetX, y: offsetY }])
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    console.log(points)
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return

    const { offsetX, offsetY } = nativeEvent;
    const newPoints = [...points, { x: offsetX, y: offsetY }];
    const numPointsToRemove = Math.max(0, newPoints.length - distanceLimit);
    const updatedPoints = newPoints.slice(numPointsToRemove);

    const current = contextRef.current

    current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    current.beginPath();
    updatedPoints.reduce((prevPoint, currPoint) => {
      current.moveTo(prevPoint.x, prevPoint.y)
      current.lineTo(currPoint.x, currPoint.y)
      return currPoint
    })
    current.stroke();

    setPoints(updatedPoints)
  }

  return (
    <div>
      <h1>Test</h1>
      {/* <div className='canvas-container'>
        <canvas id="drawing-area" style={{ border: "1px solid black" }}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
        />
      </div> */}
      <Canvas startDrawing={startDrawing}
      finishDrawing={finishDrawing} draw={draw}/>
    </div>
  )
}

export default App
