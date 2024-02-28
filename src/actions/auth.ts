import { createParams } from '@/lib/fetcher';
import { daumAuthCookies } from '@/utils/auth';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';
import config from '@/configs/env';

const AUTH_API_URL = config.NEXT_PUBLIC_AUTH_API_URL;

const getCookieParams = () => {
  const cookieStore = cookies();

  const params = daumAuthCookies.reduce(
    (acc: NextApiRequestCookies, key: DaumCookieParamKeys) => ({
      ...acc,
      [key]: cookieStore.get(key)?.value,
    }),
    {},
  );
  if (Object.keys(params).length < 5) return null;
  return params;
};

export const getLoginAuth = async () => {
  const params = getCookieParams();
  if (!params) return false;

  const cookies = createParams(params, ';');
  const res = await fetch(`${AUTH_API_URL}/auth`, {
    headers: { Cookie: cookies },
  });
  return res.ok && res.status >= 200 && res.status < 400;
};

export const isCurrentUserReporter = async (reporterId: string) => {
  const params = getCookieParams();
  if (!params) return false;

  const cookies = createParams(params, ';');
  const res = await fetch(`${AUTH_API_URL}/auth/reporter/${reporterId}`, {
    headers: { Cookie: cookies },
  });
  if (res.ok) {
    try {
      return await res.json();
    } catch (error) {
      return false;
    }
  }
};
