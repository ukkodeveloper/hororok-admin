/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites(){
    return [
      {
        source: '/api/naver/search',
        destination: 'https://openapi.naver.com/v1/search/local.json'
      },
      {
        source: '/api/kakao/search',
        destination: 'https://dapi.kakao.com/v2/local/search/keyword.json'
      }
    ]
  }
};

export default nextConfig;
