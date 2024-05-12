import ky from 'ky';

export interface CafeListResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: Cafe[];
}

export interface Cafe {
  title: string;
  link?: string;
  category: string;
  description?: string;
  telephone?: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

export const getCafeListSearched = (keyword: string) => {
  return ky
    .get('/api/naver/search', {
      searchParams: {
        query: keyword,
        display: 5,
      },
      headers: {
        'X-Naver-Client-Id': process.env['NEXT_PUBLIC_X_NAVER_ID'],
        'X-Naver-Client-Secret': process.env['NEXT_PUBLIC_X_NAVER_SECRET'],
      },
    })
    .then(response => response.json<CafeListResponse>());
};
