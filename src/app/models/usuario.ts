export interface Usuario {
    idUsuario: number;
    nombre: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    calle?: string;
    numeroExterior?: string;
    numeroInterior?: string;
    colonia?: string;
    municipio?: string;
    codigoPostal?: string;
    telefonoFijo?: string;
    telefonoCelular?: string;
    correo?: string;
}
