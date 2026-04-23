// import "../Styles/ClientOrderCheck.css";
// import { useParams } from "react-router-dom";
// import supabase from "../utils/supabase";
// import { useEffect, useState } from "react";

// const ClientOrderCheck = () => {
//     const { id } = useParams();

//     const [order, setOrder] = useState(null);
//     const [status, setStatus] = useState("");

//     async function fetchOrder(orderId) {
//         const { data, error } = await supabase
//             .from("exports")
//             .select("*")
//             .eq("id", orderId)
//             .single();

//         if (error) {
//             console.error(error);
//             return null;
//         }

//         return data;
//     }

//     useEffect(() => {
//         async function load() {
//             if (!id) return;

//             const data = await fetchOrder(id);

//             if (data) {
//                 setOrder(data);
//                 setStatus(data.status);
//             }
//         }

//         load();
//     }, [id]);

//     const handleStatusChange = async (newStatus) => {
//         setStatus(newStatus);

//         const { error } = await supabase
//             .from("exports")
//             .update({ status: newStatus })
//             .eq("id", id);

//         if (error) {
//             console.error(error);
//         }
//     };

//     if (!order) {
//         return <div className="client-check-loading">Loading order...</div>;
//     }

//     return (
//         <div className="client-check-wrapper">

//             {/* ORDER INFO */}
//             <div className="order-card">
//                 <h2>Order #{order.id}</h2>

//                 <p><strong>Client:</strong> {order.client}</p>
//                 <p><strong>Product:</strong> {order.product}</p>
//                 <p><strong>Country:</strong> {order.country}</p>
//                 <p><strong>Amount:</strong> {order.amount}</p>
//                 <p><strong>Status:</strong> {status}</p>
//                 <p><strong>Created:</strong> {order.created_at}</p>
//             </div>

//             {/* STATUS TRACKER */}
//             <div className="status-wrapper">

//                 <span
//                     className={`export-cercle-status pending ${status === "pending" ? "active" : ""}`}
//                     onClick={() => handleStatusChange("pending")}
//                 ></span>

//                 <span
//                     className={`export-cercle-status en_route ${status === "en_route" ? "active" : ""}`}
//                     onClick={() => handleStatusChange("en_route")}
//                 ></span>

//                 <span
//                     className={`export-cercle-status a_la_diwan ${status === "a_la_diwan" ? "active" : ""}`}
//                     onClick={() => handleStatusChange("a_la_diwan")}
//                 ></span>

//                 <span
//                     className={`export-cercle-status chez_la_poste ${status === "chez_la_poste" ? "active" : ""}`}
//                     onClick={() => handleStatusChange("chez_la_poste")}
//                 ></span>
//             </div>

//             {/* LABELS */}
//             <div className="labels">
//                 <p>Pending</p>
//                 <p>En route</p>
//                 <p>A la diwan</p>
//                 <p>Chez la poste</p>
//             </div>

//             {/* MAP SECTION (placeholder for now) */}
//             <div className="map-section">
//                 <h3>Delivery Map</h3>
//                 <div className="map-placeholder">
//                     Map will be displayed here (Google Maps / Leaflet)
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ClientOrderCheck;


// import "../Styles/ClientOrderCheck.css";
// import supabase from "../utils/supabase";
// import { useState } from "react";

// const ClientOrderCheck = () => {
//     const [orderId, setOrderId] = useState("");
//     const [order, setOrder] = useState(null);
//     const [status, setStatus] = useState("");
//     const [loading, setLoading] = useState(false);

//     async function fetchOrder(id) {
//         const { data, error } = await supabase
//             .from("exports")
//             .select("*")
//             .eq("id", id)
//             .single();

//         if (error) {
//             console.error(error);
//             return null;
//         }

//         return data;
//     }

//     const handleSearch = async () => {
//         if (!orderId) return;

//         setLoading(true);

//         const data = await fetchOrder(orderId);

//         if (data) {
//             setOrder(data);
//             setStatus(data.status);
//         } else {
//             setOrder(null);
//         }

//         setLoading(false);
//     };

//     const handleStatusChange = async (newStatus) => {
//         setStatus(newStatus);

//         const { error } = await supabase
//             .from("exports")
//             .update({ status: newStatus })
//             .eq("id", order.id);

//         if (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="client-check-wrapper">

//             {/* SEARCH BAR */}
//             <div className="search-box">
//                 <input
//                     type="text"
//                     placeholder="Enter Order ID..."
//                     value={orderId}
//                     onChange={(e) => setOrderId(e.target.value)}
//                 />

//                 <button onClick={handleSearch}>
//                     Search
//                 </button>
//             </div>

//             {/* LOADING */}
//             {loading && <p>Loading order...</p>}

