import { useQuery } from '@tanstack/react-query';
import { type Cafe, getCafeListSearched } from '@/app/_api/getCafeListSearched';
import { useState } from 'react';
import debounce from 'lodash/debounce';
export const useGetCafeListQuery = () => {
  // 검색 키워드 (상태)
  const [keyword, setKeyword] = useState('');

  // 선택 값
  const [cafeSelected, setCafeSelected] = useState<Cafe>();

  // 검색
  const query = useQuery({
    queryFn: () => getCafeListSearched(keyword),
    queryKey: [useGetCafeListQuery.key, keyword],
    select: response => response?.items,
    enabled: !!keyword,
    staleTime: 30000,
    gcTime: 60000,
  });

  // 검색 옵션들
  const cafeOptions = query.data?.map(cafe => ({
    label: `${cafe.title.replace(/<[^>]*>/g, '')} ( ${cafe.address} )`,
    value: cafe.title,
  }));

  const selectCafe = (cafeName: string) => {
    const cafe = query.data?.find(cafe => cafe.title === cafeName);
    if (cafe) {
      setCafeSelected(cafe);
    }
  };

  return {
    cafeQuery: query,
    cafeOptions,
    keyword,
    setKeyword,
    cafeSelected,
    selectCafe,
  };
};

useGetCafeListQuery.key = '@admin/cafe_list';
