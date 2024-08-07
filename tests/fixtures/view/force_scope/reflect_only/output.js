import { useUnit } from "effector-react";
import { reflect } from "@effector/reflect";
// --- reflect/enabled ---
const Name = reflect({
    view: Input,
    bind: {
        value: $name,
        placeholder: "Name"
    },
    useUnitConfig: {
        forceScope: true
    }
});
// --- useUnit/disabled ---
useUnit($name);