//             {/* ORDER NOT FOUND */}
//             {!loading && orderId && !order && (
//                 <p className="not-found">Order not found</p>
//             )}

//             {/* ORDER INFO */}
//             {order && (
//                 <>
//                     <div className="order-card">
//                         <h2>Order #{order.id}</h2>

//                         <p><strong>Client:</strong> {order.client}</p>
//                         <p><strong>Product:</strong> {order.product}</p>
//                         <p><strong>Country:</strong> {order.country}</p>
//                         <p><strong>Amount:</strong> {order.amount}</p>
//                         <p><strong>Status:</strong> {status}</p>
//                         <p><strong>Created:</strong> {order.created_at}</p>
//                     </div>

//                     {/* STATUS TRACKER */}
//                     <div className="status-wrapper">

//                         <span
//                             className={`export-cercle-status pending ${status === "pending" ? "active" : ""}`}
//                             onClick={() => handleStatusChange("pending")}
//                         ></span>

//                         <span
//                             className={`export-cercle-status en_route ${status === "en_route" ? "active" : ""}`}
//                             onClick={() => handleStatusChange("en_route")}
//                         ></span>

//                         <span
//                             className={`export-cercle-status a_la_diwan ${status === "a_la_diwan" ? "active" : ""}`}
//                             onClick={() => handleStatusChange("a_la_diwan")}
//                         ></span>

//                         <span
//                             className={`export-cercle-status chez_la_poste ${status === "chez_la_poste" ? "active" : ""}`}
//                             onClick={() => handleStatusChange("chez_la_poste")}
//                         ></span>
//                     </div>

//                     {/* LABELS */}
//                     <div className="labels">
//                         <p>Pending</p>
//                         <p>En route</p>
//                         <p>A la diwan</p>
//                         <p>Chez la poste</p>
//                     </div>

//                     {/* MAP */}
//                     <div className="map-section">
//                         <h3>Delivery Map</h3>
//                         <div className="map-placeholder">
//                             Map will be displayed here
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ClientOrderCheck;


import "../Styles/ClientOrderCheck.css";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

const ClientOrderCheck = () => {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchOrder(id) {
        const { data, error } = await supabase
            .from("exports")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    const handleSearch = async () => {
        if (!orderId) return;

        setLoading(true);

        const data = await fetchOrder(orderId);

        if (data) {
            setOrder(data);
            setStatus(data.status);
        } else {
            setOrder(null);
            setStatus("");
        }

        setLoading(false);
    };

    useEffect(() => {
    if (!order) return;

    const interval = setInterval(async () => {
        const updated = await fetchOrder(order.id);

        if (updated) {
            setOrder(updated);
            setStatus(updated.status);
        }
    }, 5000); // refresh every 5s

    return () => clearInterval(interval);
}, [order]);

    return (
        <div className="client-check-wrapper">

            {/* SEARCH */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter Order ID..."
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <button onClick={handleSearch}>
                    Track Order
                </button>
            </div>

            {/* LOADING */}
            {loading && <p>Loading order...</p>}

            {/* NOT FOUND */}
            {!loading && orderId && !order && (
                <p className="not-found">Order not found</p>
            )}

            {/* ORDER VIEW */}
            {order && (
                <>
                    {/* ORDER INFO */}
                    <div className="order-card">
                        <h2>Order #{order.id}</h2>

                        <p><strong>Client:</strong> {order.client}</p>
                        <p><strong>Product:</strong> {order.product}</p>
                        <p><strong>Country:</strong> {order.country}</p>
                        <p><strong>Amount:</strong> {order.amount} MAD </p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Created:</strong> {order.created_at}</p>
                    </div>

                    {/* STATUS TRACKER (READ ONLY) */}
                    <div className="status-wrapper">

                        <span className={`export-cercle-status pending ${status === "pending" ? "active" : ""}`}></span>

                        <span className={`export-cercle-status en_route ${status === "en_route" ? "active" : ""}`}></span>

                        <span className={`export-cercle-status a_la_diwan ${status === "a_la_diwan" ? "active" : ""}`}></span>

                        <span className={`export-cercle-status chez_la_poste ${status === "chez_la_poste" ? "active" : ""}`}></span>

                    </div>

                    {/* LABELS */}
                    <div className="labels">
                        <p>Pending</p>
                        <p>En route</p>
                        <p>A la diwan</p>
                        <p>Chez la poste</p>
                    </div>

                    {/* LIVE MAP */}
                    <div className="map-section">
                        <h3>Live Delivery Map</h3>

                        <div className="map-placeholder">
                            {/* Replace later with Google Maps / Leaflet */}
                            📍 Tracking map will appear here
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClientOrderCheck;