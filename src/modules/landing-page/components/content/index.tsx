import Image from "next/image";

export function LandingPageData() {

    const objetivos = [
        {
            titulo: "Facilitar a comunicação:",
            descricao:
                "Elimine a sobrecarga dos representantes de turma e crie um canal direto entre alunos e administração escolar.",
        },
        {
            titulo: "Coletar feedback contínuo:",
            descricao:
                "Através de formulários periódicos, garantimos um fluxo constante de opiniões para melhorar a qualidade educacional.",
        },
        {
            titulo: "Promover a transparência:",
            descricao:
                "Todos os feedbacks são compartilhados com a escola, proporcionando um ambiente mais inclusivo e democrático.",
        },
        {
            titulo: "Incentivo Estudantil:",
            descricao:
                "Ofereça aos alunos uma plataforma acessível para expressar suas opiniões e contribuir ativamente para o desenvolvimento da escola.",
        },
    ];

    return (
        <div className="text-center min-h-screen">
            <div className="bg-[#007BFF] text-white py-10">
                <h1 className="font-bold text-4xl pb-6">Transforme a Comunicação Escolar</h1>
                <p className="text-lg mx-10">
                    O <span className="font-semibold">D.A.F.E</span> é uma plataforma inovadora que conecta alunos e <br className="hidden sm:block" />
                    instituições de ensino de forma mais eficiente e transparente. <br />
                    Envie feedbacks, participe de pesquisas e receba comunicados <br className="hidden sm:block" />
                    importantes com facilidade. Torne sua voz parte da evolução do <br className="hidden sm:block" />
                    ambiente escolar.
                </p>
            </div>
            <section className="py-20 px-4 md:px-20">
                <h2 className="text-3xl font-bold text-center text-[#007BFF] mb-12">
                    Principais Objetivos
                </h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 font-semibold w-full max-w-6xl mx-auto px-2">
                    {objetivos.map((objetivo, index) => (
                        <div
                            key={index}
                            className="bg-[#007BFF] text-white rounded-bl-[1.5rem] md:rounded-bl-[2.5rem] lg:rounded-bl-[4rem] rounded-tr-[1.5rem] md:rounded-tr-[2.5rem] lg:rounded-tr-[4rem] h-[9rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] w-full flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-bold text-2xl mb-2">{objetivo.titulo}</h3>
                            <p className="leading-relaxed text-sm px-4">{objetivo.descricao}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-10 bg-[#007BFF] w-full rounded-tr-[8rem] sm:rounded-bl-[8rem]">
                <h2 className="text-3xl font-bold text-center text-white mt-20 mb-12">
                    Como Funciona a D.A.F.E
                </h2>

                <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-8 py-10 px-4">
                    <div className="flex items-center justify-between sm:gap-[20rem]">
                        <Image
                            src="/fb-logo.svg"
                            width={250}
                            height={250}
                            alt="Logo D.A.F.E"
                            className="max-w-full"
                        />
                        <div className="pt-4 sm:text-center">
                            <h1 className="font-bold text-xl sm:text-4xl pb-10">Cadastro Simples:</h1>
                            <p className="text-sm sm:text-xl">
                                <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua <br />
                                conta com informações básicas, como nome, turma e email, e <br />
                                em poucos minutos estão prontos para começar a usar o aplicativo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-8 py-10 px-4">
                    <div className="flex items-center justify-between sm:gap-[20rem]">
                        <div className="pt-4 sm:text-center">
                            <h1 className="font-bold text-xl sm:text-4xl pb-10">FeedBack Constante:</h1>
                            <p className="text-sm sm:text-xl">
                                <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua <br />
                                conta com informações básicas, como nome, turma e email, e <br />
                                em poucos minutos estão prontos para começar a usar o aplicativo.
                            </p>
                        </div>
                        <Image
                            src="/fb-logo.svg"
                            width={250}
                            height={250}
                            alt="Logo D.A.F.E"
                            className="max-w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-8 py-10 px-4">
                    <div className="flex items-center justify-between sm:gap-[20rem]">
                        <Image
                            src="/fb-logo.svg"
                            width={250}
                            height={250}
                            alt="Logo D.A.F.E"
                            className="max-w-full"
                        />
                        <div className="pt-4 sm:text-center">
                            <h1 className="font-bold text-xl sm:text-4xl pb-10">Receba Comunicados:</h1>
                            <p className="text-sm sm:text-xl">
                                <span className="font-bold">Comunicados importantes da escola</span> , como eventos e <br />
                                atualizações, serão enviados diretamente para seu <br />
                                celular ou computador, mantendo você sempre informado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex mt-15 mb-20 justify-center gap-20 mx-5">
                <div className="flex flex-col gap-8 ">
                    <h1 className="text-[#007BFF] text-3xl font-bold">FAÇA SEU REGISTRO <span className="text-[#6C757D]">AGORA</span> !</h1>
                    <p className="text-[#6C757D] sm:text-lg font-semibold ">
                        Não perca a chance de fazer a diferença na sua <br />
                        escola! Com o D.A.F.E, sua voz será ouvida de forma <br className="hidden sm:block" />
                        contínua e direta. Cadastre-se agora e comece a <br className="hidden sm:block" />
                        compartilhar suas opiniões, ficar por dentro dos <br className="hidden sm:block" />
                        comunicados e ajudar a criar um ambiente escolar <br />
                        mais transparente e participativo.
                    </p>
                    <button className="bg-[#007BFF] font-bold cursor-pointer text-white w-[10rem] py-2 rounded-tl-2xl rounded-br-2xl mx-auto">
                        Registrar-se
                    </button>
                </div>
                <Image
                    src="/ig-logo.svg"
                    width={250}
                    height={250}
                    alt="Logo D.A.F.E"
                    className="max-w-full"
                />
            </section>
        </div>
    );
}
