export interface MenuItemI {
  active?: boolean;
  aplicacion: string;
  bHoja: boolean;
  children?: MenuItemI[];
  cveAplicacion: string;
  cveMenu: string;
  cveMenuP: string;
  descMenu: string;
  icono: string;
  menuPadre: string;
  numNivel: string;
  urlMenu: string;
}
