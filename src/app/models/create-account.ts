export interface CreateAccount {
    email: string;
    password: string;
    nombre: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    calle?: string;
    colonia?: string;
    municipio?: string;
    codigoPostal?: string;
    telefonoFijo?: string;
    telefonoCelular?: string;
    idRol: number;
}
