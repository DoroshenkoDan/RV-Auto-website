export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  age: number;
  yearsInField: number;
  carsDelivered: number;
};

export const TEAM: TeamMember[] = [
  {
    id: "founder",
    name: "Андрій Ковальчук",
    role: "Засновник · підбір і торги",
    age: 34,
    yearsInField: 9,
    carsDelivered: 260,
  },
  {
    id: "logistics",
    name: "Ігор Мельник",
    role: "Логістика та розмитнення",
    age: 31,
    yearsInField: 7,
    carsDelivered: 180,
  },
  {
    id: "manager",
    name: "Олена Гриценко",
    role: "Менеджер супроводу клієнтів",
    age: 28,
    yearsInField: 5,
    carsDelivered: 160,
  },
];
