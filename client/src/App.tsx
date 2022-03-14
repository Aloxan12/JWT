import React, {useEffect} from 'react';
import styles from './App.module.css';
import {useGetAllPostsQuery} from "./redux/authApi";


function App() {
    const {data: posts} = useGetAllPostsQuery()

    useEffect(() => {
        console.log('posts', posts)
    }, [posts])

    return (
        <div className={styles.appWrap}>
            <h2>Посты</h2>
            <ul>
                {posts && posts.map(post => {
                    return (
                        <li>
                            {post.message}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
