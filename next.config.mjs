/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites(){
    return [
      {
        source: '/api/naver/search',
        destination: 'https://openapi.naver.com/v1/search/local.json'
      }
    ]
  }
};

export default nextConfig;
