import { FetchError } from './error';

class ApiFetch {
  private async request<T>(path: RequestInfo, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
    const res = await fetch(path, { ...options, headers });
    if (res.ok) {
      return res.json().catch(() => null);
    }
    throw new FetchError('Failed to fetch data', res.status);
  }

  get = async <T>(path: RequestInfo, options?: RequestInit): Promise<T> => {
    return await this.request<T>(path, { ...options, method: 'GET' });
  };

  getAll = async <T>(paths: RequestInfo[], options?: RequestInit): Promise<T[]> => {
    return await Promise.all(
      paths.map((path) => {
        return this.request<T>(path, options);
      }),
    );
  };

  post = async <T>(path: RequestInfo, body?: any, options?: RequestInit): Promise<T> => {
    return await this.request<T>(path, { ...options, body: JSON.stringify(body), method: 'POST' });
  };

  put = async <T>(path: RequestInfo, body?: any, options?: RequestInit): Promise<T> => {
    return await this.request<T>(path, { ...options, body: JSON.stringify(body), method: 'PUT' });
  };

  delete = async <T>(path: RequestInfo, options?: RequestInit): Promise<T> => {
    return await this.request<T>(path, { ...options, method: 'DELETE' });
  };
}

export const api = new ApiFetch();
