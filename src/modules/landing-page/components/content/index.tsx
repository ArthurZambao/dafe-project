import Image from "next/image";

export function LandingPageData() {

    const objetivos = [
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
        <div className=" text-center min-h-screen">
            <div className="bg-[#007BFF] text-white py-10">
                <h1 className="font-bold text-4xl pb-6">Transforme a Comunicação Escolar</h1>
                <p className="text-lg">
                    O <span className="font-semibold">D.A.F.E</span> é uma plataforma inovadora que conecta alunos e <br />
                    instituições de ensino de forma mais eficiente e transparente. <br />
                    Envie feedbacks, participe de pesquisas e receba comunicados <br />
                    importantes com facilidade. Torne sua voz parte da evolução do <br />
                    ambiente escolar.
                </p>
            </div>
            <section className="py-20 px-4 md:px-20">
                <h2 className="text-3xl font-bold text-center text-[#007BFF] mb-12">
                    Principais Objetivos
                </h2>
                <div className="grid md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 font-semibold w-full max-w-6xl mx-auto px-2">

                    <div
                        className="bg-[#007BFF] text-white rounded-bl-[1.5rem] md:rounded-bl-[2.5rem] lg:rounded-bl-[4rem] rounded-tr-[1.5rem] md:rounded-tr-[2.5rem] lg:rounded-tr-[4rem] h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] w-full flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-bold text-2xl mb-2">Facilitar a comunicação:</h3>
                        <p className="leading-relaxed">
                            Elimine a sobrecarga dos representantes de turma e crie um canal direto entre alunos e administraçãoescolar.
                        </p>
                    </div>

                    <div
                        className='bg-[#007BFF] text-white rounded-bl-[1.5rem] md:rounded-bl-[2.5rem] lg:rounded-bl-[4rem] rounded-tr-[1.5rem] md:rounded-tr-[2.5rem] lg:rounded-tr-[4rem] h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] w-full flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow'
                    >
                        <h3 className="font-bold text-2xl mb-2">Coletar feedback contínuo:</h3>
                        <p className="leading-relaxed">
                            Através de formulários periódicos, garantimos um fluxo constante de opiniões para melhorar a qualidade educacional.
                        </p>
                    </div>

                    <div
                        className='bg-[#007BFF] text-white rounded-bl-[1.5rem] md:rounded-bl-[2.5rem] lg:rounded-bl-[4rem] rounded-tr-[1.5rem] md:rounded-tr-[2.5rem] lg:rounded-tr-[4rem] h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] w-full flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow'
                    >
                        <h3 className="font-bold text-2xl mb-2">Promover a transparência:</h3>
                        <p className="leading-relaxed">
                            Todos os feedbacks são compartilhados com a escola, proporcionando um ambiente mais inclusivo e democrático.
                        </p>
                    </div>

                    <div
                        className='bg-[#007BFF] text-white rounded-bl-[1.5rem] md:rounded-bl-[2.5rem] lg:rounded-bl-[4rem] rounded-tr-[1.5rem] md:rounded-tr-[2.5rem] lg:rounded-tr-[4rem] h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] w-full flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow'
                    >
                        <h3 className="font-bold text-2xl mb-2">Incentivo Estudantil:</h3>
                        <p className="leading-relaxed">
                            Ofereça aos alunos uma plataforma acessível para expressar suas opiniões e contribuir ativamente para o desenvolvimento da escola.
                        </p>
                    </div>

                </div>

            </section>
            <section className="py-10 bg-[#007BFF] w-full rounded-tr-[8rem] rounded-bl-[8rem]">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Como Funciona a D.A.F.E
                </h2>

                <div className="flex justify-center gap-[20rem] py-10">
                    <Image
                        src="/fb-logo.svg"
                        width={250}
                        height={250}
                        alt="Picture of the author"
                    />
                    <div className="pt-15">
                        <h1 className="font-bold text-4xl pb-10">Cadastro Simples:</h1>
                        <p className="text-xl">
                            <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua <br />
                            conta com informações básicas, como nome, turma e email, e <br />
                            em poucos minutos estão prontos para começar a usar o aplicativo.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-[20rem] py-10">
                    <div className="pt-15">
                        <h1 className="font-bold text-4xl pb-10">FeedBack Constante:</h1>
                        <p className="text-xl">
                            <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua <br />
                            conta com informações básicas, como nome, turma e email, e <br />
                            em poucos minutos estão prontos para começar a usar o aplicativo.
                        </p>
                    </div>
                    <Image
                        src="/fb-logo.svg"
                        width={250}
                        height={250}
                        alt="Picture of the author"
                    />
                </div>

                <div className="flex justify-center gap-[20rem] py-10">
                    <Image
                        src="/fb-logo.svg"
                        width={250}
                        height={250}
                        alt="Picture of the author"
                    />
                    <div className="pt-15">
                        <h1 className="font-bold text-4xl pb-10">Receba Comunicados:</h1>
                        <p className="text-xl">
                            <span className="font-bold">Comunicados importantes da escola</span> , como eventos e <br />
                            atualizações, serão enviados diretamente para seu <br />
                            celular ou computador, mantendo você sempre informado.
                        </p>
                    </div>
                </div>

            </section>
        </div>
    )
}