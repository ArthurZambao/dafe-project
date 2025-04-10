import Image from "next/image"

export function Forum() {
    const topics = [
        {
            titulo:
                'titulo1',
            descricao:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            interacoes:
                10,
            imagem:
                '/ig-logo.svg',
            data:
                "10/10/2010",
            usuario:
                "user2010",
        },
        {
            titulo:
                'titulo1',
            descricao:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            interacoes:
                10,
            imagem:
                '/ig-logo.svg',
            data:
                "10/10/2010",
            usuario:
                "user2010",
        }, {
            titulo:
                'titulo1',
            descricao:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            interacoes:
                10,
            imagem:
                '/ig-logo.svg',
            data:
                "10/10/2010",
            usuario:
                "user2010",
        }, {
            titulo:
                'titulo1',
            descricao:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            interacoes:
                10,
            imagem:
                '/ig-logo.svg',
            data:
                "10/10/2010",
            usuario:
                "user2010",
        }, {
            titulo:
                'titulo1',
            descricao:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            interacoes:
                10,
            imagem:
                '/ig-logo.svg',
            data:
                "10/10/2010",
            usuario:
                "user2010",
        }, {
            titulo:
                'titulo1',
            descricao:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            interacoes:
                10,
            imagem:
                '/ig-logo.svg',
            data:
                "10/10/2010",
            usuario:
                "user2010",
        },
    ]

    return (
        <div className="min-h-screen">
            <div className="bg-[#007BFF] w-full">
                <h1 className="text-center text-6xl py-10">Fórum</h1>
            </div>

            <div className="flex justify-between py-15 px-22">
                <h1 className="text-[#007BFF] text-5xl font-semibold">Principais Assuntos</h1>
                <button className=" cursor-pointer bg-[#007BFF] text-xl font-bold text-white px-10 py-2 rounded-tl-xl rounded-br-xl">
                    Filtrar Por
                </button>
            </div>

            <div>
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="text-white flex items-center"
                    >
                        <div className="flex flex-col gap-2 p-10">
                            <div className="bg-[#007BFF] rounded-2xl">
                                <Image
                                    src={topic.imagem}
                                    width={250}
                                    height={250}
                                    alt="Logo D.A.F.E"
                                    className="max-w-full"
                                />
                            </div>
                            <p className="text-[#6C757D] text-sm">
                                Data da Publicação: <span className="font-bold">{topic.data}</span> <br />
                                Feito por:  <span className="font-bold">{topic.usuario}</span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="font-bold text-4xl mb-2 text-[#007BFF]">{topic.titulo}</h3>
                            <p className="leading-relaxed px-4 text-xl text-[#6C757D] sm:max-w-[60rem]">{topic.descricao}</p>
                            <button className=" cursor-pointer bg-[#007BFF] text-xl text-white w-[15rem] py-2 rounded-tl-xl rounded-br-xl">
                                <span className="font-bold">{topic.interacoes}</span> Interações
                            </button>
                        </div>
                    </div>
                ))}
                <section className="flex justify-center pt-10 pb-40">
                    <button className=" cursor-pointer bg-[#007BFF] text-4xl font-bold text-white px-30 py-6 rounded-tl-xl rounded-br-xl">
                        Filtrar Por
                    </button>
                </section>
            </div>
        </div>
    )
}