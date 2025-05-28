import { Trash2 } from "lucide-react";
import { comentarios } from "../../../constants/comentarios";

export function UserComments() {
  return comentarios.map((comentario) => (
    <div key={comentario.id} className="mb-4 p-4 border rounded-lg shadow-sm">
      <p className="text-md">{comentario.text}</p>
      <span className="flex justify-between items-center mt-2">
        <p className="text-[#6C757D] text-sm mt-2">{comentario.date}</p>
        <Trash2 className="cursor-pointer hover:text-red-600 transition-colors duration-200 " />
      </span>
    </div>
  ));
}
