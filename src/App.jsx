import { useState } from "react";
import { useUsers } from "./hooks/use-users";
import UserTable from "./components/user-table";
import Pagination from "./components/pagination";
import UserModal from "./components/user-modal";
import "./App.css";
import { useDebounce } from "./hooks/use-debounce";
import SearchInput from "./components/search-input";
import UserFilter from "./components/user-filter";

function App() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({
        key: "firstName",
        value: "",
    });
    const [appliedFilter, setAppliedFilter] = useState({
        key: "firstName",
        value: "",
    });
    const [selectedUser, setSelectedUser] = useState(null);

    const debouncedSearch = useDebounce(search, 500);

    const { users, total, error } = useUsers({
        page,
        limit,
        sortField,
        sortOrder,
        search: debouncedSearch,
        filter: appliedFilter,
    });

    const handleSort = (field) => {
        if (sortField !== field) {
            setSortField(field);
            setSortOrder("asc");
        } else {
            if (sortOrder === "asc") {
                setSortOrder("desc");
            } else if (sortOrder === "desc") {
                setSortField(null);
                setSortOrder(null);
            } else {
                setSortOrder("asc");
            }
        }
        setPage(1);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setAppliedFilter({ ...filter, value: "" });
        setPage(1);
    };

    const handleApplyFilter = () => {
        setSearch("");
        setAppliedFilter(filter);
        setPage(1);
    };

    const handleReset = () => {
        setPage(1);
        setSortField(null);
        setSortOrder(null);
        setSearch("");
        setFilter({ key: "firstName", value: "" });
        setAppliedFilter({ key: "firstName", value: "" });
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="container">
            <h2>Users Table</h2>

            <SearchInput value={search} onChange={handleSearchChange} />

            <UserFilter
                filter={filter}
                setFilter={setFilter}
                onApply={handleApplyFilter}
                onReset={handleReset}
            />

            {error && <div className="error">{error}</div>}

            <UserTable
                users={users}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
                onRowClick={setSelectedUser}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />

            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}

export default App;
