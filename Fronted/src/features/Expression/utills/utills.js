import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
 export const init = async ({videoRef,landmarkerRef,streamRef,setExpression}) => {

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        numFaces: 1
      }
    );

         streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    videoRef.current.srcObject = streamRef.current;

    videoRef.current.onloadeddata = () => {
    detect({setExpression,landmarkerRef,videoRef,streamRef})
    };
  };

 export const detect = ({landmarkerRef,videoRef,setExpression}) => {

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      Date.now()
    );

    if (results.faceBlendshapes.length > 0) {

      const shapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        shapes.find((s) => s.categoryName === name)?.score || 0;

      const mouthSmileRight = getScore("mouthSmileLeft");
      const mouthSmileLeft = getScore("mouthSmileRight");
      const mouthOpen = getScore("jawOpen");
      const browUpInner=getScore("browInnerUp")
      const mouthFrownLeft=getScore("mouthFrownLeft")
      const mouthFrownRight=getScore("mouthFrownRight")

      let detected = "Neutral";

      if (mouthSmileRight > 0.5  && mouthSmileLeft>0.5) detected = "Happy";
      else if (mouthOpen > 0.5 && browUpInner) detected = "Serprised";
      else if(mouthFrownRight>0.001 && mouthFrownLeft>0.001)detected="Sad"

      setExpression(detected);
      return detected
    }

 
  };