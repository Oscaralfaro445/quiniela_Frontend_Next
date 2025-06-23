import useGetFormdata from "@/hooks/formdata/queries/useGetFormdata";
import { useEffect, useState } from "react";
import { CrudAction } from "@/models/form";
import { filterFields } from "@/utils/field";
import { Form } from "@/components/form/Form";

export const Window = ({ action }: { action: CrudAction }) => {
  const { isSuccess, isPending, isError, data, error } = useGetFormdata();
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    const filtered = filterFields(data?.infComponente, action);
    setFields(filtered);
  }, [data, action]);

  return (
    <div>
      {isPending && <div>Loading...</div>}

      {isError && <div>{error?.message}</div>}

      {isSuccess && fields.length > 0 && (
        <div className="w-full bg-white">
          <Form fields={fields} />
        </div>
      )}
    </div>
  );
};
