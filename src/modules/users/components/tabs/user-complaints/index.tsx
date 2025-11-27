import { Trash2 } from 'lucide-react';
import { ComplaintResponse } from '@/types/complaints';
import { useAuth } from '@/global/context/useAuth';
import { useEffect, useState } from 'react';
import { listComplaints, updateComplaintStatus } from '@/libs/api/complaints/complaints';
import { toast } from 'sonner';

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
        console.error('Erro ao buscar as reclamações:', error);
      }
    }

    fetchlistComplaints();
  }, [user]);

  async function handleStatusChange(id: string, novoStatus: string) {
    // Atualiza no front
    setComplaints((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              status: novoStatus as 'Pendente' | 'Em Análise' | 'Resolvida' | 'Arquivada',
            }
          : item
      )
    );

    // Atualiza no backend
    try {
      await updateComplaintStatus(id, novoStatus);
      toast.success('Status atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar status.');
      console.error('Erro ao atualizar status:', error);
    }
  }

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
          {/* Cabeçalho */}
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-semibold text-azure-primary">{reclamacao.titulo}</h3>

            <Trash2 className="cursor-pointer hover:text-red-600 transition-colors" />
          </div>

          {/* Tópico */}
          <p className="text-sm text-slate-gray mt-1">
            <span className="font-semibold text-gray-700">Tópico:</span> {reclamacao.topico}
          </p>

          {/* Conteúdo */}
          <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-wrap">
            {reclamacao.conteudo}
          </p>

          {/* Rodapé */}
          <div className="flex justify-between items-center mt-4">
            {/* Data */}
            <p className="text-sm text-gray-500">{reclamacao.data}</p>

            {/* Select de status */}
            <select
              value={reclamacao.status}
              onChange={(e) => handleStatusChange(reclamacao._id, e.target.value)}
              className={`
    px-3 py-1 text-xs font-semibold rounded-full border bg-white shadow-sm cursor-pointer transition-all
    ${
      reclamacao.status === 'Pendente'
        ? 'text-red-700 border-red-400 bg-red-100'
        : reclamacao.status === 'Em Análise'
          ? 'text-yellow-700 border-yellow-400 bg-yellow-100'
          : reclamacao.status === 'Resolvida'
            ? 'text-blue-700 border-blue-400 bg-blue-100'
            : reclamacao.status === 'Arquivada'
              ? 'text-gray-700 border-gray-400 bg-gray-200'
              : ''
    }
  `}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Resolvida">Resolvida</option>
              <option value="Arquivada">Arquivada</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
