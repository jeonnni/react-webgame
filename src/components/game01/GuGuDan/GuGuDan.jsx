import { useRef, useState } from "react";

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");

    const inputRef = useRef(null);

    // console.log(value + "value");

    const onSubmit = (e) => {
        e.preventDefault(); //폼 제출 시 새로고침 방지

        if(parseInt(value) === first * second){
            const quizResult = first * second;

            setResult(`${quizResult} , 정답!`);
            setFirst(Math.ceil(Math.random() * 9)); // 새 문제 출제
            setSecond(Math.ceil(Math.random() * 9)); 
            setValue(""); //입력 필드 초기화

            inputRef.current.focus();
        } else {
            setResult("오답! 다시 시도하세요.");
            setValue(""); //입력 필드 초기화 

            inputRef.current.focus();
        }
    }



    return (
        <>
            <div>
                {first} 곱하기 {second} 는?
            </div>

            <form onSubmit={onSubmit}>
                <input 
                    ref={inputRef}
                    type="number" 
                    value={value} 
                    onChange={(e)=>setValue(e.target.value)} 
                />
                <button>입력!</button>
            </form>

            <div>{result}</div>
            
        </>
    );
}

export default GuGuDan;