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
    // useEffect(()=>{ //componentDidMount,componentDidUpdate 역할 (1:1대응 X)
    //     interval.current = setInterval(changeHand,500);
    //     return()=>{ //componentWillUnmount 역할
    //         clearInterval(interval.current); 
    //     };
    // },[imgCoord]);

    const changeHand = () => {
        if(imgCoord.toString() === rspCoords.바위){
            setImgCoord(rspCoords.가위)
        }else if(imgCoord.toString() === rspCoords.가위){
            setImgCoord(rspCoords.보)
        }else if(imgCoord.toString() === rspCoords.보){
            setImgCoord(rspCoords.바위)
        }
    }

    //isRunning이 false가 되면 interval을 멈추고 true일 때만 동작
    useInterval(changeHand, isRunning ? 100 : null); 
    
    const onClickBtn = (choice) => () => {
        if(isRunning){ 
            setIsRunning(false) //(false)로 만들어서 interval을 멈춤
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
                setIsRunning(true); //interval 재시작
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