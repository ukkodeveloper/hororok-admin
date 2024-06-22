import ky from 'ky';

interface payload {
  mapx: string;
  mapy: string;
}

export const getIsCafeExist = ({ mapx, mapy }: payload) => {
  return ky.get('https://api.cafe-cok.p-e.kr/api/admin/cafe/exist', {
    searchParams: {
      mapx,
      mapy,
    },
  });
};
