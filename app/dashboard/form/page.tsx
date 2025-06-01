import { Alert } from "@/components/alert/alert";
import { SectionHeader } from "@/components/sectionHeader/SectionHeader";
import { Button } from "@/components/shared/button/Button";
import { Table } from "@/components/shared/table/Table";

export default function Form() {
  return (
    <div w-full>
      <SectionHeader>
        <SectionHeader.Details
          title="Titulo de la forma"
          description="Descripcion de la forma"
        />

        <SectionHeader.Buttons>
          {
            <Button
              type="button"
              theme="danger"
              title="Eliminar"
              icon="trash"
              // onClick={() => {}}
            />
          }
          {
            <Button
              type="button"
              theme="normal"
              title="Agregar"
              icon="plus"
              // onClick={() => {}}
            />
          }
          {
            <Button
              type="button"
              theme="primary"
              title="Editar"
              icon="pencil"
              // onClick={() => {}}
            />
          }

          <div className="border-l border-gray-200 h-12 ml-1 mr-2 w-1 "></div>

          <Button
            type="button"
            theme="primary"
            title="Filtros"
            icon="filter"
            // onClick={() => {}}
          />
        </SectionHeader.Buttons>
      </SectionHeader>

      <Table />

      <Alert />
    </div>
  );
}
