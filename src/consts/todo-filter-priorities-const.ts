import { v4 as uuidv4 } from "uuid";

const priorities: TPriorities = {
    HIGH: "HIGH",
    MEDIUM: "MEDIUM",
    LOW: "LOW"
}

const todoFilterPrioritiesConst: TTodoFilterPriorityItem[] = [
    {
        id: uuidv4(),
        name: "Cao",
        value: priorities.HIGH,
        color: "bg-purple-500"
    },
    {
        id: uuidv4(),
        name: "Trung bình",
        value: priorities.MEDIUM,
        color: "bg-indigo-500"
    },
    {
        id: uuidv4(),
        name: "Thấp",
        value: priorities.LOW,
        color: "bg-neutral-500"
    }
];

export default todoFilterPrioritiesConst;