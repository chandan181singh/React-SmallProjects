import {React, useState} from 'react';
import './page.css'
const ColorButton = ({ color,  handleClick}) => {
    return (
      <button className={`${color} text-white px-4 py-2 rounded m-5 border-2`} onClick={handleClick}>
        {color} Button
      </button>
    );
  };

  const Btn = ({name})=>{
    const [A, setA] = useState(()=>0);
    return(
      <button className='bg-slate-500 text-white px-4 py-2 rounded m-2' onClick={()=>setA(prev => prev+1)}>{name}:{A}</button>
    )
  }
function App() {
  const [color, setColor] = useState("black");
  const [A, setA] = useState(()=>0);
  function handleClick(color){
    setColor(color);
  }

  return (
    <div className={`w-full h-screen ${color}`}>
      <ColorButton color="red" handleClick={()=>handleClick("red")}/>
      <ColorButton color="green" handleClick ={()=>handleClick("green")}/>
      <ColorButton color="black" handleClick ={()=>handleClick("black")}/>
      
      <div className='m-20'>
        <button className='bg-slate-500 text-white px-4 py-2 rounded m-2' onClick={()=>setA(prev => prev+1)}>A:{A}</button>
        <button className='bg-slate-500 text-white px-4 py-2 rounded m-2' onClick={()=>setA(prev => prev+1)}>A:{A}</button>
        <Btn name="B"/>
        <Btn name="C"/>
      </div>
    </div>
  );
}
export default App;

