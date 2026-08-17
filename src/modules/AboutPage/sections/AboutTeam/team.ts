export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  yearsInField: number;
  carsDelivered: number;
};

export const TEAM: TeamMember[] = [
  {
    id: "founder",
    name: "Андрій Ковальчук",
    role: "Засновник · підбір і торги",
    yearsInField: 9,
    carsDelivered: 260,
  },
  {
    id: "logistics",
    name: "Ігор Мельник",
    role: "Логістика та розмитнення",
    yearsInField: 7,
    carsDelivered: 180,
  },
  {
    id: "manager",
    name: "Олена Гриценко",
    role: "Менеджер супроводу клієнтів",
    yearsInField: 5,
    carsDelivered: 160,
  },
];
