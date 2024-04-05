import { useEffect, useRef, useState } from 'react'
import Canvas from './components/Canvas'
import notes from './services/notes'

function App() {
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState([])
  const distanceLimit = 25

  useEffect(() => {
    const canvas = document.getElementById("drawing-area");
    const context = canvas.getContext("2d")

    canvas.width = window.innerWidth / 2
    canvas.height = canvas.width / 2

    context.scale(1, 1)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 4
    contextRef.current = context
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)

    setIsDrawing(true)
    setPoints([{ x: offsetX, y: offsetY }])
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    // console.log(points)

    notes.getClosestMatch(points).then(response => console.log(response))
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return

    const { offsetX, offsetY } = nativeEvent;
    const newPoints = [...points, { x: offsetX, y: offsetY }];
    const numPointsToRemove = Math.max(0, newPoints.length - distanceLimit);
    const updatedPoints = numPointsToRemove == 0 ? newPoints : newPoints.slice(numPointsToRemove);

    const current = contextRef.current

    // keeps the stroke contained to distanceLimit pixels
    if (numPointsToRemove > 0) {
      current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    }

    current.beginPath();
    updatedPoints.reduce((prevPoint, currPoint) => {
      current.lineTo(currPoint.x, currPoint.y)
      return currPoint
    })
    current.stroke();

    setPoints(updatedPoints)
  }

  return (
    <div>
      <h1>Test</h1>
      <Canvas startDrawing={startDrawing}
      finishDrawing={finishDrawing} draw={draw}/>
    </div>
  )
}

export default App
