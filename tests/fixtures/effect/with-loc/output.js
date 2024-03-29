import { createEffect } from "effector";
// --- valid: empty ---
const empty = createEffect({
    sid: "4624hnhi",
    loc: {
        file: "input.js",
        line: 3,
        column: 14
    }
});
// --- valid: with name ---
const name = createEffect("name", {
    sid: "522356ng",
    loc: {
        file: "input.js",
        line: 5,
        column: 13
    }
});
// --- valid: handler ---
const handler = createEffect(()=>0, {
    sid: "9a72uc30",
    loc: {
        file: "input.js",
        line: 7,
        column: 16
    }
});
// --- valid: with name & config ---
const nameAndConfig = createEffect("name", {
    sid: "7c5gx1a8",
    loc: {
        file: "input.js",
        line: 9,
        column: 22
    },
    and: {
        handler: ()=>0
    }
});
// --- valid: config only ---
const config = createEffect({
    name: "name",
    handler: ()=>0
}, {
    sid: "4eocjumk",
    loc: {
        file: "input.js",
        line: 11,
        column: 15
    }
});
// --- valid: with config ---
const configured = createEffect({
    name: "name"
}, {
    sid: "5stbtlct",
    loc: {
        file: "input.js",
        line: 13,
        column: 19
    }
});
