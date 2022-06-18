import React, {useState} from 'react';
import {AppButton} from "../../Common/Components/AppButton/AppButton";
import {AppTrash} from "../../Common/Components/AppTrash/AppTrash";
import styles from './ComponentsShow.module.css'
import {AppInput} from "../../Common/Components/AppInput/AppInput";
import {AppRating} from "../../Common/Components/AppRating/AppRating";
import {AppInputFilter} from "../../Common/Components/AppInputFilter";

export const ComponentsShow = () => {
    const [rating, setRating] = useState(0)
    return (
        <div className={styles.ComponentsShowWrapper}>
            <AppButton onClick={(e)=> console.log(e.currentTarget)} />
            <AppTrash deleteHandler={()=>console.log('что-то удалил')} />
            <AppInput
                value={''}
                onChange={(e)=>console.log(e)}
                label={'label'}
                error={'error error errorerror error errorerror  error errorerror '} />
            <AppInputFilter searchParam={'search'} />
            <AppRating value={rating}  onChange={(value)=>setRating(value)}/>
        </div>
    );
};