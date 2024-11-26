import { ref } from "vue";
import { defineStore } from "pinia";

export interface TreeType {
  id: string;
  name: string;
  children: TreeType[];
}

const initialValue: TreeType[] = [
  {
    id: "1",
    name: "Папка 1",
    children: [
      { id: "2", name: "Папка 1.1", children: [] },
      {
        id: "3",
        name: "Папка 1.2",
        children: [{ id: "4", name: "Папка 1.2.1", children: [] }],
      },
    ],
  },
  { id: "5", name: "Папка 2", children: [] },
];

export const useTreeStore = defineStore("tree", () => {
  const list = ref<TreeType[]>(initialValue);

  const addUser = (user: Omit<TreeType, "id">): void => {
    list.value = [...list.value, { id: crypto.randomUUID(), ...user }];
  };

  return { list, addUser };
});
