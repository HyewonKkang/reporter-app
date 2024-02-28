import { getAllReporters, getContentList } from '@/actions/reporter';
import SWRProvider from '@/components/SWRProvider';
import List from '@/components/list';
import ListTitle from '@/components/list/ListTitle';
import ReporterGrid from '@/components/reporterGrid';

export default async function Home() {
  const [contentList, reporterList] = await Promise.all([
    getContentList(),
    getAllReporters(),
  ]);

  return (
    <SWRProvider value={{ fallback: { ...contentList?.fallback, ...reporterList?.fallback } }}>
      <main style={{ marginBottom: '2rem' }}>
        <ListTitle>전체 기자</ListTitle>
        <ReporterGrid initialData={reporterList?.data} />
        <ListTitle>최근 기사</ListTitle>
        <List initialData={contentList?.data} />
      </main>
    </SWRProvider>
  );
}
