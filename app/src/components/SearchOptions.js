import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SearchOptions() {
    async function submitParameters(e) {
        e.preventDefault();
        const response = await fetch('/flights.json');
        const flightsJSON = await response.json();
        const flightParams = {
            cost: Number,
            get totalAmountOfTransfers() {
                let totalTransfers = 0;
                this.segments.forEach(segment => {
                    totalTransfers += segment.amountOfTransfers;
                });
                return totalTransfers;
            },
            hostCompany: String,
            segments: [
                {
                    departureName: String,
                    departureUID: String,
                    arrivalName: String,
                    arrivalUID: String,
                    departureDate: new Date(),
                    arrivalDate: new Date(),
                    amountOfTransfers: Number,
                    airlineCompany: String,
                }
            ]
        }
        const parameters = {
            sorting: document.querySelector('input[name="sort"]:checked')?.value,
            noMoreThanOneTransfer: document.querySelector('input[name="filterOne"]:checked')?.value,
            withoutTransfers: document.querySelector('input[name="filterNo"]:checked')?.value,
            priceFrom: document.querySelector('input[name="priceFrom"]').value,
            priceTo: document.querySelector('input[name="priceTo"]').value,
            polishAirlines: document.querySelector('input[name="PolishAirlines"]:checked')?.value,
            aeroflot: document.querySelector('input[name="aeroflot"]:checked')?.value,
        }
        for (let key in parameters) {
            if (parameters[key] == undefined) {
                parameters[key] = false
            }
        }
        const flightsArray = [];
        flightsJSON.result.flights.forEach(f => {
            flightsArray.push({
                hostCompany: f.flight.carrier.caption,
                cost: f.flight.price.total.amount,
                segments: [
                    f.flight.legs.map(leg => (
                        {
                            departureUID: leg.segments[0].departureAirport.uid,
                            departureAirport: leg.segments[0].departureAirport.caption,
                            departureCity: leg.segments[0].departureCity.caption,
                            departureDate: new Date(leg.segments[0].departureDate),
                            arrivalUID: leg.segments.at(-1).arrivalAirport.uid,
                            arrivalAirport: leg.segments.at(-1).arrivalAirport.caption,
                            arrivalCity: leg.segments.at(-1).arrivalCity.caption,
                            arrivalDate: new Date(leg.segments.at(-1).arrivalDate),
                        }
                    ))
                ]
            })
        })
    }
}

return (
    <div className="search-options">
        <div className="search-options__decorative-grey-block_top"></div>
        <form className="search-options__form">
            <fieldset className="sortField">
                <legend>Сортировать</legend>
                <div>
                    <input type="radio" name="sort" value="rise" />
                    <label> - по возрастанию цены</label>
                </div>
                <div>
                    <input type="radio" name="sort" value="decreasing" />
                    <label> - по убыванию цены</label>
                </div>
                <div>
                    <input type="radio" name="sort" value="timeCost" />
                    <label> - по времени в пути</label>
                </div>
            </fieldset>
            <fieldset className="filterField">
                <legend>Фильтровать</legend>
                <div>
                    <input type="checkbox" name="filterOne" value={true} />
                    <label> - 1 пересадка</label>
                </div>
                <div>
                    <input type="checkbox" name="filterNo" value={true} />
                    <label> - без пересадок</label>
                </div>
            </fieldset>
            <fieldset className="priceField">
                <legend>Цена</legend>
                <div>
                    <label>От</label>
                    <input type="number" name="priceFrom" defaultValue="0" />
                </div>
                <div>
                    <label>До</label>
                    <input type="number" name="priceTo" defaultValue="10000" />
                </div>
            </fieldset>
            <fieldset className="companiesField">
                <legend>Авиакомпании</legend>
                <div>
                    <input type="checkbox" name="PolishAirlines" value={true} />
                    <label> - LOT Polish Airlines от 21049 р.</label>
                </div>
                <div>
                    <input type="checkbox" name="Aeroflot" value={true} />
                    <label> - Аэрофлот от 31733 р.</label>
                </div>
            </fieldset>
            <button onClick={submitParameters}>Поиск</button>
        </form>
        <div className="search-options__decorative-grey-block_bottom"></div>
    </div>
)