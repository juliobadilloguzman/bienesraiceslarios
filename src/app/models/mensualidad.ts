import { Usuario } from './usuario';
import { Terreno } from './terreno';

export interface Mensualidad {
    idMensualidad: number;
    numeroMensualidad: number;
    fechaPago: string;
    monto: number;
    cantidadConLetra?: string;
    mes: string;
    formaPago: string;
    estatus?: string;
    usuario?: Usuario;
    terreno?: Terreno;
}
