import { useState, useRef } from "react";

const columns = [
    { label: "First Name", field: "firstName", sort: true },
    { label: "Last Name", field: "lastName", sort: true },
    { label: "Maiden Name", field: "maidenName", sort: true },
    { label: "Age", field: "age", sort: true },
    { label: "Gender", field: "gender", sort: true },
    { label: "Phone", field: "phone", sort: true },
    { label: "Email", field: "email", sort: false },
    { label: "Country", field: "address.country", sort: false },
    { label: "City", field: "address.city", sort: false },
];

export default function UserTable({
    users,
    sortField,
    sortOrder,
    onSort,
    onRowClick,
}) {
    const tableRef = useRef(null);
    const isResizing = useRef(false);
    const preventClick = useRef(false);

    const MIN_WIDTH_PX = 50;

    const [widths, setWidths] = useState(
        Array(columns.length).fill(100 / columns.length),
    );

    const startResize = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        preventClick.current = true;

        const tableWidth = tableRef.current.offsetWidth;
        const startX = e.clientX;

        const startWidths = widths.map((w) => (w / 100) * tableWidth);

        const onMouseMove = (e) => {
            const deltaPx = e.clientX - startX;

            setWidths((prev) => {
                const updated = [...prev];

                let newCurrentPx = startWidths[index] + deltaPx;
                let newNextPx = startWidths[index + 1] - deltaPx;

                if (newCurrentPx < MIN_WIDTH_PX) {
                    newCurrentPx = MIN_WIDTH_PX;
                    newNextPx =
                        startWidths[index] +
                        startWidths[index + 1] -
                        MIN_WIDTH_PX;
                } else if (newNextPx < MIN_WIDTH_PX) {
                    newNextPx = MIN_WIDTH_PX;
                    newCurrentPx =
                        startWidths[index] +
                        startWidths[index + 1] -
                        MIN_WIDTH_PX;
                }

                updated[index] = (newCurrentPx / tableWidth) * 100;
                updated[index + 1] = (newNextPx / tableWidth) * 100;

                return updated;
            });
        };

        const onMouseUp = () => {
            setTimeout(() => {
                isResizing.current = false;
            }, 0);

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const getNestedValue = (obj, path) =>
        path.split(".").reduce((o, key) => o?.[key], obj);

    return (
        <table ref={tableRef}>
            <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th
                            key={col.field}
                            style={{ width: `${widths[i]}%` }}
                            onClick={(e) => {
                                if (
                                    col.sort &&
                                    !e.target.closest(".resizer") &&
                                    !isResizing.current
                                ) {
                                    onSort(col.field);
                                }
                            }}
                        >
                            <div className="th-content">
                                {col.label}
                                {sortField === col.field &&
                                    (sortOrder === "asc"
                                        ? " ↑"
                                        : sortOrder === "desc"
                                          ? " ↓"
                                          : "")}
                            </div>

                            {i < columns.length - 1 && (
                                <div
                                    className="resizer"
                                    onMouseDown={(e) => startResize(i, e)}
                                />
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} onClick={() => onRowClick(user)}>
                        {columns.map((col) => (
                            <td key={col.field}>
                                {getNestedValue(user, col.field)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
