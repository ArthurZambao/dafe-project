import { Trash2 } from "lucide-react";
import { denuncias } from "../../../constants/denuncias";

export function UserComplaints() {
  return denuncias.map((denuncia) => (
    <div key={denuncia.id} className="cursor-pointer mb-4 p-4 border rounded-lg shadow-sm">
      <p className="text-2xl text-azure-primary">{denuncia.titulo}</p>
      <span className="flex justify-between items-center mt-2">
        <p className="text-slate-gray text-sm mt-2">{denuncia.data}</p>
        <Trash2 className="cursor-pointer hover:text-red-600 transition-colors duration-200 " />
      </span>
    </div>
  ));
}
