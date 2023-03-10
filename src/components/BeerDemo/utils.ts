export type Product = {
    name:string,
    position: {x:number, y:number, z:number},
    prompt:string
}

export const BEER_MAPPING : Product[] = [{
        name: "Samuel Adams",
        position: { x: 8.464, y: 0.997, z: -15.914 },
        prompt: "Broccoli, pasta, ground beef, tomato sauce"
    },
    {
        name: "Corona Light",
        position: { x: 11.427, y: 1.293, z: -15.945 },
        prompt: "Lightly-seasoned vegetables, such as steamed or grilled asparagus or zucchini"
    },
    {
        name: "Voodoo Ranger",
        position: { x: 2.381, y: 0.724, z: -15.966 },
        prompt: "Salad, tomato, carrot"
    },
]

export const DEFAULT_BEER = BEER_MAPPING.map(beer => beer.name).join(', ');