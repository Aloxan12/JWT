import React, { useCallback } from 'react';
import cls from './Post.module.scss';
import moment from 'moment';
import { useDeletePostMutation, useLikePostMutation } from '../../../../../app/core/api/postApi';
import { contentToHtml } from '../../../../../utils/helpers';
import { AppTrash } from '../../../../../shared/ui/AppTrash/AppTrash';
import {
  ToastWrapper,
  ToastWrapperType,
} from '../../../../../Common/Components/ToastWrapper/ToastWrapper';
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
  setCurrentPage: (value: number) => void;
}

export const Post = ({ post, setCurrentPage, isAdmin }: IPostProps) => {
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();

  const likePostHandler = useCallback(() => {
    likePost({ id: post.id });
  }, [post]);

  const deletePostHandler = (onClose?: () => void) => {
    deletePost({ id: post.id }).then((res) => {
      const { data } = res as { data: { status: number; message: string; post: IPost } };
      if (data.status === 204) {
        setCurrentPage(1);
        ToastWrapper({
          msg: data.message.replace(/"/g, ''),
          type: ToastWrapperType.info,
        });
        onClose?.();
      }
    });
  };

  const modsLike: Mods = {
    [cls.likeActive]: post.isLike,
  };

  return (
    <li className={cls.postsItem}>
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
          <div className={classNames(cls.postLikeBlock, modsLike, [])} onClick={likePostHandler}>
            <AppPhoto src={likePhoto} alt="like" width={20} height={20} />
            {post.likeCount}
          </div>
          {isAdmin && (
            <div className={cls.postTrashBlock}>
              <AppTrash
                deleteHandler={deletePostHandler}
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
};
