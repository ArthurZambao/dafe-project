import { ComplaintResponse } from '@/types/complaints';
import { useAuth } from '@/global/context/useAuth';
import { useEffect, useState } from 'react';
import { listComplaints, updateComplaintStatus } from '@/libs/api/complaints/complaints';
import { toast } from 'sonner';
import { UserComplaintsList } from '../../user-complaints-list';

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

  return <UserComplaintsList complaints={complaints} handleStatusChange={handleStatusChange} />;
}
