export default function Flights(props) {
    const resultArray = [];
    return (
        <div className="flights">
            {resultArray.map((flight, i) => (
                <div className="flight">
                    <div className="flight__header">
                        <span>{flight.company} </span>
                        <span className="flight__price">
                            <div className="price__number"></div>
                            <div className="price__caption">Стоимость для одного взрослого пассажира</div>
                        </span>
                    </div>
                    <div className="flight__segments">
                        {flight.segments.map((segment, i) => (
                            <div className="segment">
                                <div className="segment__departure-arrival">
                                    <span className="airport-name">{segment.departureName}</span>
                                    <span className="airport-uid">{segment.departureUID}</span>
                                    →
                                    <span className="airport-name">{segment.arrivalName}</span>
                                    <span className="airport-uid">{segment.arrivalUID}</span>
                                </div>
                                <div className="segment__times">
                                    <span className="time-and-date">
                                        <span className="time">{segment.departureDate.getHours()}</span>
                                        <span className="date">{segment.departureDate.getDay()}</span>
                                    </span>
                                    <span className="total-time">{segment.totalTime}</span>
                                    <span className="time-and-date">
                                        <span className="time">{segment.arrivalDate.getHours()}</span>
                                        <span className="date">{segment.arrivalDate.getDay()}</span>
                                    </span>
                                </div>
                                <div className="segment_amount-of-transfers">
                                    <span className="grey-line"></span>
                                    <span className="amount-of-transfers">{segment.amountOfTransfers}</span>
                                    <span className="grey-line"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flight__host">
                        Рейс выполняет: {flight.company}
                    </div>
                    <div className="yellow-button">Выбрать</div>
                </div>
            ))}
        </div>
    )
}