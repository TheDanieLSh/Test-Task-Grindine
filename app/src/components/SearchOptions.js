import { useDispatch } from 'react-redux';
import { setValue } from '../redux/dataTransferReducer';
import { useEffect, useState } from 'react';

export default function SearchOptions() {
    const [state, setState] = useState(null);
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
                if (this.polishAirlines != false) {
                    companiesArray.push('LOT Polish Airlines')
                }
                if (this.aeroflot != false) {
                    companiesArray.push('Аэрофлот - российские авиалинии')
                }
                return companiesArray
            },
            get requirements() {
                let requirementsArray = [];
                if (this.noMoreThanOneTransfer != false) {
                    const jusOneTransferCheck = (s) => {
                        if (s.hasOnlyOneTransfer == true) {
                            return 1
                        } else { return 0 }
                    }
                    requirementsArray.push(jusOneTransferCheck)
                }
                if (this.withoutTransfers != false) {
                    const noTransfersCheck = (s) => {
                        if (s.amountOfTransfers == 0) {
                            return 1
                        } else { return 0 }
                    }
                    requirementsArray.push(noTransfersCheck)
                }
                return requirementsArray
            }
        }
        console.log(parameters);
        for (let key in parameters) {
            if (parameters[key] == undefined) {
                parameters[key] = false
            }
        }

        const reducedArray = flightsJSON.result.flights.reduce((acc, current) => {
            if (current.flight) {
                acc.push(current.flight)
            }
            return acc
        }, [])
        // const thirdOfArray = reducedArray.reduce((acc, current, i) => {
        //     if (i <= (reducedArray.length / 3)) {
        //         acc.push(current)
        //     }
        //     return acc
        // }, [])
        const flightsArray = [];
        reducedArray.forEach(flight => {
            flightsArray.push({
                hostCompany: flight.carrier.caption,
                cost: flight.price.total.amount,
                segments: [
                    flight.legs.map(leg => (
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
                            get hasOnlyOneTransfer() {
                                let val = false;
                                if (this.amountOfTransfers == 1) {
                                    val = true
                                }
                                return val
                            },
                            airlineCompany: leg.segments[0].airline.caption,
                        }
                    ))
                ],
                appropriate: true,
            })
        })

        const sortedArray = [];
        flightsArray.forEach(flight => {
            flight.segments[0].forEach(segment => {
                // if ((parameters.noMoreThanOneTransfer != false) && (segment.amountOfTransfers > 1)) {
                //     flight.appropriate = false
                // }
                // if (parameters.withoutTransfers != false) {
                //     if (parameters.noMoreThanOneTransfer != false) {
                //         if (segment.amountOfTransfers > 1) {
                //             flight.appropriate = false
                //         }
                //     } else if (segment.amountOfTransfers > 0) {
                //         flight.appropriate = false
                //     }
                // }
                if (parameters.requirements != 0) {
                    let fits = 0;
                    parameters.requirements.forEach(req => {
                        fits += req(segment)
                    })
                    if (fits < 1) {
                        flight.appropriate = false
                    }
                }
            })
            if ((flight.cost < parameters.priceFrom) || (flight.cost > parameters.priceTo)) {
                flight.appropriate = false
            }
            parameters.suitableCompanies.forEach(company => {
                let fits = 0;
                if (flight.hostCompany == company) {
                    fits += 1
                }
                if (fits < 1) {
                    flight.appropriate = false
                }
            })
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
        sortedArray.forEach(fl => {
            fl.segments[0].forEach(seg => {
                seg.departureDate = seg.departureDate.toString();
                seg.arrivalDate = seg.arrivalDate.toString();
            })
        })
        setState(sortedArray);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setValue(state));
    })


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
    )
}