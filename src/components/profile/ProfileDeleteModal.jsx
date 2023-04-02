import propTypes from 'prop-types';
import Modal from '@/components/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/firebase/auth';
import { useDeleteData } from '@/firebase/firestore/useDeleteData';
import { useDeleteFile } from '@/firebase/storage/useDeleteFile';
import useModal from '@/hooks/useModal';

const ProfileDeleteModal = ({ profileId, storageID }) => {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { deleteData } = useDeleteData('users');
  const { deleteFile } = useDeleteFile('profile');

  const { closeModal } = useModal('profile-delete');

  const handleProfileDelete = async () => {
    try {
      await deleteData(`${user.uid}/profile/${profileId}`);
      await deleteFile(`profile/${user.uid}/${storageID}/mobile`);

      await closeModal();
      navigate('/profile-page');
    } catch (error) {
      navigate('/*');
    }
  };

  return (
    <Modal
      message="정말 프로필을 삭제하시겠습니까?"
      onClickHandler={handleProfileDelete}
      cancelHandler={closeModal}
    />
  );
};

export default ProfileDeleteModal;

ProfileDeleteModal.propTypes = {
  profileId: propTypes.string,
  storageID: propTypes.string,
};
