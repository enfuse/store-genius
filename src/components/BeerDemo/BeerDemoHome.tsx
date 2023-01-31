import { Typography } from "@mui/material";
import React, {useState} from "react";
// import styles from "../index.module.css";
import {BeerMappins, BEER_MAPPING, DEFAULT_BEER, Product} from "./utils";
import {getBeerRecommendation} from '../../client/promptClient'
import { Matterport } from "./Matterport";

export default function BeerDemoHome() {
    const [beerInput, setBeerInput] = useState(DEFAULT_BEER);
    const [useDefaultBeer, setUseDefaultBeer] = useState(true);
    const [shoppingListInput, setShoppingListInput] = useState("");
    const [result, setResult] = useState();
    const [selectedBeer, setSelectedBeer] = useState<Product|null>(null);
    const [loading, setLoading] = useState(false);
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setResult(undefined);
        setSelectedBeer(null);
        setLoading(true)
        const data = await getBeerRecommendation(beerInput,shoppingListInput)
        console.log("response", data)
        // const data = await response.json();
        if (useDefaultBeer) {
            for (let key of Object.keys(BEER_MAPPING)) {

                if (data.includes(key)) {
                    setSelectedBeer(BEER_MAPPING[key as keyof BeerMappins] as Product);                    break;
                }
            }
        }
        setResult(data.result);
        setLoading(false)
        setShoppingListInput("");
    }

    let onUseDefaultBeerChecked = () => {
        if (!useDefaultBeer) {
            setBeerInput(DEFAULT_BEER)
        }
        setUseDefaultBeer(c => !c)
    };

    return (
        <div>


            {/* <main className={styles.main}> */}
            <main >
                {/* <img src="/beer.jpg" className={styles.icon}/> */}
                {/* <img src="/beer.jpg"/> */}
                <h3>Recommend a beer for me!</h3>
                <p>
                    This site will recommend a beer for you, you can optionally give it a list of beers (e.g. heineken,
                    bud light,
                    805 firestone walker, stone imperial stout, Everett Hill Farmstead) and the service will only return
                    a beer
                    from the provided list.
                </p>
                <form onSubmit={onSubmit}>
                    <label>Beer List</label>
                    {/* <div className={styles.flex}> */}
                    <div>
                        <input type="checkbox"  checked={useDefaultBeer} onChange={onUseDefaultBeerChecked}/>
                        <small style={{alignSelf: "end", transform: "translate(-30px, -20px)", color: "#8e8ea0"}}>default</small>
                        <input
                            style={{  flex: 1}}
                            disabled={useDefaultBeer}
                            type="text"
                            name="beer"
                            required
                            placeholder="heineken, bud light, 805 firestone walker, stone imperial stout, Everett Hill Farmstead"
                            value={beerInput}
                            onChange={(e) => setBeerInput(e.target.value)}
                        />
                    </div>
                    <label>Shopping List</label>
                    <input
                        type="text"
                        name="shoppingList"
                        required
                        placeholder="Broccoli, pasta, garlic, ground beef"
                        value={shoppingListInput}
                        onChange={(e) => setShoppingListInput(e.target.value)}
                    />
                    <input type="submit" value="Generate Beer Recommendation"
                           disabled={shoppingListInput.length === 0 || beerInput.length === 0}/>
                </form>
                {/* {!!loading && <div className={styles.loading}></div>} */}
                {!!loading && <div></div>}
                {/* {!!result && <div className={styles.result}>{result}</div>} */}
                {!!result && <div >{result}</div>}
                {!!selectedBeer && <>
                    {/* <div className={styles.aisle}>You can find this here: */}
                    <div >You can find this here:
                        <Matterport position={selectedBeer.position} name={selectedBeer.name}/>
                    </div>
                </>}
            </main>
        </div>
    );
}
