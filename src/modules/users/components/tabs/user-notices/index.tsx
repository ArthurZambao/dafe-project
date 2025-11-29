// import { useAuth } from "@/global/context/useAuth";
// import { NoticeFromAPI } from "@/types/notices";
// import { useEffect, useState } from "react";

// export function UserNotices() {
//   const [notices, setNotices] = useState<NoticeFromAPI[]>([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user) return;

//     const fetchNotices = async () => {
//       try {
//         const data = await getUserNotices(user.id);
//         setNotices(data);
//       } catch (error) {
//         console.error('Erro ao buscar os posts:', error);
//       }
//     };

//     fetchNotices();
//   }, [user]);

//   return (

//   )
// }
