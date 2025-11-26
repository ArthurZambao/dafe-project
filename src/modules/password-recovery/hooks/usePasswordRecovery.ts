import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordRecoveryFormData, PasswordRecoverySchema } from "../schemas/password-recovery-schema";

export function usePasswordRecovery() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordRecoveryFormData>({
    resolver: zodResolver(PasswordRecoverySchema),
  });

  const onSubmit = (data: PasswordRecoveryFormData) => {
    console.log(data);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
}