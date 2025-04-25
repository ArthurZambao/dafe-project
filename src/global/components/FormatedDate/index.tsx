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
