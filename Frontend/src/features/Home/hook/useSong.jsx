import { GetSong} from "../services/Song.api";
import {setLoading,setError} from "../../auth/states/auth.slice"
import { setSong} from "../states/song.slice";
import {useDispatch} from "react-redux"
export const useSong = () => {
 const dispatch=useDispatch()

    const handleGetSong = async ({ mood }) => {
     
         try{
                  dispatch(setLoading(true))
        
            const data = await GetSong({ mood });
            
            dispatch(setSong(data.song))
    
         }
         catch(err){
               dispatch( setError(err.message))
         }
         finally{
                dispatch(setLoading(false))
         }
           
        
    };

    return {
        handleGetSong,};
};
