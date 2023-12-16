export default function SearchOptions() {
    return (
        <div className="search-options">
            <div className="search-options__decorative-grey-block_top"></div>
            <form className="search-options__form">
                <fieldset className="sortField">
                    <legend>Сортировать</legend>
                    <div>
                        <input type="radio" name="sort" value="- по возрастанию цены" />
                        <label>- по возрастанию цены</label>
                    </div>
                    <div>
                        <input type="radio" name="sort" value="- по убыванию цены" />
                        <label>- по убыванию цены</label>
                    </div>
                    <div>
                        <input type="radio" name="sort" value="- по времени в пути" />
                        <label>- по времени в пути</label>
                    </div>
                </fieldset>
                <fieldset className="filterField">
                    <legend>Фильтровать</legend>
                    <div>
                        <input type="checkbox" name="filter" value="- 1 пересадка" />
                        <label>- 1 пересадка</label>
                    </div>
                    <div>
                        <input type="checkbox" name="filter" value="- без пересадок" />
                        <label>- без пересадок</label>
                    </div>
                </fieldset>
                <fieldset className="priceField">
                    <legend>Цена</legend>
                    <div>
                        <input type="number" name="price" value="0"/>
                    </div>
                    <div>
                        <input type="number" name="price" value="10000" />
                    </div>
                </fieldset>
            </form>
            {/* <div className="search-options__sort"></div>
            <div className="search-options__filter"></div>
            <div className="search-options__price-range"></div>
            <div className="search-options__company"></div> */}
            <div className="search-options__decorative-grey-block_bottom"></div>
        </div>
    )
}