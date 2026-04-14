import { Form, Formik } from "formik";
import { Input } from "../shared/input/Input";
import { Modal } from "../shared/modal/Modal";

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleAccept: (values: any) => void;
  // initialValues: { [key: string]: string | number } | undefined;
  data: any;
}

export const CatalogForm = ({
  isModalOpen,
  handleCancel,
  handleAccept,
  // initialValues,
  data,
}: Props) => {
  const initialValues = {
    DESCRIPCION: 45348.02,
    idEmpleado: 32,
    nombre_cliente: "Luis Cruz",
    tipoCliente: "B",
  };
  console.log("Initial values in CatalogForm:", initialValues);

  return (
    <Modal isOpen={isModalOpen} onClose={handleCancel}>
      <Formik
        initialValues={initialValues || {}}
        //validationSchema={Yup.object(initialValues)}
        onSubmit={(values) => {
          handleAccept(values);
        }}
      >
        <Form className="grid w-full gap-2">
          {data?.map((componente: any) => (
            <Input
              key={componente.NOM_COMPONENTE}
              name={componente.NOM_COMPONENTE}
              type={componente.CVE_TIPO_COMPON}
              label={componente.TX_ETIQUETA}
              placeholder={componente.TX_AYUDA}
            />
          ))}
          <button className="w-fit px-2 py-1 border rounded-sm" type="submit">
            Enviar
          </button>
          <button
            className="w-fit px-2 py-1 border rounded-sm cursor-pointer"
            type="button"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancelar
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};
