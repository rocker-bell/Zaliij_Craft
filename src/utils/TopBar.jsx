import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";
const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="top-info">
          <span className="Landing-topbar"> <MapPin size={20} /> Livraison dans tout le Maroc</span>
          <span className="separator">|</span>
          <span className="Landing-topbar"> <Phone size={20}/> +212 661-365230</span>
        </div>
        {/* <div className="top-socials">
          <a href="#instagram">Instagram</a>
          <a href="#facebook">Facebook</a>
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;