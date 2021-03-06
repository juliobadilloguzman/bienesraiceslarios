import { Usuario } from './usuario';
import { Fraccionamiento } from './fraccionamiento';
import { Vendedor } from './vendedor';

export interface Terreno {
    idTerreno: number;
    noManzana: number
    noLote: number;
    superficie: number;
    costoM2: number;
    enganche?: number;
    formaPagoEnganche?: string;
    pagoAlContado?: number;
    costoTotal: number;
    saldo: number;
    fechaVenta: string;
    noMensualidades?: number;
    montoMensualidad?: number;
    diaPagoDel?: number;
    diaPagoAl?: number;
    pagoDeslinde: number;
    fechaPagoDeslinde?: number;
    montoDeslinde?: number;
    fechaPrimeraMensualidad?: string;
    comentariosAdicionales?: string;
    estatusTerreno?: string;
    estatus: string;
    fraccionamiento: Fraccionamiento;
    usuario: Usuario;
    vendedores: Vendedor[];
}
