import React, { memo } from 'react';
import cls from './Post.module.scss';
import moment from 'moment';
import { contentToHtml } from '../../../../../utils/helpers';
import { AppTrash } from '../../../../../shared/ui/AppTrash/AppTrash';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import likePhoto from '../../../../../utils/images/like.png';
import { AppAvatar } from '../../../../../shared/ui/AppAvatar/AppAvatar';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppText } from '../../../../../shared/ui/AppText/AppText';
import { AppPhoto } from '../../../../../shared/ui/AppPhoto/AppPhoto';
import { classNames, Mods } from '../../../../../shared/lib/classNames/classNames';

interface IPostProps {
  isAdmin: boolean;
  post: IPost;
  measureRef?: (node: HTMLElement | null) => void;
  likePostHandler: (id: string) => () => void;
  deletePostHandler: (id: string) => () => void;
}

export const Post = memo(
  ({ post, isAdmin, measureRef, likePostHandler, deletePostHandler }: IPostProps) => {
    const modsLike: Mods = {
      [cls.likeActive]: post.isLike,
    };

    return (
      <li className={cls.postsItem} ref={measureRef}>
        <Flex max justify="between">
          <Flex gap="8">
            <AppAvatar src={post.author?.avatar || ''} />
            <AppText
              text={post.author.email}
              color="violet"
              bold="600"
              isEllipsis
              className={cls.email}
            />
          </Flex>
          <Flex gap="8">
            <div
              className={classNames(cls.postLikeBlock, modsLike, [])}
              onClick={likePostHandler(post.id)}
            >
              <AppPhoto src={likePhoto} alt="like" width={20} height={20} />
              {post.likeCount}
            </div>
            {isAdmin && (
              <div className={cls.postTrashBlock}>
                <AppTrash
                  deleteHandler={deletePostHandler(post.id)}
                  size={'medium'}
                  text="Вы действительно хотите удалить данный пост?"
                />
              </div>
            )}
          </Flex>
        </Flex>
        <div className={cls.postDateBlock}>
          <span>
            <span>Опубликовано:</span>{' '}
            {moment(post.publicDate).format('DD-MM-YYYY') || 'Дата не зафикирована'}
          </span>
        </div>
        <div className={cls.postsItemContent}>{contentToHtml(post.postText)}</div>
      </li>
    );
  }
);
