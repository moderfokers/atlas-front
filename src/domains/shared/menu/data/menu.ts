import {
  ArchiveRestore,
  BookUser,
  CalendarClock,
  Forklift,
  HandCoins,
  Handshake,
  LucideProps,
  Notebook,
} from "lucide-react";

import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IMenuItem {
  id: string;
  title: string;
  url: string;
  permissionId: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const MENU_TREE: IMenuItem[] = [
  {
    id: "REQUESTS_VIEW",
    title: "Solicitudes",
    url: "/hub/requests",
    permissionId: "request_view",
    icon: ArchiveRestore,
  },

  {
    id: "MACHINES_VIEW",
    title: "Maquinaria",
    url: "/hub/machines",
    permissionId: "machine_view",
    icon: Forklift,
  },

  {
    id: "PROJECTS_VIEW",
    title: "Proyectos",
    url: "/hub/projects",
    permissionId: "project_view",
    icon: Notebook,
  },

  {
    id: "CLIENTS_VIEW",
    title: "Clientes",
    url: "/hub/clients",
    permissionId: "client_view",
    icon: Handshake,
  },

  {
    id: "COSTS_VIEW",
    title: "Centro de costos",
    url: "/hub/costs",
    permissionId: "cost_view",
    icon: HandCoins,
  },

  {
    id: "USERS_VIEW",
    title: "Usuarios",
    url: "/hub/users",
    permissionId: "user_view",
    icon: BookUser,
  },

  {
    id: "DAILY_CONTROL_VIEW",
    title: "Control diario",
    url: "/hub/daily_controls",
    permissionId: "tasks_view",
    icon: CalendarClock,
  },
];
export { MENU_TREE };
