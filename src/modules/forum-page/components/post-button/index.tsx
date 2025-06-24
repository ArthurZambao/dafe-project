import Link from "next/link";

export function PostButton() {
  return (
    <section className="flex justify-center">
      <Link href="/forum-page/create-post">
        <button className="cursor-pointer btn-dafe-hover text-xl font-bold text-white px-6 sm:px-12 py-2 btn-dafe">
          Criar Assunto
        </button>
      </Link>
    </section>
  );
}
