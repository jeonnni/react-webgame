import { useEffect, useRef } from "react";


//  const [isRunning, setIsRunning] = useState(true);
//  useInterval(()=>{
//      console.log('hello');   
//  }, isRunning ? 1000 : null);




// 일정 시간마다 특정 함수를 실행해주는 `커스텀 훅`
// 두 번째 인자가 null이 아니면, callback 함수를 주기적으로 실행함
function useInterval(callback, delay) {

    const savedCallback = useRef(); // 최신 callback을 기억

    useEffect(()=>{
        savedCallback.current = callback; // 최신 callback으로 업데이트
    });

    useEffect(()=>{ 
        //setInterval이 항상 최신 callback을 실행하도록 보장하기 위해서 사용하고
        //그 안에서 savedCallback.current()를 호출해서 '항상 가장 최신 콜백'을 실행할 수 있음
        function tick() { 
            savedCallback.current(); 
        }

        // delay가 null이 아니면 interval 시작
        if(delay !== null){
            let id = setInterval(tick, delay); // tick은 최신 콜백을 실행함
            return () => clearInterval(id);  // interval 정리
        }
    },[delay]);

    return savedCallback.current;
}

export default useInterval;
