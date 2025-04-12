import { Component } from "react";
import styles from './ResponseCheck.module.css';


class ResponseCheck extends Component {

    state = {
        state : 'waiting',
        message : '클릭해서 시작하세요.',
        result: [],
    };

    timeout;
    startTime; //시작시간
    endTime; //끝시간

    onClickScreen = () => {
        const { state, message, result } = this.state;

        if(state === 'waiting'){
            this.setState({
                state : 'ready',
                message : '초록색이 되면 클릭해주세요.',
            });
            this.timeout = setTimeout(()=>{
                this.setState({
                    state: 'now',
                    message: '지금 클릭'
                });
                this.startTime = new Date();

            }, Math.floor( Math.random() * 1000 ) + 2000 ); // 2~3초 랜덤 

        } else if ( state === 'ready' ){
            clearTimeout(this.timeout); //timeout 초기화

            this.setState({
                state: 'waiting',
                message: '이런! 너무 성급하세요~ 초록색이 된 후에 클릭하세요',
            })

        } else if ( state === 'now' ){ // 반응속도 체크
            this.endTime = new Date(); 
            console.log("측정 시간:", this.endTime - this.startTime);
            console.log("기존 result:", this.state.result);

            this.setState(( prevState ) => ({
                state: 'waiting',
                message: '클릭해서 시작하세요',
                result: [...prevState.result, this.endTime - this.startTime], //기존값, 새로운값
            }));
            
        }
    };

    renderAverage = () => {
        const { result } = this.state;
        return (
            result.length === 0 
            ? null : <div>평균 시간 : {result.reduce((a,c)=> a+c) / result.length} ms</div>
        
        )
    }
    
    
    render() {
        return (
            <>
                <div 
                    className={`${styles.screen} ${styles[this.state.state]}`} 
                    onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                <div>{this.renderAverage()}</div>
            </>
        );   
    }
}

export default ResponseCheck;