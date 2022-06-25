import React, {useEffect, useState} from 'react';
import {AppInput} from "./AppInput/AppInput";
import {useSearchParams} from "react-router-dom";

interface IAppInputFilter{
    searchParam: string
    label?: string
    placeholder?: string
}

export const AppInputFilter = ({searchParam, label, placeholder}:IAppInputFilter) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState(searchParams.get(searchParam))

    const onChangeHandler =()=>{
        const isParam = !!searchParams.get(searchParam)
        if(!isParam && !!state){
            searchParams.append(searchParam, state)
        }else if(!!state){
            searchParams.set(searchParam, state)
        }else if(!state){
            searchParams.delete(searchParam)
        }
        setSearchParams(searchParams.toString())
    }

    useEffect(()=>{
        const handler = setTimeout(()=>{
            onChangeHandler()
        },500)

        return () => {
            clearTimeout(handler)
        }
    },[state])

    const changeHandler =(value: string)=>{
        setState(value)
    }

    return (
        <AppInput value={state} onChange={changeHandler} label={label} placeholder={placeholder}/>
    );
};