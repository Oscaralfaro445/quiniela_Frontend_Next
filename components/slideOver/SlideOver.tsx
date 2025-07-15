import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useParams } from "next/navigation";
import { FormWrapper } from "../formWrapper/FormWrapper";
import useGetFormdata from "@/hooks/formdata/queries/useGetFormdata";
import { getFilterFields } from "@/utils/formdata";
import { Form } from "@/components/form/Form";

interface SlideOverProps {
  isSlideOverOpen: boolean;
  setSlideOverOpen: () => void;
}

export const SlideOver = ({
  isSlideOverOpen,
  setSlideOverOpen,
}: SlideOverProps) => {
  const params = useParams();
  const { cveForma } = params;
  const { data } = useGetFormdata(cveForma);
  const fieldsFiltering = getFilterFields(data?.infComponente || []);

  console.log("filterData", fieldsFiltering);

  return (
    <div>
      <Dialog
        open={isSlideOverOpen}
        onClose={setSlideOverOpen}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        <div className="fixed right-0 top-0 h-screen w-1/6 bg-white shadow-lg z-50 overflow-y-auto border-l border-neutral-300">
          <DialogTitle className="px-4 pt-4 text-lg font-semibold">
            {data?.infoForma?.txTituloForma}
          </DialogTitle>

          <Description className="px-4 text-sm text-gray-600">
            {data?.infoForma?.descForma}
          </Description>

          <div className="p-4">
            <FormWrapper
              initialValues={{}}
              onSubmit={() => {}}
              fields={data?.infComponente}
            >
              {(formik) => (
                <>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <Form fields={fieldsFiltering} />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-3 py-1 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => {}}
                      ref={() => {}}
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-md border text-black ${
                        formik.isValid
                          ? "bg-gray-200 cursor-pointer"
                          : "bg-gray-100 cursor-not-allowed opacity-50"
                      }`}
                    >
                      Aceptar
                    </button>
                  </div>
                </>
              )}
            </FormWrapper>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
