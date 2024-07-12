import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login/Login.page';
import { Register } from '../../pages/login/Register.page';

export const AuthRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
        <Route path="*" element={<Navigate to="/auth/login"/> } />
    </Routes>
  );
};
