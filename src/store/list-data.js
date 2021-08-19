import {v4} from "uuid"

export const list = [{
  id: v4(),
  name: "Demand",
  uri: "/demand",
  isAdded: true,
}, {
  id: v4(),
  name: "Mines",
  uri: "/mines",
  isAdded: true,
}, {
  id: v4(),
  name: "Storages",
  uri: "/storages",
  isAdded: true,
}, {
  id: v4(),
  name: "Supply",
  uri: "/supply",
  isAdded: true,
}, {
  id: v4(),
  name: "Calculations",
  uri: "/calculations",
  isAdded: true,
}, {
  id: v4(),
  name: "Execute group of calculation tasks",
  uri: "/execute-group-of-calculation-tasks",
  isAdded: true,
}]