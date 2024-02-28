import ScrollToTop from '@/components/fab/ScrollToTop';
import Profile from '@/components/profile';
import { isCurrentUserReporter } from '@/actions/auth';
import ListTitle from '@/components/list/ListTitle';
import GuestbookPreview from '@/components/guestbook/GuestbookPreview';
import Button from '@/components/button';
import SWRProvider from '@/components/SWRProvider';
import { getReporter } from '@/actions/reporter';
import Link from 'next/link';
import SearchableList from '@/components/searchableList';

export default async function ReporterPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { keyword?: string };
}) {
  const reporterId = params.id;
  const isOwned = await isCurrentUserReporter(reporterId);
  const searchKeyword = searchParams.keyword;
  const { guestbook, profile, contentList } = await getReporter(reporterId, searchKeyword);

  return (
    <SWRProvider
      value={{
        fallback: { ...guestbook?.fallback, ...profile?.fallback, ...contentList?.fallback },
      }}
    >
      <main>
        <Profile reporterId={reporterId} isOwned={isOwned} />
        {(isOwned || profile?.data.useComment) && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <ListTitle>방명록</ListTitle>
              <Button variant='text' style={{ width: '160px', marginTop: '1rem' }}>
                <Link href={`/guestbook/${reporterId}`} prefetch={false}>
                  전체 보기 ⭢
                </Link>
              </Button>
            </div>
            <GuestbookPreview previewData={guestbook?.data?.content} />
          </>
        )}
        <SearchableList reporterId={reporterId} initialData={contentList?.data} />
        <ScrollToTop />
      </main>
    </SWRProvider>
  );
}
