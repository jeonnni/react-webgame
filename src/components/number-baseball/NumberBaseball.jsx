import { useState } from "react";
import Try from "./Try";


//숫자 네 개를 겹치지 않고 랜덤하게 뽑는 수 
function getNumbers(){ 
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
        
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState(''); 
    const [tries, setTries] = useState([]);  
    const [answer, setAnswer] = useState(getNumbers());

    

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(value === answer.join()){
            setResult('홈런!')
            setTries([...tries, {
                try:value, result:"홈런!"
            }])
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));

            let strike = 0;
            let ball = 0;

            for(let i=0; i<4; i+=1){
                if(answerArray[i] === answer[i]){
                    strike +=1;
                }else if(answer.includes(answerArray[i])){
                    ball+=1;
                }
            }

            setTries([...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` }]);

            setValue('');
        }
    }
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