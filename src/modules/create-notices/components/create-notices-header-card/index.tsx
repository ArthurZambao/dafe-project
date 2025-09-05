import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CreateNoticesHeaderCardProps {
  formRef: React.RefObject<HTMLFormElement | null>;
}



export function CreateNoticesHeaderCard({ formRef }: CreateNoticesHeaderCardProps) {
    return (
        <section className="flex justify-between items-center pb-10 mx-0 sm:mx-10">
            <Link href="/notices-page" className="inline-flex">
                <h2 className="inline-flex gap-2 items-center text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
                    <ArrowLeft /> Notícias
                </h2>
            </Link>
            <button
                onClick={() => {
                    if (formRef.current) {
                        formRef.current.requestSubmit();
                    }
                }}
                className="btn-dafe btn-dafe-hover text-white px-2 sm:px-4 py-2"
            >
                Publicar Notícia
            </button>
        </section>
    )
}