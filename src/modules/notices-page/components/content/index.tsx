import { NewsGrid } from '../news-grid';

export function NoticesPageData() {
  return (
    <>
      <div className="w-full bg-[#007BFF] text-white py-6">
        <h1 className="text-4xl font-bold text-center">Noticias</h1>
      </div>
      <div></div>
      <NewsGrid />
    </>
  );
}
