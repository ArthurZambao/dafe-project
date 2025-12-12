import { FileAttachment } from '@/global/components/FileAttachment';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CreateFormData } from '../../schemas/create-form.schema';

interface MediaFormProps {
  register: UseFormRegister<CreateFormData>;
  errors: FieldErrors<CreateFormData>;
  filePreviewUrl: string | null;
  fileName: string | null;
}

export function MediaForm({ register, errors, filePreviewUrl, fileName }: MediaFormProps) {
  return (
    <div className="py-6 flex flex-col gap-4">
        <FileAttachment
        register={register}
        name="anexos"
        error={errors.anexos}
        filePreviewUrl={filePreviewUrl}
        fileName={fileName}
        />
    </div>
  );
}
