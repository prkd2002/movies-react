const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="./search.svg" alt="Search Icon"/>
                <input className="in" type="text" placeholder="Search through thousand of movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
    )
}
export default Search
