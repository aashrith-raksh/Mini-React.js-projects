import { useState } from "react";

export default function useInput(initialValue){
    const [inputValue, setInputValue] = useState(initialValue);
    const [inputBlur, setInputBlur] = useState(false);

    function handleInputChange(useEnteredValue){
        setInputValue(useEnteredValue);
        inputBlur && setInputBlur(false);
    }

    function handleInputBlur(){
        setInputBlur(true);
    }

    return {
        inputValue, 
        inputBlur, 
        handleInputBlur, 
        handleInputChange
    }
}