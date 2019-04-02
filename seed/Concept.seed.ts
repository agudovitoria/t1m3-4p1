const concepts:string[] = ['Working', 'Holiday', 'Illness', 'Absence'];

export default [
    {
        model: 'Concept',
        documents: concepts.map((it) => ({ name: it }))
    }
];
