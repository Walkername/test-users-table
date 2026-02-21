export default function UserModal({ user, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <img src={user.image} alt="avatar" />
                <h3>
                    {user.lastName} {user.firstName} {user.maidenName}
                </h3>
                <p>Age: {user.age}</p>
                <p>Address: {user.address.address}</p>
                <p>City: {user.address.city}</p>
                <p>Country: {user.address.country}</p>
                <p>Postal Code: {user.address.postalCode}</p>
                <p>Height: {user.height}</p>
                <p>Weight: {user.weight}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
