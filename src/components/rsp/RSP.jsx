import { Component } from "react";
import styles from './RSP.module.css';


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



// class 가위 바위 보
class RSP extends Component {

    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };


    interval;
    componentDidMount(){ //컴포넌트가 첫 렌더링 후 (비동기 요청)
        this.interval = setInterval(this.changeHand,500);
    }
    componentDidUpdate(){ //리렌더링 후 

    }
    componentWillUnmount(){ //컴포넌트가 제거되기 직전 (비동기요청 정리)
        clearInterval(this.interval);
    }
    changeHand = () => {
        console.log('test', this.state.imgCoord);
            
        const { imgCoord } = this.state;
        if(imgCoord.toString() === rspCoords.바위){
            this.setState({
                imgCoord: rspCoords.가위
            })
        }else if(imgCoord.toString() === rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보
            })
        }else if(imgCoord.toString() === rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위
            })
        }
    }

    // 게임 버튼 클릭 시 실행되는 함수
    onClickBtn = (choice) => () => { 
        const { imgCoord } = this.state; // 현재 컴퓨터가 보여주고 있는 손 모양의 좌표를 가져옴
        clearInterval(this.interval); // 자동으로 손 바꾸는 interval을 멈춤 (게임 중에는 고정)
    
        const myScore = scores[choice]; // 내가 고른 손에 해당하는 점수 (가위:1, 바위:0, 보:-1)
        const cpuScore = scores[computerChoice(imgCoord)]; // 컴퓨터의 손에 해당하는 점수 계산
        const diff = myScore - cpuScore; // 내 점수와 컴퓨터 점수의 차이로 승패 결정
    
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });
        } else if ([-1, 2].includes(diff)) { // -1 또는 2면 내가 이긴 경우
            this.setState((prevState) => {
                return {
                    result: '이겼습니다',
                    score: prevState.score + 1, 
                };
            });
        } else { 
            this.setState((prevState) => {
                return {
                    result: '졌습니다',
                    score: prevState.score - 1, 
                };
            });
        }
    
        setTimeout(()=>{
            // 결과를 보여준 뒤 다시 자동으로 손 바꾸는 interval 재시작
            this.interval = setInterval(this.changeHand, 1000);
        }, 2000);
    };
    

    render() {
        const { result, score, imgCoord } = this.state; //결과,점수,이미지의 좌표
        return (
            <>
                <div className={styles.computer} id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score} 점</div>
            </>
        )
    };
}

export default RSP;