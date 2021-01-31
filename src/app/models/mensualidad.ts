import { Usuario } from './usuario';
import { Terreno } from './terreno';

export interface Mensualidad {
    idMensualidad?: number;
    numeroMensualidad: number;
    numeroRecibo: string;
    fechaPago: string;
    monto: number;
    cantidadConLetra?: string;
    mes: string;
    formaPago: string;
    estatusPago: string;
    interes?: number;
    estatusInteres?: string;
    estatus?: string;
    usuario?: Usuario;
    terreno?: Terreno;
    terrenoIdTerreno?: number;
}
