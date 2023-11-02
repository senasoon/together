import { useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './index';
import { useRecoilState } from 'recoil';
import { authStateAtom } from '@/store/authState';

export function useAuthState() {
  const [authState, setAuthState] = useRecoilState(authStateAtom);

  useEffect(() => {
    setAuthState({ isLoading: true, user: null, error: null });
    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setAuthState({ isLoading: false, user: currentUser, error: null });
      },
      (error) => {
        setAuthState({ user: null, isLoading: false, error: error });
      }
    );
  }, []);

  return useMemo(
    () => ({
      authState,
    }),
    [authState]
  );
}
