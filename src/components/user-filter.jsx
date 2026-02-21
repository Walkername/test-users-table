function UserFilter({ filter, setFilter, onApply, onReset }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onApply();
    };

    return (
        <form className="filter-container" onSubmit={handleSubmit}>
            <select
                value={filter.key}
                onChange={(e) => setFilter({ key: e.target.value, value: "" })}
            >
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="maidenName">Maiden Name</option>
                <option value="age">Age</option>
                <option value="gender">Gender</option>
                <option value="phone">Phone</option>
            </select>

            <input
                type={filter.key === "age" ? "number" : "text"}
                placeholder="Type the value"
                value={filter.value}
                onChange={(e) =>
                    setFilter({ ...filter, value: e.target.value })
                }
            />

            <button type="submit">Apply</button>

            <button className="filter-reset-button" onClick={onReset}>
                Reset
            </button>
        </form>
    );
}

export default UserFilter;
