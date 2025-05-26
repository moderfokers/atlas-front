import { IRequestStatus } from "../ui/wrappers/WRequestForm";

export const REQUESTS_STATUS: IRequestStatus[] = [
  {
    id: "POR_ASIGNAR",
    name: "Por asignar",
    color: "#fcd34d",
  },
  {
    id: "ASIGNADA",
    name: "Asignada",
    color: "#ecfccb",
  },
  {
    id: "CERRADA",
    name: "Cerrada",
    color: "#ef4444",
  },
  {
    id: "VENCIDA",
    name: "Vencida",
    color: "#94a3b8",
  },
];
