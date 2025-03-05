import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends ComponentProps<'div'> {}

export function CardRoot({ ...props }: CardProps) {
	return (
		<div
			className="grid grid-cols-[auto_auto_1fr] gap-8 items-center justify-center py-2 px-2 border border-orange-400 rounded-md"
			{...props}
		/>
	);
}

interface CardFlashProps extends ComponentProps<'div'> {}

export function CardFlash({ ...props }: CardFlashProps) {

  return (
    <div 
      className="flex flex-row grid-cols-card w-full bg-white shadow-lg text-sm items-center p-4 gap-4 rounded-md" 
      {...props}
    />
  );
}

interface CardIconProps extends ComponentProps<'div'> {}

export function CardIcon({ className, ...props }: CardIconProps) {

  return (
    <div 
      className={twMerge("flex bg-blue-700 text-white p-4 text-base items-center py-4 gap-4 rounded-md shadow-lg", className)}
      {...props}
    />
  );
}

interface CardInformationsProps extends ComponentProps<'div'> {
  count: number,
  name: string 
};

export function CardInformations({ count, name }: CardInformationsProps) {
  return (
    <div className="flex flex-col text-center">
      <span className="text-2xl font-bold">{count}</span>
      <span className="text-sm font-light">{name}</span>
    </div>
  );
}

interface CardWrapperColProps extends ComponentProps<'div'> {}

export function CardWrapperCol({ ...props }: CardWrapperColProps ){
  return (
    <div
      className="flex flex-col gap-2 justify-center" 
      {...props}
    />
  );
}

interface CardWrapperRowProps extends ComponentProps<'div'> {}

export function CardWrapperRow({ ...props }: CardWrapperRowProps ){
  return (
    <div
      className="flex gap-2 justify-center" 
      {...props}
    />
  );
}


// import { Card } from '@/components/Card/Card';
// import {
//   Bug,
//   CheckCircle,
//   Circle,
//   CircleHalf,
//   ClipboardText,
//   Clock,
//   Flame,
//   Hourglass,
//   ShieldCheck,
//   UserCirclePlus,
//   Warning,
//   WarningCircle,
// } from 'phosphor-react';

// interface PropsStatusTickets {
//   data: {
//     tickets_total: number;
//     tickets_open: number;
//     tickets_assigned: number;
//     tickets_pending: number;
//     tickets_solved: number;
//     tickets_closed: number;
//   };
// }

// interface PropsPriorityAndTypeTickets {
//   type: {
//     incident: number;
//     request: number;
//   };

//   data: {
//     tickets_very_low: number;
//     tickets_low: number;
//     tickets_medium: number;
//     tickets_high: number;
//     tickets_very_high: number;
//   };
// }

// interface RequestTicketsPendingProps {
//   id: number;
//   title: string;
//   date_cretion: string;
//   solvedate: string;
//   location: string;
//   applicant: string;
//   technical: string;
//   status: string;
//   priority: string;
// }

// interface RequestPendingProps {
//   data: RequestTicketsPendingProps[];
// }

// export function CardTicketsPending({ data }: RequestPendingProps) {
//   const priorities = ['Muito baixa', 'Baixa', 'Média', 'Alta', 'Muito alta'];

//   const countPriorities = data.reduce<Record<string, number>>((acc, ticket) => {
//     // Pega a prioridade do ticket
//     const priority = ticket.priority;

//     // Se já existir uma contagem para essa prioridade, incrementa; caso contrário, inicia em 1
//     if (acc[priority]) {
//       acc[priority] += 1;
//     } else {
//       acc[priority] = 1;
//     }

//     return acc;
//   }, {});

//   // biome-ignore lint/complexity/noForEach: <explanation>
//   priorities.forEach((pending) => {
//     if (!countPriorities[pending]) {
//       countPriorities[pending] = 0;
//     }
//   });
  

//   return (
//     <section className="mb-4">
//       <div className="grid md:grid-cols-2 gap-
//         <Card
//           icon={Clock}
//           quantity={data?.length}
//           title="Chamados Abertos"
//           className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
//         />

//         <div className="grid grid-cols-5 gap-4">
//           {priorities.map(p => (
//             <div key={p} className="bg-white flex flex-col items-center">
//               <span className="text-sm font-medium">{p}</span>
//               <span className="text-lg font-bold">{countPriorities[p]}</span>
//             </div>
//           ))}
//         </div>

