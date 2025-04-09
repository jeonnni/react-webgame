import { Component } from "react";


class Test extends Component {
    state = {
        counter:0,
    }

    /**
     * render 처럼 react에서 지원하는 메서드
     * 어떤 경우에 렌더링을 해야 되는지 직접 적어줘야 된다
     */
    shouldComponentUpdate(nextprops, nextState, nextContext){
        //this.state.counter 현재 카운터 nextState.counter 미래 바뀌는 카운터
        if(this.state.counter !== nextState.counter){
            return true; //렌더링 O
        }
        return false; //렌더링 X
    }

    onClickBtn = () => {
        this.setState({});
    }
    render () {
        console.log(`렌더링 : ${this.state}`)
        return(
            <div>
                <button onClick={this.onClickBtn}>버튼</button>
            </div>
        )
    }
}

export default Test;