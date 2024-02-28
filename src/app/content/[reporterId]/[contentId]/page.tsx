import Article from '@/components/article';
import SWRProvider from '@/components/SWRProvider';
import { getContents } from '@/actions/content';

export default async function ContentDetailPage({
  params,
}: {
  params: { reporterId: string; contentId: string };
}) {
  const { reporterId, contentId } = params;
  const { contentData, reporterData } = await getContents(reporterId, contentId);

  return (
    <SWRProvider value={{ fallback: { ...contentData?.fallback, ...reporterData?.fallback } }}>
      <main>
        <Article
          reporterId={reporterId}
          contentId={contentId}
          reporterName={reporterData?.data.name}
        />
      </main>
    </SWRProvider>
  );
}
