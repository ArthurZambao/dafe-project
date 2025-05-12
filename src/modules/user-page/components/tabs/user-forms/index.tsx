import { forms } from '../../../constants/forms';

export function UserForms() {
  return forms.map((form) => (
    <div key={form.id} className="mb-4 p-4 border rounded-lg shadow-sm">
      <p className="text-2xl text-[#007BFF]">{form.titulo}</p>
      <span className="flex justify-between items-center mt-2">
        <p className="text-[#6C757D] text-sm mt-2">
          {form.data_inicial} até {form.data_final}
        </p>
        <p
          className={`${form.resposta === 'Respondido' ? 'text-[#007BFF]' : 'text-red-500'} text-sm mt-2`}
        >
          {form.resposta}
        </p>
      </span>
    </div>
  ));
}
