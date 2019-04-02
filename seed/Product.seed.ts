const products: string[] = ['Microsoft', 'Facebook', 'Google', 'Github', 'Twitter'];

export default [
    {
        model: 'Concept',
        documents: products.map((it: string) => ({ name: it }))
    }
]