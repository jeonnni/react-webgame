import { useState } from "react";
import Try from "./Try";


// 숫자 4개를 겹치지 않게 랜덤으로 뽑아 배열로 반환하는 함수
function getNumbers(){ 
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for (let i = 0; i < 4; i+=1) {
        // 후보 배열에서 무작위로 하나 뽑아서 array에 저장
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState(''); // 결과 메시지
    const [value, setValue] = useState(''); // 입력값
    const [tries, setTries] = useState([]); // 시도 기록들
    const [answer, setAnswer] = useState(getNumbers); // 정답 숫자 4개
    /**
     * useState(getNumbers) -> lazy init
     * 1. useState(getNumbers): 처음 한 번만 getNumbers 함수를 실행해서 초기값을 설정. (효율적)
     * 2. useState(getNumbers()): 컴포넌트가 렌더링될 때마다 getNumbers 함수가 실행될 수 있음. (비효율적)  
     */

    const onSubmitForm = (e) => {
        e.preventDefault();
        
        if(value === answer.join('')){ // 정답 맞춘 경우
            setResult('홈런!')
            setTries((preTries)=>{
                return (
                    [...preTries,
                        {try:value , result:'홈런'}
                    ]
                )
            });
            setAnswer(getNumbers());
            setTries([]);
        } else { // 답 다 틀린 경우 
            const answerArray = value.split('').map((v) => parseInt(v)); // 사용자 입력을 숫자 배열로 변환
            let strike = 0;
            let ball = 0;

            if(tries.length>= 9){ // 10번 이상 틀린 경우
                setResult(`10번 이상 틀려서 실패! 답은 ${answer.join(',')}`);
                alert('게임 다시 실행');
                setValue('');
                setAnswer(getNumbers()); //상태를 새로운 숫자 배열로 초기화
                setTries([]);

                return; 
            } 

            // 스트라이크/볼 판정
            for(let i = 0; i < 4; i++){
                if(answerArray[i] === answer[i]){
                    strike += 1;
                } else if(answer.includes(answerArray[i])){
                    ball += 1;
                }
            }

            // 결과 저장 및 입력값 초기화
            setTries(( preTries )=>{
                return(
                    [...preTries, 
                        {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}
                    ]
                )
            })
            setValue('');
        }
    }

    // 입력 필드 값 변경 시 실행
    const onChangeInput = (e) => {
        console.log(answer);
        setValue(e.target.value);
    }


    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v, i)=>
                    <Try key={`${i+1} 차 시도 : `} tryInfo={v}/>
                )}
            </ul>

        </>
    )
} 

export default NumberBaseball;