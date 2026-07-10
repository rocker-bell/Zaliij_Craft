import AdminDashboardV1 from "./AdminLayout/AdminDashboard_V1";
import AdminDashboardV2 from "./AdminLayout/AdminDashboard_V2";
import "../Styles/AdminDashboard_layout.css"

import { useState } from "react";

const AdminDashboardLayout = () => {
    const [version, setVersion] = useState("v1");

const toggleVersion = (v) => setVersion(v);
    return (
        <>
            <div className="AdminDashboardLayout_wrapper">
            <span className="AdminDashaboard-version-select">
  <div
    className={version === "v1" ? "active" : ""}
    onClick={() => toggleVersion("v1")}
  >
    V1
  </div>

  <div
    className={version === "v2" ? "active" : ""}
    onClick={() => toggleVersion("v2")}
  >
    V2
  </div>
</span>
            
           {version === "v1" ? (
        <AdminDashboardV1 />
      ) : (
        <AdminDashboardV2 />
      )}
      </div>
        </>
    )
}

export default AdminDashboardLayout;