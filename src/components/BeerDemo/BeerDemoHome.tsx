import React, {useState} from "react";
import './BeerDemo.css';
import {BEER_MAPPING, DEFAULT_BEER, Product} from "./utils";
import {Matterport} from "./Matterport";
import beer from '../../beer.jpg';
import {getBeerRecommendation} from "../../client/promptClient";

export default function BeerDemoHome() {
    const [beerInput, setBeerInput] = useState(DEFAULT_BEER);
    const [useDefaultBeer, setUseDefaultBeer] = useState(true);
    const [shoppingListInput, setShoppingListInput] = useState("");
    const [result, setResult] = useState<string|null>(null);
    const [selectedBeer, setSelectedBeer] = useState<Product|null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setResult(null);
        setSelectedBeer(null);
        setLoading(true)

        const data = await getBeerRecommendation(beerInput, shoppingListInput)
        if (useDefaultBeer) {
            for (let i = 0; i < BEER_MAPPING.length; i++) {
                if (data.includes(BEER_MAPPING[i].name)) {
                    setSelectedBeer(BEER_MAPPING[i]);
                    break;
                }
            }
        }
        setResult(data);
        setLoading(false)
        setShoppingListInput("");
    }

    let useDefaultBeerChecked = () => {
        if (!useDefaultBeer) {
            setBeerInput(DEFAULT_BEER)
        }
        setUseDefaultBeer(c => !c)
    };

    return (
        <div className="beer-demo">
            <img src={beer} className="icon" alt="beer icon"/>
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
                <div className="flex">
                    <input type="checkbox" checked={useDefaultBeer} onChange={useDefaultBeerChecked}/>
                    <small style={{
                        alignSelf: "end",
                        transform: "translate(-30px, -20px)",
                        color: "#8e8ea0"
                    }}>default</small>
                    <input
                        style={{flex: 1}}
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
            {loading && <div className="loading"></div>}
            {!!result && <div className="result">{result}</div>}
            {!!selectedBeer && <>
                <div className="aisle">You can find this here:
                    <Matterport position={selectedBeer.position} name={selectedBeer.name}/>
                </div>
            </>}
        </div>
    );
}
