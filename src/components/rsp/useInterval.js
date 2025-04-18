import { useEffect, useRef } from "react";

function useInterval(callback, delay) {

    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback;
    });

    //타이머 설정
    useEffect(()=>{
        function tick() {
            savedCallback.current();
        }

        if(delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    },[delay]);

    return savedCallback.current;
}

export default useInterval;
