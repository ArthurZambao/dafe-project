'use client';

import { useAuth } from "@/global/context/useAuth";
import { FormAnswer } from "../form-answer";
import { FormResults } from "../form-results";

interface FormPageDataProps {
  formId: string;
}

export function FormPageData({ formId }: FormPageDataProps) {
  const { user } = useAuth();

if (!user) return <div className="p-20 text-center text-xl text-slate-gray">Carregando...</div>;

if (user.role === 'student') {
  return <FormAnswer formId={formId} />;
}

return <FormResults formId={formId} />;
}

