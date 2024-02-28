import React, { ForwardedRef, HTMLAttributes, forwardRef, useState } from 'react';
import styles from './Guestbook.module.css';
import Modal from '../modal';
import Tabs from '../tabs';
import DeleteModalForm from './DeleteModalForm';
import EditModalForm from './EditModalForm';
import VerificationForm from './VerificationForm';
import { toast } from 'react-toastify';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  closeModal?: () => void;
  commentData: Guestbook;
  pageIndex?: number;
}

function CommentModal(
  { open, closeModal, pageIndex, commentData }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isVerified, setIsVerified] = useState(false);
  const { writerKey, id } = commentData;

  const verifyWriter = (input: string) => {
    if (input === writerKey) {
      setIsVerified(true);
      return true;
    } else {
      toast.error('확인번호가 일치하지 않습니다.');
      return false;
    }
  };

  return (
    <Modal open={open} ref={ref}>
      <div className={styles.comment_modal}>
        <h3>방명록 수정/삭제</h3>
        {isVerified ? (
          <Tabs
            items={[
              {
                key: 'edit',
                label: '수정',
                children: (
                  <EditModalForm
                    closeModal={closeModal}
                    commentData={commentData}
                    pageIndex={pageIndex}
                  />
                ),
              },
              {
                key: 'delete',
                label: '삭제',
                children: (
                  <DeleteModalForm
                    closeModal={closeModal}
                    guestBookId={id}
                    reporterId={commentData?.reporterId}
                    pageIndex={pageIndex}
                  />
                ),
              },
            ]}
          />
        ) : (
          <VerificationForm closeModal={closeModal} verifyWriter={verifyWriter} />
        )}
      </div>
    </Modal>
  );
}

export default forwardRef(CommentModal);
