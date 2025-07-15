import { Form } from "@/components/form/Form";
import { FormWrapper } from "@/components/formWrapper/FormWrapper";

export default function UsuarioAlta() {
  const initialValues = {};

  const handleAccept = () => {};

  const data = {
    infoForma: {
      cveAplicacion: "QUINIELA",
      cve_forma: "fQuiniela",
      cveTituloForma: "fQuinielaTit",
      txTituloForma: "Formulario de Quiniela",
      urlApiForma: "http://localhost:3000/api/v1/quinielaData",
      descForma: "Captura de predicciones para partidos de fútbol",
      endpoint: "quinielaData",
      cveTipoForma: "VENTANA",
      cveTipoLayout: "AUTO",
      numColumnas: 1,
      bGrid: true,
      fFiltra: false,
      bReporta: true,
      bCrea: true,
      bEdita: true,
      bBorra: false,
      cveCategoria: "JUEGO",
      nomTablaDb: "QN_PARTICIPACION",
      fnAcepta: "validaQuiniela",
    },
    infComponente: [
      {
        nomComponente: "nombreParticipante",
        cveTipoCampo: "string",
        cveTipoCompon: "TEXTO",
        bCampoBd: true,
        nomCampoBd: "NOMBRE_PARTICIPANTE",
        numOrden: 1,
        numFila: 1,
        numColumna: 1,
        cveEtiqueta: "ENOMBRE",
        txEtiqueta: "Nombre del Participante",
        cveAyuda: "ANOMBRE",
        txAyuda: "Nombre completo del participante",
        bCrea: true,
        bEdita: true,
        bRequerido: true,
        bGrid: true,
        bFiltra: false,
        bReporta: true,
        fnValida: null,
        fnMuestra: null,
        fnObtValor: null,
        infdetComp: {
          VALOR_INICIAL: "",
          NUM_LONG_MIN: 3,
          NUM_LONG_MAX: 100,
          TX_REG_EXP: "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$",
        },
      },
      {
        nomComponente: "partido1",
        cveTipoCampo: "string",
        cveTipoCompon: "TEXTO",
        bCampoBd: true,
        nomCampoBd: "RESULTADO_P1",
        numOrden: 2,
        numFila: 2,
        numColumna: 1,
        cveEtiqueta: "EPARTIDO1",
        txEtiqueta: "Partido 1 (A vs B)",
        cveAyuda: "APARTIDO1",
        txAyuda: "Escribe L, E o V",
        bCrea: true,
        bEdita: true,
        bRequerido: true,
        bGrid: true,
        bFiltra: false,
        bReporta: true,
        fnValida: "fnValResultado",
        fnMuestra: null,
        fnObtValor: null,
        infdetComp: {
          VALOR_INICIAL: "",
          NUM_LONG_MIN: 1,
          NUM_LONG_MAX: 1,
          TX_REG_EXP: "^[LEVlev]$",
        },
      },
      {
        nomComponente: "partido2",
        cveTipoCampo: "string",
        cveTipoCompon: "TEXTO",
        bCampoBd: true,
        nomCampoBd: "RESULTADO_P2",
        numOrden: 3,
        numFila: 3,
        numColumna: 1,
        cveEtiqueta: "EPARTIDO2",
        txEtiqueta: "Partido 2 (C vs D)",
        cveAyuda: "APARTIDO2",
        txAyuda: "Escribe L, E o V",
        bCrea: true,
        bEdita: true,
        bRequerido: true,
        bGrid: true,
        bFiltra: false,
        bReporta: true,
        fnValida: "fnValResultado",
        fnMuestra: null,
        fnObtValor: null,
        infdetComp: {
          VALOR_INICIAL: "",
          NUM_LONG_MIN: 1,
          NUM_LONG_MAX: 1,
          TX_REG_EXP: "^[LEVlev]$",
        },
      },
      {
        nomComponente: "partido3",
        cveTipoCampo: "string",
        cveTipoCompon: "TEXTO",
        bCampoBd: true,
        nomCampoBd: "RESULTADO_P3",
        numOrden: 4,
        numFila: 4,
        numColumna: 1,
        cveEtiqueta: "EPARTIDO3",
        txEtiqueta: "Partido 3 (E vs F)",
        cveAyuda: "APARTIDO3",
        txAyuda: "Escribe L, E o V",
        bCrea: true,
        bEdita: true,
        bRequerido: true,
        bGrid: true,
        bFiltra: false,
        bReporta: true,
        fnValida: "fnValResultado",
        fnMuestra: null,
        fnObtValor: null,
        infdetComp: {
          VALOR_INICIAL: "",
          NUM_LONG_MIN: 1,
          NUM_LONG_MAX: 1,
          TX_REG_EXP: "^[LEVlev]$",
        },
      },
    ],
  };

  return (
    <div>
      <FormWrapper
        initialValues={initialValues}
        onSubmit={handleAccept}
        fields={data?.infComponente}
      >
        {(formik) => (
          <>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <Form fields={data?.infComponente} />
                </div>
              </div>
            </div>

            {/* <pre className="text-xs text-gray-600 bg-gray-50 p-2 mt-4">
                              {JSON.stringify(
                                {
                                  values: formik.values,
                                  errors: formik.errors,
                                  touched: formik.touched,
                                  isValid: formik.isValid,
                                  dirty: formik.dirty,
                                  isSubmitting: formik.isSubmitting,
                                },
                                null,
                                2
                              )}
                            </pre> */}

            {console.log(formik.isValid)}
            <div className="bg-gray-50">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>

              <button
                className={`w-full inline-flex items-center justify-center rounded-md border shadow-sm px-4 text-base font-medium text-black border-gray-400 sm:ml-3 sm:w-auto sm:text-sm ${
                  formik.isValid ? "opacity-50" : "cursor-not-allowed"
                }`}
                onClick={() => {}}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Aceptar
              </button>
            </div>
          </>
        )}
      </FormWrapper>
    </div>
  );
}
