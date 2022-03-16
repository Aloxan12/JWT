import React, {useEffect} from 'react';
import styles from './App.module.css';
import {useGetAllPostsQuery} from "./redux/postApi";
import {IPost} from "./Type/PostType";


function App() {
    const {data: posts} = useGetAllPostsQuery()

    useEffect(() => {
        console.log('posts', posts)
    }, [posts])

    return (
        <div className={styles.appWrap}>
            <div className={styles.postBlock}>
                <div className={styles.postHeader}>Посты</div>
                <div className={styles.postCreate}>
                    <textarea></textarea>
                    <button>Опубликовать</button>
                </div>
                <ul className={styles.postsItems}>
                    {posts && posts.map((post: IPost, index) => {
                        return (
                            <Post post={post} key={`post-key - ${index}`}/>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;

interface IPostProps{
    post: IPost
}

const Post = ({post}: IPostProps) => {
    return (
        <li className={styles.postsItem}>
            <div className={styles.postsItemTitle}>
                <span className={styles.postsItemAuthor}>от кого . </span>
                <span>Опубликовано: {new Date(post.publicDate).toLocaleString()}</span>
            </div>
            <div className={styles.postsItemContent}>
                {post.message}
            </div>
        </li>
    )
}
