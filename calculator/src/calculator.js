import React, {useState} from "react";
import styles from './calculator.css';
const Calculator = () =>{
    const [input, setInput] = useState('');
    const [result, setResult] = useState('0');

    const handleClick = (value) =>{
        if(value === '='){
            try{
                setResult(eval(input).toString());
            }
            catch(error){
                setResult("unexpected error")
            }
        }
        else if(value === 'C'){
            setInput('');
            setResult('0')
        }
        else{
            setInput(input + value);
        }
    }

    const button = [
        {id:'clear', value: 'C'},
        {id:'equals', value:'='},
        {id:'add', value:'+'},
        {id:'subtract', value:'-'},
        {id:'multiply', value:'*'},
        {id:'divide', value:'/'},
        {id:'decimal', value:'.'},
        {id:'zero', value:'0'},
        {id:'one', value:'1'},
        {id:'two', value:'2'},
        {id:'three', value:'3'},
        {id:'four', value:'4'},
        {id:'five', value:'5'},
        {id:'six', value:'6'},
        {id:'seven', value:'7'},
        {id:'eight', value:'8'},
        {id:'nine', value:'9'}
    ]

    return(
        <div className={styles.container}>
            <div className="display">
                <div className="input" id="input">{input || 0}</div>
                <div className="results" id="result">{result}</div>
            </div>
            <div className={styles.button}>
                {button.map((btn)=>(
                    <button key={btn.id} id={btn.id} onClick={() => handleClick(btn.value)}>{btn.value}</button>
                ))}
            </div>
        </div>
    );
};
export default Calculator;