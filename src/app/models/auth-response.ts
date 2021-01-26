import { Rol } from './rol';

export interface AuthResponse {
    idCuenta: number;
    idUsuario: number;
    roles?: Rol[];
    email: string;
    token: string;
    expiresIn: string;
}
