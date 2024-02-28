import Dashboard from '@/components/dashboard';
import SWRProvider from '@/components/SWRProvider';
import { getInsightData } from '@/actions/insight';
import BackButton from '@/components/button/BackButton';

export default async function InsightPage({ params }: { params: { reporterId: string } }) {
  const { reporterId } = params;

  const [insightData, topData, topContents] = await getInsightData(reporterId);

  return (
    <SWRProvider
      value={{
        fallback: {
          ...insightData?.fallback,
          ...topData?.fallback,
          ...topContents?.fallback,
        },
      }}
    >
      <main style={{ padding: '1rem' }}>
        <BackButton reporterId={reporterId} />
        <Dashboard reporterId={reporterId} />
      </main>
    </SWRProvider>
  );
}
