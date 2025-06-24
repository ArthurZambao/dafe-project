import { StoredForm } from "@/types/form";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

interface filteredFormsListProps{
  filteredForms: StoredForm[];
}

export function FilteredFormsList({filteredForms}: filteredFormsListProps){
  return(
    <>
      {filteredForms.map((form: StoredForm) => (
        <Link
          onClick={() => {
            console.log(form);
          }}
          href={`/forms-page/${form.id}`}
          key={form.id}
        >
          <div className="flex flex-col border-1 border-azure-primary rounded-3xl p-8 hover:bg-gray-300 transition-colors duration-300">
            <div className="flex justify-between gap-6">
              <h2 className="text-xl sm:text-3xl mb-2 sm:truncate break-words">
                {form.formTitulo || 'Sem título'}
              </h2>
              <p className="text-xs mb-4 font-semibold">
                {form.data_final || new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-gray text-xs sm:text-sm break-words">
                {form.formDesc || 'Sem descrição'}
              </p>
              <p className="flex text-xs sm:text-sm items-center gap-0 sm:gap-2">
                <MessageSquare size={16} /> {form.respostasCount || 0}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}