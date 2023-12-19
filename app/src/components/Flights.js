import { useSelector } from "react-redux"

export default function Flights() {
    const resultArray = useSelector(state => state.dataTransferReducer.suitableFlights);
    // resultArray.forEach(flight => {
    //     flight.segments[0].forEach(segment => {
    //         segment.departureDate = new Date(segment.departureDate);
    //         segment.arrivalDate = new Date(segment.arrivalDate);
    //     })
    // })
    if (resultArray) {
        return (
            <div className="flights">
                {resultArray.map((flight, i) => (
                    <div className="flight" key={i}>
                        <div className="flight__header">
                            <span className="flight__company">{flight.hostCompany}</span>
                            <span className="flight__price">
                                <div className="price__number">{flight.cost + ' ₽'}</div>
                                <div className="price__caption">Стоимость для одного взрослого пассажира</div>
                            </span>
                        </div>
                        <div className="flight__segments">
                            {flight.segments[0].map((segment, i) => (
                                <div className="segment" key={i}>
                                    <div className="segment__departure-arrival">
                                        <span className="airport-name">{segment.departureAirport}</span>
                                        <span className="airport-uid">{'(' + segment.departureUID + ')'}</span>
                                        <span className="blue-arrow">→</span>
                                        <span className="airport-name">{segment.arrivalAirport}</span>
                                        <span className="airport-uid">{'(' + segment.arrivalUID + ')'}</span>
                                    </div>
                                    <div className="segment__times">
                                        <span className="time-and-date">
                                            <span className="time">{(new Date(segment.departureDate)).getHours}</span>
                                            <span className="date">{(new Date(segment.departureDate)).getDay}</span>
                                        </span>
                                        {/* <span className="total-time">{segment.totalTime}</span> */}
                                        <span className="time-and-date">
                                            <span className="time">{(new Date(segment.arrivalDate)).getHours}</span>
                                            <span className="date">{(new Date(segment.arrivalDate)).getDay}</span>
                                        </span>
                                    </div>
                                    <div className="segment_amount-of-transfers">
                                        <span className="grey-line"></span>
                                        <span className="amount-of-transfers">{segment.amountOfTransfers + ' пересадка'}</span>
                                        <span className="grey-line"></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flight__host">
                            Рейс выполняет: {flight.hostCompany}
                        </div>
                        <div className="yellow-button">Выбрать</div>
                    </div>
                ))}
            </div>
        )
    }
}