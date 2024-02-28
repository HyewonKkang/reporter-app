import { createHmac } from 'crypto';
import config from '@/configs/env';

const TENTH_KEY = config.NEXT_PUBLIC_TENTH_KEY;
const TENTH_HOST = config.NEXT_PUBLIC_TENTH_HOST;

export const makeThumbnail = (src: string, size: string) => {
  try {
    const format = `${size}.q90`;
    if (src.endsWith('.gif')) {
      return makeGifThumbnail(src, format);
    }
    const encodedUrl = encodeIfNeeded(src);
    return `https://${TENTH_HOST}/thumb/${format}/?fname=${encodedUrl}`;
  } catch (error) {
    throw error;
  }
};

export const makeGifThumbnail = (src: string, format: string) => {
  const expires = Math.floor(Date.now() / 1000) + 300;
  const encodedUrl = encodeIfNeeded(src);
  const plainText = `GET\n${expires}\n\n\nx-twg-thumb-fname:${src}\n/thumb/${format}/`;
  const signature = encodeURIComponent(
    createHmac('sha1', TENTH_KEY).update(plainText).digest('base64'),
  );

  return `https://${TENTH_HOST}/thumb/${format}/?x-twg-thumb-fname=${encodedUrl}&TWGServiceId=harmony_2024_intern&Expires=${expires}&Signature=${signature}
    `;
};

const encodeIfNeeded = (url: string) => {
  const decodedUrl = decodeURIComponent(url);
  return decodedUrl === url ? encodeURIComponent(url) : url;
};
