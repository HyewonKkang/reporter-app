import BackButton from '@/components/button/BackButton';
import GuestBook from '@/components/guestbook';
import ScrollToTop from '@/components/fab/ScrollToTop';
import { getReporterGuestbook } from '@/actions/guestbook';
import SWRProvider from '@/components/SWRProvider';

export default async function GuestbookPage({ params }: { params: { reporterId: string } }) {
  const { reporterId } = params;
  const guestbook = await getReporterGuestbook(reporterId);

  return (
    <SWRProvider value={{ fallback: guestbook?.fallback }}>
      <main>
        <BackButton reporterId={reporterId} />
        <GuestBook reporterId={reporterId} initialData={guestbook?.data} />
        <ScrollToTop />
      </main>
    </SWRProvider>
  );
}
