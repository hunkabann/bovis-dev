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

export interface CieElementPost {
  nombre_cuenta:      string;
  cuenta:             string;
  tipo_poliza:        string;
  numero:             number;
  fecha:              string;
  mes:                string;
  concepto:           string;
  centro_costos:      string;
  proyectos:          string;
  saldo_inicial:      number;
  debe:               number;
  haber:              number;
  movimiento:         number;
  empresa:            string;
  num_proyecto:       number;
  tipo_num_proyecto:  string;
  edo_resultados:     string;
  responsable:        string;
  tipo_responsable:   string;
  tipo_py:            string;
  clasificacion_py:   string;
}

export interface CieProyectosResponse {
  data:          CieProyecto[];
  success:       boolean;
  message:       null;
  transactionId: null;
}

export interface CieProyecto {
  proyecto:     string;
  numProyecto:  number;
  responsable:  string;
  tipoProyecto: string;
}
