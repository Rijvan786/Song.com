import { useContext } from "react";
import { Songcontext } from "../Song.context";
import { getsong } from "../services/Song.api";

export const useSong = () => {
    const context = useContext(Songcontext);
    const { Song: song, setSong, Loading, setLoading } = context;

    const handlegetsong = async ({ mood }) => {
        setLoading(true);
        
            const data = await getsong({ mood });
            setSong(data.song);
    ;
       
            setLoading(false);
        
    };

    return {
        song,
        setSong,
        handlegetsong,
        Loading
    };
};
