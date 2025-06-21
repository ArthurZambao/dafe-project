import { forms } from '../../../constants/forms';

export function UserForms() {
  return forms.map((form) => (
    <div key={form.id} className="cursor-pointer mb-4 p-4 border rounded-lg shadow-sm">
      <p className="text-2xl text-azure-primary">{form.titulo}</p>
      <span className="flex justify-between items-center mt-2">
        <p className="text-slate-gray text-sm mt-2">
          <span className="font-bold">{form.data_inicial}</span> até <span className="font-bold">{form.data_final}</span>
        </p>
        <p
          className={`${form.resposta === 'Respondido' ? 'text-azure-primary' : 'text-red-500'} text-sm mt-2`}
        >
          {form.resposta}
        </p>
      </span>
    </div>
  ));
}
