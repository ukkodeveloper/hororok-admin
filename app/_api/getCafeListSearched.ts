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

export interface KaKaoCafeList {
  documents: KaKaoCafe[];
}

export interface KaKaoCafe {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export const getCafeListSearched = (keyword: string) => {
  return ky
    .get('/api/kakao/search', {
      searchParams: {
        query: keyword,
      },
      headers: {
        Authorization: process.env['NEXT_PUBLIC_X_KAKAO'],
      },
    })
    .then(response => response.json<KaKaoCafeList>());
};
