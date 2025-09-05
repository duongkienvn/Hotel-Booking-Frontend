import MainHeader from "../layout/MainHeader.jsx";
import Parallax from "../common/Parallax.jsx";
import HotelService from "../common/HotelService.jsx";
import RoomCarousel from "../common/RoomCarousel.jsx";
import TestimonialCarousel from "./TestimonialCarousel.jsx";
import SpecialOffers from "./SpecialOffers.jsx";

function Home() {
  return <>
    <section>
      <MainHeader/>
      <div>
        <RoomCarousel/>
        <Parallax/>
        <TestimonialCarousel/>
        <HotelService/>
        <SpecialOffers />
      </div>
    </section>
  </>
}

export default Home;