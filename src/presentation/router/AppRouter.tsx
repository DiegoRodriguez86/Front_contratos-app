import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRouter } from './Auth/AuthRouter';
import { ContratosRouter } from './Contratos/ContratosRouter';
import { useAuthStore } from '../hooks/pages/auth/useAuthStore.hook';
import { useEffect } from 'react';


export const AppRoter = () => {

  const { isLoading, isLogged, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [isLoading]);


  return (
    <Routes>
      {
        (!isLogged)
          ? (
            <>
              <Route path='/auth/*' element={<AuthRouter />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path='/*' element={<ContratosRouter />} />
            </>
          )
      }
    </Routes>
  );
};
