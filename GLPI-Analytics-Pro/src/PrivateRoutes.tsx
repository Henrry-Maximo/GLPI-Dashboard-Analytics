import { Navigate, Route, Routes } from 'react-router-dom';

import Main from './pages/main';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    );
};