import { useState } from "react";
import styles from './RSP.module.css';
import useInterval from "./useInterval"; 




const rspCoords = {
    바위:'0',
    가위:'-142px',
    보:'-284px',
};
const scores = {
    가위: 1,
    바위:0,
    보:-1,
};
const computerChoice = (imgCoord) => { //컴퓨터가 현재 어떤 손내고 있는지 판단
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};


const RSPHooks = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [isRunning, setIsRunning] = useState(true); //interval을 멈추기 위한 state 
    // const interval = useRef();
    // // useEffect는 컴포넌트가 처음 화면에 나타날 때 + imgCoord가 바뀔 때마다 실행됨
    // useEffect(()=>{ //componentDidMount,componentDidUpdate 역할 (1:1대응 X)
    //     console.log('다시 실행')
    //     interval.current = setInterval(changeHand,500);

    //     // 클린업 함수: 이전에 설정된 interval을 정리 (중복 방지용)
    //     return()=>{ //componentWillUnmount 역할
    //         console.log('종료')
    //         clearInterval(interval.current); // interval 제거
    //     };
        
    // },[imgCoord]); // imgCoord가 바뀔 때마다 위 코드 블록이 실행됨

    const changeHand = () => {
        if(imgCoord.toString() === rspCoords.바위){
            setImgCoord(rspCoords.가위)
        }else if(imgCoord.toString() === rspCoords.가위){
            setImgCoord(rspCoords.보)
        }else if(imgCoord.toString() === rspCoords.보){
            setImgCoord(rspCoords.바위)
        }
    }
    useInterval(changeHand, isRunning ? 100 : null);
    
    //1. 버튼 클릭시 
    const onClickBtn = (choice) => () => {
        //2. (true)손이 움직이고 있을때 멈춤 
        if(isRunning){ 
            // 3. (false)로 만들어서 interval을 멈춤
            setIsRunning(false) 
            const myScore = scores[choice]; // 내가 고른 손에 해당하는 점수 (가위:1, 바위:0, 보:-1)
            const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터의 손에 해당하는 점수 계산
            const diff = myScore - cpuScore; // 내 점수와 컴퓨터 점수의 차이로 승패 결정
        
            if (diff === 0) {
                setResult('비겼습니다.');
            } else if ([-1, 2].includes(diff)) { 
                setResult('이겼습니다.');
                setScore((prevScore) => prevScore + 1);
            } else { 
                setResult('졌습니다');
                setScore((prevScore)=> prevScore - 1);
            }
        
            setTimeout(()=>{
                // 4. 1초 뒤에는 다시 (true) 로 만들어서 interval 재시작
                setIsRunning(true);
            }, 1000);
        }
    }

    return(
        <>
            <div className={styles.computer} id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score} 점</div>
        </>
    )
}

export default RSPHooks;