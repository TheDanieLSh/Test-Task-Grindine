import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SearchOptions() {
    // const flightsJSON = useSelector(state => state.fetchDataReducer.flights);
    // console.log(flightsJSON);
    async function submitParameters(e) {
        e.preventDefault();
        const response = await fetch('../flights.json');
        const flightsJSON = await response.json();
        console.log(flightsJSON);
    }

    return (
        <div className="search-options">
            <div className="search-options__decorative-grey-block_top"></div>
            <form className="search-options__form">
                <fieldset className="sortField">
                    <legend>Сортировать</legend>
                    <div>
                        <input type="radio" name="sort" value="- по возрастанию цены" />
                        <label> - по возрастанию цены</label>
                    </div>
                    <div>
                        <input type="radio" name="sort" value="- по убыванию цены" />
                        <label> - по убыванию цены</label>
                    </div>
                    <div>
                        <input type="radio" name="sort" value="- по времени в пути" />
                        <label> - по времени в пути</label>
                    </div>
                </fieldset>
                <fieldset className="filterField">
                    <legend>Фильтровать</legend>
                    <div>
                        <input type="checkbox" name="filter" value="- 1 пересадка" />
                        <label> - 1 пересадка</label>
                    </div>
                    <div>
                        <input type="checkbox" name="filter" value="- без пересадок" />
                        <label> - без пересадок</label>
                    </div>
                </fieldset>
                <fieldset className="priceField">
                    <legend>Цена</legend>
                    <div>
                        <label>От</label>
                        <input type="number" name="price" value="0"/>
                    </div>
                    <div>
                        <label>До</label>
                        <input type="number" name="price" value="10000" />
                    </div>
                </fieldset>
                <fieldset className="companiesField">
                    <legend>Авиакомпании</legend>
                    <div>
                        <input type="checkbox" name="filter" value="- LOT Polish Airlines от 21049 р." />
                        <label> - LOT Polish Airlines от 21049 р.</label>
                    </div>
                    <div>
                        <input type="checkbox" name="filter" value="- Аэрофлот от 31733 р." />
                        <label> - Аэрофлот от 31733 р.</label>
                    </div>
                </fieldset>
                <button onClick={submitParameters}>Поиск</button>
            </form>
            <div className="search-options__decorative-grey-block_bottom"></div>
        </div>
    )
}