// src/components/ComoFuncionaDAFE.tsx
import React from 'react';

export function Operation() {
  return (
    <section className="mx-auto px-24 text-[#4B4B4B] pt-12 pb-6 space-y-12">
      <h2 className="text-center text-4xl mb-16 font-semibold">
        Como funciona o D.A.F.E
      </h2>

      <div className="flex justify-start w-full py-4">
        <div className="max-w-md text-left">
          <h4 className="text-3xl font-semibold mb-2">Cadastro simples</h4>
          <p className="text-medium leading-relaxed">
            <strong className="font-semibold text-gray-700"> O cadastro é rápido e fácil.</strong> Criar uma conta no
            aplicativo é fácil e leva apenas alguns minutos.Os alunos informam dados básicos, como
            nome completo, turma e email institucional, garantindo uma identificação segura e
            personalizada.
          </p>
        </div>
      </div>

      <div className="flex justify-end w-full py-4">
        <div className="max-w-md text-right">
          <h4 className="text-3xl font-semibold mb-2">FeedBack Constante</h4>
          <p className="text-medium leading-relaxed">
            <strong className="font-semibold text-gray-700"> A sua opinião é fundamental. </strong> Por meio de feedbacks
            regulares, aprimoramos continuamente a plataforma, ajustando cada detalhe para torná - la
            mais eficiente, transparente e alinhada às suas necessidades.
          </p>
        </div>
      </div>

      <div className="flex justify-start w-full py-4">
        <div className="max-w-md text-left">
          <h4 className="text-3xl font-semibold mb-2">Receba Comunicados</h4>
          <p className="text-medium leading-relaxed">
            <strong className="font-semibold text-gray-700">Fique sempre por dentro das novidades da escola!</strong> 
            Comunicados importantes, como avisos sobre eventos, reuniões, mudanças no calendário e
            atualizações gerais, serão enviados diretamente para o seu celular ou computador.
          </p>
        </div>
      </div>
    </section >
  );
}

// ATUALIZAÇÕES FUTURAS

// "use client";

// import React, { useState } from "react";

// export function Operation() {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <section className="mx-auto px-24 text-[#4B4B4B] py-12 space-y-12 relative">
//       <h2 className="text-center text-4xl mb-16 font-semibold">
//         Como funciona o D.A.F.E
//       </h2>

//       {/* Primeiro texto - Cadastro simples */}
//       <div
//         className="flex justify-start w-full py-4"
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="max-w-md text-left">
//           <h4 className="text-3xl font-semibold mb-2">Cadastro simples</h4>
//           <p className="text-medium leading-relaxed">
//             <strong className="font-semibold text-gray-700"> O cadastro é rápido e fácil.</strong> Criar uma conta no
//             aplicativo é fácil e leva apenas alguns minutos.Os alunos informam dados básicos, como
//             nome completo, turma e email institucional, garantindo uma identificação segura e
//             personalizada.
//           </p>
//         </div>
//       </div>

//       {/* Segundo texto - FeedBack constante */}
//       <div className="flex justify-end w-full py-4">
//         <div className="max-w-md text-right">
//           <h4 className="text-3xl font-semibold mb-2">FeedBack Constante</h4>
//           <p className="text-medium leading-relaxed">
//             <strong className="font-semibold text-gray-700"> A sua opinião é fundamental. </strong> Por meio de feedbacks
//             regulares, aprimoramos continuamente a plataforma, ajustando cada detalhe para torná - la
//             mais eficiente, transparente e alinhada às suas necessidades.
//           </p>
//         </div>
//       </div>

//       {/* Terceiro texto */}
//       <div className="flex justify-start w-full py-4">
//         <div className="max-w-md text-left">
//           <h4 className="text-3xl font-semibold mb-2">Receba Comunicados</h4>
//           <p className="text-medium leading-relaxed">
//             <strong className="font-semibold text-gray-700">Fique sempre por dentro das novidades da escola!</strong> 
//             Comunicados importantes, como avisos sobre eventos, reuniões, mudanças no calendário e
//             atualizações gerais, serão enviados diretamente para o seu celular ou computador.
//           </p>
//         </div>
//       </div>

//       {/* Seta SVG que aparece ao hover */}
//       {hovered && (
//         <svg
//           className="absolute"
//           style={{
//             top: "160px", // ajuste para alinhar verticalmente entre os dois textos
//             left: "310px", // ajuste horizontal, centralizado entre os blocos
//             width: "180px",
//             height: "100px",
//             pointerEvents: "none",
//           }}
//           viewBox="0 0 150 100"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M10 60 Q 40 10 80 40 Q 130 80 140 80"
//             stroke="#224A7C"
//             strokeWidth="2"
//             strokeDasharray="5,5"
//             fill="none"
//             markerEnd="url(#arrowhead)"
//           />
//           <defs>
//             <marker
//               id="arrowhead"
//               markerWidth="10"
//               markerHeight="7"
//               refX="0"
//               refY="3.5"
//               orient="auto"
//             >
//               <polygon points="0 0, 10 3.5, 0 7" fill="#224A7C" />
//             </marker>
//           </defs>
//         </svg>
//       )}
//     </section>
//   );
// }
