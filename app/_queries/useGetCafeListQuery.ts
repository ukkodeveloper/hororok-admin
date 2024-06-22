import { useQuery } from '@tanstack/react-query';
import { getCafeListSearched } from '@/app/_api/getCafeListSearched';
import { useState } from 'react';

export const useGetCafeListQuery = () => {
  // 검색 키워드 (상태)
  const [keyword, setKeyword] = useState('');

  // 선택 값
  const [cafeSelected, setCafeSelected] = useState<string>();

  // 검색
  const query = useQuery({
    queryFn: () => getCafeListSearched(keyword),
    queryKey: [useGetCafeListQuery.key, keyword],
    select: response =>
      response?.documents.map(cafe => ({
        ...cafe,
        title: cafe.place_name.replace(/<[^>]*>/g, ''),
      })),
    enabled: !!keyword,
    staleTime: 30000,
    gcTime: 60000,
  });
  // 검색 옵션들
  const cafeOptions = query.data?.map(cafe => ({
    label: `${cafe.title} ( ${cafe.road_address_name} )`,
    value: cafe.title,
  }));

  const getCafeMeta = (cafeName: string) => {
    const cafe = query.data?.find(cafe => cafe.title === cafeName);
    if (!cafe) {
      return;
    }
    return {
      title: cafe.title,
      coordinates: [cafe.x, cafe.y],
      address: cafe.road_address_name,
      telephone: cafe.phone,
    };
  };

  return {
    cafeQuery: query,
    cafeOptions,
    keyword,
    setKeyword,
    cafeSelected,
    setCafeSelected,
    getCafeMeta,
  };
};

useGetCafeListQuery.key = '@admin/cafe_list';
