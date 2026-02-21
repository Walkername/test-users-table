import { useEffect, useState } from "react";

const BASE_URL = `${import.meta.env.VITE_DUMMYJSON_URL}/users`;

export function useUsers({
    page,
    limit,
    sortField,
    sortOrder,
    search,
    filter,
}) {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const skip = (page - 1) * limit;

                let url = BASE_URL;
                const params = new URLSearchParams({
                    limit,
                    skip,
                });

                if (search) {
                    url = `${BASE_URL}/search`;
                    params.append("q", search);
                } else if (filter.value) {
                    url = `${BASE_URL}/filter`;
                    params.append("key", filter.key);
                    params.append("value", filter.value);
                }

                if (sortField && sortOrder) {
                    params.append("sortBy", sortField);
                    params.append("order", sortOrder);
                }

                const requestUrl = `${url}?${params.toString()}`;

                const res = await fetch(requestUrl);

                if (!res.ok) {
                    throw new Error("Data download error");
                }

                const data = await res.json();
                setUsers(data.users);
                setTotal(data.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, limit, sortField, sortOrder, search, filter.key, filter.value]);

    return { users, total, loading, error };
}
