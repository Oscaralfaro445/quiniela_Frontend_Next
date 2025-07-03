import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useGetFormdata from "@/hooks/formdata/queries/useGetFormdata";
import { CrudAction } from "@/models/form";
import { filterFields } from "@/utils/field";
import { Form } from "@/components/form/Form";

export const Window = ({ action }: { action: CrudAction }) => {
  const params = useParams();
  const { cveForma } = params;
  const { data } = useGetFormdata(cveForma);
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    const filtered = filterFields(data?.infComponente, action);
    setFields(filtered);
  }, [data, action]);

  return (
    <div>
      {fields.length > 0 && (
        <div className="w-full bg-white">
          <Form fields={fields} />
        </div>
      )}
    </div>
  );
};