//         {/* <Card
//         icon={Clock}
//         quantity={data?.tickets_open}
//         title="Chamados Abertos"
//         className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
//       /> */}
//       </div>
//     </section>
//   );
// }

// export function CardStatusTickets({ data }: PropsStatusTickets) {
//   // https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
//   // const arrayWithStatusFormatting = [];
//   // for (let [key, value] of Object.entries(statusTicketsAmount)) {
//   //   const formattedStatusOnObject = { status: key, value };
//   //   arrayWithStatusFormatting.push(formattedStatusOnObject);
//   // }

//   return (
//     <section className="mb-4">
//       <div className="grid md:grid-cols-4 gap-4">
//         {/* <Card
//           icon={Clock}
//           quantity={data?.tickets_open}
//           title="Chamados Abertos"
//           className="h-10 w-10 bg-yellow-100 text-yellow-500 rounded-md p-2 border border-yellow-500"
//         /> */}
//         <Card
//           icon={UserCirclePlus}
//           quantity={data?.tickets_assigned}
//           title="Chamados Atribuídos"
//           className="h-10 w-10 bg-blue-100 text-blue-500 rounded-md p-2 border border-blue-500"
//         />
//         <Card
//           icon={Hourglass}
//           quantity={data?.tickets_pending}
//           title="Chamados Pendentes"
//           className="h-10 w-10 bg-orange-100 text-orange-500 rounded-md p-2 border border-orange-500"
//         />
//         {/* <Card
//           icon={CheckCircle}
//           quantity={data?.tickets_solved}
//           title="Chamados Solucionados"
//           className="h-10 w-10 bg-green-200 text-green-600 rounded-md p-2 border border-green-500"
//         />
//         <Card
//           icon={ShieldCheck}
//           quantity={data?.tickets_closed}
//           title="Chamados Fechados"
//           className="h-10 w-10 bg-green-700 text-green-100 rounded-md p-2 border border-green-500"
//         /> */}
//       </div>
//     </section>
//   );
// }

// export function CardPriorityAndTypeTickets({
//   data,
//   type,
// }: PropsPriorityAndTypeTickets) {
//   return (
//     <section className="mb-4 flex gap-4">
//       {/* <div className="h-auto border-l-4 border-orange-400 rounded-lg" /> */}

//       {/* Cards de Prioridade */}
//       <div className="grid md:grid-cols-5 gap-4 flex-grow">
//         <Card
//           icon={Circle}
//           quantity={data?.tickets_very_low}
//           title="Muito baixa"
//           className="h-10 w-10 bg-blue-600 text-blue-100 rounded-md p-2 border border-blue-700"
//         />
//         <Card
//           icon={CircleHalf}
//           quantity={data?.tickets_low}
//           title="Baixa"
//           className="h-10 w-10 bg-blue-400 text-blue-100 rounded-md p-2 border border-blue-700"
//         />
//         <Card
//           icon={WarningCircle}
//           quantity={data?.tickets_medium}
//           title="Média"
//           className="h-10 w-10 bg-orange-400 text-orange-100 rounded-md p-2 border border-orange-500"
//         />
//         <Card
//           icon={Warning}
//           quantity={data?.tickets_high}
//           title="Alta"
//           className="h-10 w-10 bg-yellow-400 text-yellow-100 rounded-md p-2 border border-yellow-500"
//         />
//         <Card
//           icon={Flame}
//           quantity={data?.tickets_very_high}
//           title="Muito Alta"
//           className="h-10 w-10 bg-red-600 text-red-100 rounded-md p-2 border border-red-700"
//         />
//       </div>

//       <div className="h-auto border-l-4 border-orange-400 rounded-lg" />

//       {/* Cards de Requisição/Incidente */}
//       <div className="flex gap-2">
//         <Card
//           icon={ClipboardText}
//           quantity={type?.request}
//           title="Requisição"
//           className="size-10 bg-blue-600 text-blue-100 rounded-md p-2 border border-blue-700 flex-grow"
//         />
//         <Card
//           icon={Bug}
//           quantity={type?.incident}
//           title="Incidente"
//           className="size-10 bg-red-600 text-blue-100 rounded-md p-2 border border-red-700 flex-grow"
//         />
//       </div>
//     </section>
//   );
// }
