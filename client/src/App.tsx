import React, {useEffect} from 'react';
import styles from './App.module.css';
import {useGetAllPostsQuery} from "./redux/postApi";
import {IPost} from "./Type/PostType";
import {Posts} from "./Pages/Posts/Posts";


function App() {
    return (
        <div className={styles.appWrap}>
            <Posts />
        </div>
    );
}

export default App;
