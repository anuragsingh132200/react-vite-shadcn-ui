import { Godown, Item } from "./types";

export function buildGodownTree(godowns: Godown[], items: Item[]): Godown[] {
  // Step 1: Initialize a map to store godowns by id
  const godownMap: { [key: string]: Godown } = {};
  godowns.forEach((g) => {
    godownMap[g.id] = { ...g, children: [], items: [] };
  });

  // Step 2: Create a root array for top-level godowns (those with no parent_godown)
  const rootGodowns: Godown[] = [];

  // Step 3: Organize godowns into a tree structure
  godowns.forEach((godown) => {
    const parentId = godown.parent_godown;
    if (parentId) {
      if (godownMap[parentId]) {
        godownMap[parentId].children?.push(godownMap[godown.id]);
      }
    } else {
      rootGodowns.push(godownMap[godown.id]);
    }
  });

  // Step 4: Assign items to the correct godown based on godown_id
  items.forEach((item) => {
    const godownId = item.godown_id;
    if (godownMap[godownId]) {
      godownMap[godownId].items?.push(item);
    }
  });

  return rootGodowns;
}
