import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../../components/layout.componet';
import { Home } from '../../pages/home/Home.page';
import { Usuarios } from '../../pages/catalogos/usuarios/Usuarios.page';
import { ActividadEconomica } from '../../pages/catalogos/actividadeconomica/ActividadEconomica.page';

export const ContratosRouter = () => {
    return (
        <Layout>
            <Routes>
                <>
                <Route path="/home" element={<Home/>}/>
                <Route path="/usuarios" element={<Usuarios/>}/>
                <Route path="/actividadeconomica" element={<ActividadEconomica/>}/>
                <Route path="/*" element={<Navigate to="/home"/>}/>
                </>
            </Routes>
        </Layout>
    );
};
