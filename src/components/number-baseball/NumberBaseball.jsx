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
    const [tries, setTries] = useState('');
    const [answer, setAnswer] = useState(getNumbers());


    const onSubmitForm = (e) => {
        e.preventDefault();

        if(value === answer.join()){

        }else{

        }
    }
    const onChangeInput = (e) => {
        console.log(answer);
        value(e.target.value);
    }

    const fruits = [
        {fruit:'사과',taste:'맛있다'},
        {fruit:'딸기',taste:'맛없다'},
        {fruit:'참외',taste:'달다'},
        {fruit:'배',taste:'시다'},
        {fruit:'귤',taste:'달다'},
    ]


    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {fruits.map((item, idx)=>
                    <Try key={item.fruit + item.taste} value={item} index={idx}/>
                )}
            </ul>

        </>
    )
} 

export default NumberBaseball;