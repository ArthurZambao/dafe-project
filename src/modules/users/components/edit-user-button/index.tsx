import Link from "next/link";

export function EditUserBUtton() {
    return (
        <Link href={"/users/edit-user"}>
            <button className="btn-dafe btn-dafe-hover px-6 py-2 text-white mt-8 ml-4">
                Editar Usuário
            </button>
        </Link>
    )
}