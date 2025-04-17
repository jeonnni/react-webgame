import { Component } from "react";
import styles from './RSP.module.css';



const repCoords = {
    바위:'0',
    가위:'-142px',
    보:'-284px',
};
const scores = {
    바위: '',
    가위:'1',
    보:-1,
}

// class 가위 바위 보
class RSP extends Component {

    state = {
        retrun: '',
        score: 0,
        imgCoord: 0,
    };


    interval;
    componentDidMount(){ //컴포넌트가 첫 렌더링 후 (비동기 요청)
        this.interval = setInterval(()=>{
            console.log('test', this.state.imgCoord);
            
            const {imgCoord} = this.state;
            // console.log(repCoords.가위);
            // console.log(imgCoord);

            if(imgCoord.toString() === repCoords.바위){
                this.setState({
                    imgCoord: repCoords.가위
                })
            }else if(imgCoord.toString() === repCoords.가위){
                this.setState({
                    imgCoord: repCoords.보
                })
            }else if(imgCoord.toString() === repCoords.보){
                this.setState({
                    imgCoord: repCoords.바위
                })
            }
        }, 1000);
    }
    componentDidUpdate(){ //리렌더링 후 

    }
    componentWillUnmount(){ //컴포넌트가 제거되기 직전 (비동기요청 정리)
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {
        clearInterval(this.interval);
        const myScore = scores[choice];
    };

    render() {
        const { result, score, imgCoord } = this.state; //결과,점수,이미지의 좌표
        return (
            <>
                <div className={styles.computer} id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={()=>this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={()=>this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={()=>this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score} 점</div>
            </>
        )
    };
}

export default RSP;