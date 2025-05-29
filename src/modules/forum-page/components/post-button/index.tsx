import Link from "next/link";

export function CreatePostButton() {
  return (
    <section className="flex justify-center pt-6 pb-40">
      <Link href="/create-post">
        <button className="cursor-pointer bg-[#007BFF] text-4xl font-bold text-white px-12 sm:px-30 py-6 rounded-tl-xl rounded-br-xl">
          Criar Assunto
        </button>
      </Link>
    </section>
  );
}
