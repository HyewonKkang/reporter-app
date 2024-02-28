import React, { ButtonHTMLAttributes } from 'react';
import Button from '.';
import { AiOutlineLike } from 'react-icons/ai';
import useLike from '@/hooks/useLike';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  likeCount?: number;
  getUrl: string;
  putUrl: string;
}

export default function LikeButton({ likeCount, getUrl, putUrl, ...rest }: Props) {
  const { handleLikeButton } = useLike(putUrl, getUrl);

  return (
    <Button variant='tag' onClick={handleLikeButton} {...rest}>
      <AiOutlineLike />
      {likeCount}
    </Button>
  );
}
