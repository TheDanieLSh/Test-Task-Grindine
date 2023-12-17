import { current } from "@reduxjs/toolkit";

export default function SearchOptions() {
    async function submitParameters(e) {
        e.preventDefault();
        const response = await fetch('/flights.json');
        const flightsJSON = await response.json();
        const parameters = {
            sorting: document.querySelector('input[name="sort"]:checked')?.value,
            noMoreThanOneTransfer: document.querySelector('input[name="filterOne"]:checked')?.value,
            withoutTransfers: document.querySelector('input[name="filterNo"]:checked')?.value,
            priceFrom: document.querySelector('input[name="priceFrom"]').value,
            priceTo: document.querySelector('input[name="priceTo"]').value,
            polishAirlines: document.querySelector('input[name="PolishAirlines"]:checked')?.value,
            aeroflot: document.querySelector('input[name="Aeroflot"]:checked')?.value,
            get suitableCompanies() {
                let companiesArray = [];
                if (parameters.polishAirlines == true) {
                    companiesArray.push('LOT Polish Airlines')
                }
                if (parameters.aeroflot == true) {
                    companiesArray.push('Аэрофлот - российские авиалинии')
                }
                return companiesArray
            }
        }
        console.log(parameters);
        for (let key in parameters) {
            if (parameters[key] == undefined) {
                parameters[key] = false
            }
        }
        // const reducedArray = [];
        // flightsJSON.result.flights.reduce(
        //     (previous, current) => (previous.push(current.flight)), reducedArray)
        // console.log(reducedArray);
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
                            departureCity: leg.segments[0].departureCity,
                            departureDate: new Date(leg.segments[0].departureDate),
                            arrivalUID: leg.segments.at(-1).arrivalAirport.uid,
                            arrivalAirport: leg.segments.at(-1).arrivalAirport.caption,
                            arrivalCity: leg.segments.at(-1).arrivalCity,
                            arrivalDate: new Date(leg.segments.at(-1).arrivalDate),
                            amountOfTransfers: leg.segments.length - 1,
                            airlineCompany: leg.segments[0].airline.caption,
                        }
                    ))
                ],
                appropriate: true,
            })
        })
        console.log(flightsArray);
        const sortedArray = [];
        flightsArray.forEach(flight => {
            flight.segments.forEach(segment => {
                if ((parameters.noMoreThanOneTransfer == true) && (segment.amountOfTransfers > 1)) {
                    flight.appropriate = false
                }
                if (parameters.withoutTransfers == true) {
                    if (parameters.noMoreThanOneTransfer == true) {
                        if (segment.amountOfTransfers > 1) {
                            flight.appropriate = false
                        }
                    } else if (segment.amountOfTransfers > 0) {
                        flight.appropriate = false
                    }
                }
            })
            if ((flight.cost < parameters.priceFrom) || (flight.cost > parameters.priceTo)) {
                flight.appropriate = false
            }
            if (parameters.polishAirlines == true) {
                if (parameters.aeroflot == false) {
                    if (flight.hostCompany != 'LOT Polish Airlines') {
                        flight.appropriate = false
                    }
                } else {
                    if ((flight.hostCompany != 'LOT Polish Airlines') || (flight.hostCompany != 'Аэрофлот - российские авиалинии')) {
                        flight.appropriate = false
                    }
                }
            }
            if (parameters.aeroflot == true) {
                if (parameters.polishAirlines == false) {
                    if (flight.hostCompany != 'Аэрофлот - российские авиалинии') {
                        flight.appropriate = false
                    }
                } else {
                    if ((flight.hostCompany != 'Аэрофлот - российские авиалинии') || (flight.hostCompany != 'LOT Polish Airlines')) {
                        flight.appropriate = false
                    }
                }
            }
        })
        flightsArray.forEach(flight => {
            if (flight.appropriate == true) {
                sortedArray.push(flight)
            }
        })
        switch (parameters.sorting) {
            case 'rise':
                sortedArray.sort((a, b) => {
                    if (a.cost > b.cost) {
                        return 1
                    }
                    if (a.cost < b.cost) {
                        return -1
                    }
                    if (a.cost == b.cost) {
                        return 0
                    }
                })
            break
            case 'decreasing':
                sortedArray.sort((a, b) => {
                    if (a.cost < b.cost) {
                        return 1
                    }
                    if (a.cost > b.cost) {
                        return -1
                    }
                    if (a.cost == b.cost) {
                        return 0
                    }
                })
            break
            case 'timeCost':
                sortedArray.sort((a, b) => {
                    if ((a.segments.at(-1).arrivalDate - a.segments[0].departureDate) > (b.segments.at(-1).arrivalDate - b.segments[0].departureDate)) {
                        return 1
                    }
                    if ((a.segments.at(-1).arrivalDate - a.segments[0].departureDate) < (b.segments.at(-1).arrivalDate - b.segments[0].departureDate)) {
                        return -1
                    }
                    if ((a.segments.at(-1).arrivalDate - a.segments[0].departureDate) == (b.segments.at(-1).arrivalDate - b.segments[0].departureDate)) {
                        return 0
                    }
                })
                break
        }
        console.log(sortedArray);
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
                    <input type="number" name="priceFrom" defaultValue="104598" />
                </div>
                <div>
                    <label>До</label>
                    <input type="number" name="priceTo" defaultValue="200000" />
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
)}