import { useRef, useState } from "react";



const WordRelay = () => {
    const [word, setWord] = useState('응미');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);


    const onSubmitForm = (e) => {
        e.preventDefault();

        // 기존 단어의 마지막 글자랑 내가 입력한 단어의 첫 글자가 같으면 실행
        if(word[word.length - 1] === value[0]){
            setWord(value);
            setResult('딩동댕');
            setValue('');
            inputRef.current.focus();
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }


    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput}/>
                <button>클릭</button>
            </form>
            <div>{result}</div>
        </>
    )
}

export default WordRelay;