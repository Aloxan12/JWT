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
            <div className={styles.postBlock}>
                <div className={styles.postHeader}>Посты</div>
                <ul className={styles.postsItems}>
                    {posts && posts.map(post => {
                        return (
                            <li>
                                {post.message}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
