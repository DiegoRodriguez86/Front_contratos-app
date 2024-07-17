import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../../components/layout.componet';
import { Home } from '../../pages/home/Home.page';
import { Usuarios } from '../../pages/catalogos/usuarios/Usuarios.page';
import { ActividadEconomica } from '../../pages/catalogos/actividadeconomica/ActividadEconomica.page';
import { ActividadImss } from '../../pages/catalogos/actividadimss/ActividadImss.page';
import { Bancos } from '../../pages/catalogos/banco/Banco.page';
import { Cargos } from '../../pages/catalogos/cargo/Cargo.page';

export const ContratosRouter = () => {
    return (
        <Layout>
            <Routes>
                <>
                <Route path="/home" element={<Home/>}/>
                <Route path="/usuarios" element={<Usuarios/>}/>
                <Route path="/actividadeconomica" element={<ActividadEconomica/>}/>
                <Route path='/actividadimss' element={<ActividadImss/>}/>
                <Route path='/banco' element={<Bancos/>}/>
                <Route path='/cargo' element={<Cargos/>}/>
                <Route path="/*" element={<Navigate to="/home"/>}/>
                </>
            </Routes>
        </Layout>
    );
};
