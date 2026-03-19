import React from 'react'
import FaceExpression from '../../Expression/pages/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hook/useSong'

const Home = () => {
        const {handlegetsong,Loading} =useSong()

        if(Loading){
          return(<main>
            <h1>Loading........</h1>
          </main>)
        }
  return (
<>
<FaceExpression  onClick={(expression)=>{handlegetsong({mood:expression})}} />
<Player/>
</>  

  )
}

export default Home