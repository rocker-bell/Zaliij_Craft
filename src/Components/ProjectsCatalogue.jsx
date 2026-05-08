// import "../Styles/ProjectsCatalogue.css"

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// const ProjectsCatalogue = () => {
//     return (
//         <>
//             <div className="ProjectsCatalogue_wrapper">
//                     <h1>ProjectsCataloguePage</h1>
//             </div>
//         </>
//     )
// }

// export default ProjectsCatalogue;


import "../Styles/ProjectsCatalogue.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Images
import img1 from "../images_chantillons/chantillons_1.jpg";
import img2 from "../images_chantillons/chantillons_2.jpg";
import img3 from "../images_chantillons/chantillons_3.jpg";
import img4 from "../images_chantillons/chantillons_4.jpg";


const ProjectsCatalogue = () => {
  const projects = [
    { id: 1, image: img1, title: "Project 1" },
    { id: 2, image: img2, title: "Project 2" },
    { id: 3, image: img3, title: "Project 3" },
    { id: 4, image: img4, title: "Project 3" },
  ];

  return (
    <div className="ProjectsCatalogue_wrapper">
      <h1 className="catalogue_des_projets_titre">Catalogue des projets</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1} // show one image only
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="slide-card">
              <img
                src={project.image}
                alt={project.title}
                className="slide-image"
              />
              <h3>{project.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsCatalogue;