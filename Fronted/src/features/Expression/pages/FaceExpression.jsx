import { useEffect, useRef, useState } from "react";
import "../style/Expression.scss"
import {detect, init} from "../utills/utills"
import { useSong } from "../../Home/hook/useSong";

export default function FaceExpression({onClick=()=>{}}) {

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef=useRef()
  const [expression, setExpression] = useState("detecting....");
  const {Loading}=useSong()
  console.log(expression);
  function hanldeclick(){
    const expression= detect ({landmarkerRef,videoRef,setExpression,streamRef})
    console.log(expression);
    onClick(expression)
  }

 useEffect(() => {
    init({videoRef,landmarkerRef,streamRef,setExpression});
    if(landmarkerRef.current){
      landmarkerRef.current.close()
    }
    if(videoRef.current?.srcObject){
      videoRef.current.srcObject
      .getTrack()
      .foreach((e)=>e.stop())

    } 
      
  }, []);
  if(Loading){
    return(<main>
      <h1>Loading.....</h1>
    </main>)
  }

  return (
    <div className="Faceexpression">

      <h2>User Expression</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
     
      />

      <h3 >
        Expression: {expression}
      </h3>
      <button className="button"
      onClick={hanldeclick}
      >detect expression</button>

    </div>
  );
}