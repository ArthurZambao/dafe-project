import { useLazyLoadList } from '@/hooks/useLazyLoading';
import { ComplaintResponse } from '@/types/complaints';

interface UserComplaintsListProps {
  complaints: Array<ComplaintResponse>;
  handleStatusChange: (id: string, novoStatus: string) => void;
}

export function UserComplaintsList({ complaints, handleStatusChange }: UserComplaintsListProps) {
  const { visibleItems, loadMoreRef } = useLazyLoadList<ComplaintResponse>(complaints, 8);


  return (
    <div className="flex flex-col gap-5 mt-6">
      {visibleItems.map((reclamacao) => (
        <div
          key={reclamacao._id}
          className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-semibold text-azure-primary">{reclamacao.titulo}</h3>
          </div>

          <p className="text-sm text-slate-gray mt-1">
            <span className="font-semibold text-gray-700">Tópico:</span> {reclamacao.topico}
          </p>

          <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
            {reclamacao.conteudo}
          </p>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">{reclamacao.data}</p>
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
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
}
