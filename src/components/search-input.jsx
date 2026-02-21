function SearchInput({ value, onChange }) {
    return (
        <input
            className="search"
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default SearchInput;