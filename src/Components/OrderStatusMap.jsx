// import "../Styles/OrderstatusMap.css";
// import { useParams } from "react-router-dom";
// import supabase from "../utils/supabase";
// import { useEffect, useState } from "react";

// const OrderStatusMap = () => {
//     const {id} = useParams();
//     const [exports, setExport] = useState([])

//     async function FetchExport(id) {
//         const {error} = await supabase
//             .from("exports")
//             .select("*")
//             .eq("id", id)
//     }

//     useEffect(() => {
//            if(id) {
//                 const ExportData = FetchExport(id);
//                 setExport(exports)
//            } 
//     }, [id])

    
//     return (
//         <>
//             <div className="OrderStatusMap-wrapper">
//                         <h1>OrderStatusMap</h1>

//                         <p>OrderId = {id}</p>

//                         <p>{exports.map((Order) => {
//                             <div>
//                             <p>Order.client</p>
//                             <p>Order.product</p>
//                             <p>Order.country</p>
//                             <p>Order.amount</p>
//                             <p>Order.status</p>
//                             <p>Order.created_at</p>
//                             </div>
//                         } )}</p>

//             </div>
//         </>
//     )
// }


// export default OrderStatusMap;


import "../Styles/OrderstatusMap.css";
import { useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import "../Styles/OrderStatusMap.css"

const OrderStatusMap = () => {
    const { id } = useParams();
    const [exports, setExport] = useState([]);


    const [exportStatus, setExportStatus] = useState("")

    async function FetchExport(id) {
        const { data, error } = await supabase
            .from("exports")
            .select("*")
            .eq("id", id);

        if (error) {
            console.error(error);
            return [];
        }

        return data;
    }

    const handleStatusChange = async (newStatus) => {
    setExportStatus(newStatus);

    const { error } = await supabase
        .from("exports")
        .update({ status: newStatus })
        .eq("id", id);

    if (error) {
        console.error(error);
    }
};

//     useEffect(() => {
//     async function loadData() {
//         if (id) {
//             const exportData = await FetchExport(id);
//             setExport(exportData);

//             if (Array.isArray(exportData) && exportData.length > 0) {
//                 const status = exportData[0].status;
//                 setExportStatus(status);
//                 console.log("status:", status);
//             }
//         }
//     }

//     loadData();
// }, [id]);

useEffect(() => {
    let interval;

    async function loadData() {
        if (!id) return;

        const exportData = await FetchExport(id);
        setExport(exportData);

        if (Array.isArray(exportData) && exportData.length > 0) {
            const status = exportData[0].status;
            setExportStatus(status);
        }
    }

    // initial load
    loadData();

    // live refresh every 5 seconds
    interval = setInterval(() => {
        loadData();
    }, 5000);

    // cleanup
    return () => clearInterval(interval);

}, [id]);

    return (
        <div className="OrderStatusMap-wrapper">
            <h1>OrderStatusMap</h1>
            <p>OrderId = {id}</p>

            {/* {exports.map((order) => (
                <div key={order.id}>
                    <p>{order.client}</p>
                    <p>{order.product}</p>
                    <p>{order.country}</p>
                    <p>{order.amount}</p>
                    <p>{order.status}</p>
                    <p>{order.created_at}</p>
                </div>
            ))} */}


            <div className="exports-status">
                {/* <div className="status-wrapper">
                    <span className="export-cercle-status en_cours"></span>
                    <span className="export-cercle-status en_route"></span>
                    <span className="export-cercle-status a_la_diwan"></span>
                    <span className="export-cercle-status chez_la_poste"></span>
                </div>

                <div className="exports-liveStatus-wrapper">
                    <p className="Live_status en_cours">en cours</p>
                    <p className="Live_status en_route">en route</p>
                    <p className="Live_status a_la_diwan">a la diwan</p>
                    <p className="Live_status chez_la_poste">chez la poste</p>
                </div> */}

                <div className="status-wrapper">
    <span 
    className={`export-cercle-status pending ${exportStatus === "pending" ? "active" : ""}`}
                onClick={() => handleStatusChange("pending")}

    ></span>
    <span className={`export-cercle-status en_route ${exportStatus === "en_route" ? "active" : ""}`}
                onClick={() => handleStatusChange("en_route")}

    ></span>
    <span className={`export-cercle-status a_la_diwan ${exportStatus === "a_la_diwan" ? "active" : ""}`}
            onClick={() => handleStatusChange("a_la_diwan")}

    ></span>
    <span className={`export-cercle-status chez_la_poste ${exportStatus === "chez_la_poste" ? "active" : ""}`}
        onClick={() => handleStatusChange("chez_la_poste")}

    ></span>
</div>

<div className="exports-liveStatus-wrapper">
    <p className={`Live_status pending ${exportStatus === "pending" ? "active" : ""}`}>pending</p>
    <p className={`Live_status en_route ${exportStatus === "en_route" ? "active" : ""}`}>en route</p>
    <p className={`Live_status a_la_diwan ${exportStatus === "a_la_diwan" ? "active" : ""}`}>a la diwan</p>
    <p className={`Live_status chez_la_poste ${exportStatus === "chez_la_poste" ? "active" : ""}`}>chez la poste</p>
</div>

            </div>
        </div>
    );
};

export default OrderStatusMap;