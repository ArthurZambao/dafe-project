import React from 'react';

interface FormattedDateProps {
  date: Date;
}

export function FormattedDate({ date }: FormattedDateProps) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  const formatedData = `${dia}/${mes}/${ano}`;

  return <span className="font-bold">{formatedData}</span>;
}

const getCurrentTime = (): string => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  return `${hours}:${minutes}`;
};

  export const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

export const CurrentTime: React.FC = () => {
  const time = getCurrentTime();

  return <span>{time}</span>;
};
