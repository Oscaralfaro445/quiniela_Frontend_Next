import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import useGetFormdata from "@/hooks/formdata/queries/useGetFormdata";
import { CrudAction } from "@/models/form";
import { FormWrapper } from "@/components/formWrapper/FormWrapper";
import { Window } from "@/components/window/window";

interface ModalProps {
  isModalOpen: boolean;
  action: CrudAction;
  handleCancel: () => void;
  handleAccept: (values: Record<string, string | number | boolean>) => void;
  formInitialValues?: Record<string, string | number | boolean>;
}

export const Modal = ({
  isModalOpen,
  action,
  handleCancel,
  handleAccept,
  formInitialValues,
}: ModalProps) => {
  const params = useParams();
  const { cveForma } = params;
  const { data } = useGetFormdata(cveForma);
  const cancelButtonRef = useRef(null);
  const initialValues = formInitialValues || {};

  const renderView = () => {
    switch (data?.infoForma?.cveTipoForma) {
      case "VENTANA":
        return <Window action={action} />;
      default:
        return null;
    }
  };

  console.log("formData", data);
  // console.log(isSuccess, isPending, isError, data, error);

  return (
    <div>
      {isModalOpen && (
        <>
          <Dialog
            open={isModalOpen}
            onClose={handleCancel}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity">
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 p-6 border border-neutral-400 bg-white rounded-2xl shadow-lg">
                  <DialogTitle className="">
                    {data && data.infoForma.txTituloForma}
                  </DialogTitle>

                  <Description>{data && data.infoForma.descForma}</Description>

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
                              {isModalOpen && renderView()}
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
                            onClick={handleCancel}
                            ref={cancelButtonRef}
                          >
                            Cancelar
                          </button>

                          <button
                            className={`w-full inline-flex items-center justify-center rounded-md border shadow-sm px-4 text-base font-medium text-black border-gray-400 sm:ml-3 sm:w-auto sm:text-sm ${
                              formik.isValid
                                ? "opacity-50"
                                : "cursor-not-allowed"
                            }`}
                            onClick={() => handleAccept(formik.values)}
                            disabled={!formik.isValid || formik.isSubmitting}
                          >
                            Aceptar
                          </button>
                        </div>
                      </>
                    )}
                  </FormWrapper>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};
