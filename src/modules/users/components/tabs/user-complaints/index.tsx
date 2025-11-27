import { Trash2 } from "lucide-react";
import { ComplaintResponse } from "@/types/complaints";
import { useAuth } from "@/global/context/useAuth";
import { useEffect, useState } from "react";
import { listComplaints } from "@/libs/api/complaints/complaints";

export function UserComplaints() {
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchlistComplaints() {
      try {
        const data = await listComplaints();
        setComplaints(data);
      } catch (error) {
        console.error("Erro ao buscar as reclamações:", error);
      }
    }

    fetchlistComplaints();
  }, [user]);

  if (complaints.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-6">
        Você não tem nenhuma reclamação registrada.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 mt-6">
      {complaints.map((reclamacao) => (
        <div
          key={reclamacao._id}
          className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          {/* Título */}
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-semibold text-azure-primary">
              {reclamacao.titulo}
            </h3>

            <Trash2 className="cursor-pointer hover:text-red-600 transition-colors" />
          </div>

          {/* Tópico */}
          <p className="text-sm text-slate-gray mt-1">
            <span className="font-semibold text-gray-700">Tópico:</span>{" "}
            {reclamacao.topico}
          </p>

          {/* Conteúdo */}
          <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-wrap">
            {reclamacao.conteudo}
          </p>

          <div className="flex justify-between items-center mt-4">
            {/* Data */}
            <p className="text-sm text-gray-500">{reclamacao.data}</p>

            {/* Status (badge) */}
            <span
              className={`
                px-3 py-1 text-xs font-semibold rounded-full
                ${
                  reclamacao.status === "Pendente"
                    ? "bg-yellow-100 text-yellow-700"
                    : reclamacao.status === "Em Análise"
                    ? "bg-blue-100 text-blue-700"
                    : reclamacao.status === "Resolvida"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }
              `}
            >
              {reclamacao.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
