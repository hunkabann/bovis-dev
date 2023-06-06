// Generated by https://quicktype.io

export interface CieEmpresasResponse {
  data:          CieEmpresa[];
  success:       boolean;
  message:       null;
  transactionId: null;
}

export interface CieEmpresa {
  nukidempresa: number;
  chempresa:    string;
  rfc:          string;
  nucoi:        number;
  nunoi:        number;
  nusae:        number;
  boactivo:     boolean;
}
