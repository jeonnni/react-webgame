import { useRef, useState } from 'react';
import styles from './ResponseCheck.module.css';

// hooks 전환
const ResponseCheckHooks = () => {
    const [ value, setValue ] = useState('waiting');
    const [ message, setMessage ] = useState('클릭해서 시작하세요.');
    const [ result, setResult ] = useState([]);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const timeOutRef = useRef(null);

    const onClickScreen = () => {
        if(value === 'waiting'){
            setValue('ready');
            setMessage('초록색이 되면 클릭해주세요.');

            timeOutRef.current = setTimeout(()=> {
                setValue('now');
                setMessage('지금 클릭');
                startTimeRef.current = new Date();
            }, Math.floor(Math.random()*1000)+2000);

            
        } else if(value === 'ready'){
            clearTimeout(timeOutRef.current); //초기화
            setValue('waiting');
            setMessage('이런! 너무 성급하세요~ 초록색이 된 후에 클릭하세요');

        } else if(value === 'now'){
            endTimeRef.current = new Date();
            setValue('waiting');
            setMessage('클릭해서 시작하세요')
            setResult((prevResult)=>{
                return [...prevResult, endTimeRef.current - startTimeRef.current];
            });
        };
    }

    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return (
            result.length === 0 
            ? null 
            : <>
                <div>평균시간 : {result.reduce((a,c)=> a+c) / result.length} ms</div>
                <button onClick={onReset}>리셋하기</button>
            </>
        )
    }


    return (
        <>
            <div className={`${styles.screen} ${styles[value]}`} onClick={onClickScreen}>{message}</div>
            <div>{renderAverage()}</div>
        </>
    )
}

export default ResponseCheckHooks;