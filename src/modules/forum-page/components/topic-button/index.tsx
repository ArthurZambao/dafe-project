import Link from "next/link";

export function CreateTopicButton() {
  return (
    <section className="flex justify-center pt-10 pb-40">
      <Link href="/create-topic">
        <button className="cursor-pointer bg-[#007BFF] text-4xl font-bold text-white px-5 sm:px-30 py-6 rounded-tl-xl rounded-br-xl">
          Criar Assunto
        </button>
      </Link>
    </section>
  );
}
