import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { UsuarioFormType } from '../../../../presentation/interfaces/pages/catalogos/usuarios/usuario.iterface';
import { IAddUsuarioResponse, IUsuarioResponse, IAddUsuarioRequest } from '../../../models/app/usuarios/usuario.model';



export const usuarioCase = () => {
    const { GET, POST, DELETE } = URL.USUARIOS;

    const getUsuarios = async (): Promise<IUsuarioResponse> => {
        const { data } = await instance.get<IUsuarioResponse>(GET);
        return data;
    };

    const addUsuario = async (request: UsuarioFormType): Promise<IAddUsuarioResponse> => {
        const usuario: IAddUsuarioRequest = {
            email: request.correo,
            nombre: request.usuario,
            password: request.password,
        };
        const { data } = await instance.post<IAddUsuarioResponse>(POST, usuario);
        return data;
    };

    const deleteUsuario = async (userId: number): Promise<IAddUsuarioResponse> => {
        
        const { data } = await instance.delete<IAddUsuarioResponse>(`${DELETE}/${userId}`, {data: {userId}});
        return data;
    };

    return {
        getUsuarios,
        addUsuario,
        deleteUsuario,
    };
};