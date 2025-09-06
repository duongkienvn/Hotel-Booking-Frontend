import Home from "../components/home/Home.jsx";
import AddRoom from "../components/room/AddRoom.jsx";
import ExistingRoom from "../components/room/ExistingRoom.jsx";
import EditRoom from "../components/room/EditRoom.jsx";
import DefaultLayout from "../components/layout/DefaultLayout.jsx";
import Room from "../components/room/Room.jsx";
import Checkout from "../components/booking/Checkout.jsx";
import BookingSuccess from "../components/booking/BookingSuccess.jsx";
import Bookings from "../components/booking/Bookings.jsx";
import FindBooking from "../components/booking/FindBooking.jsx";
import Login from "../components/auth/Login.jsx";
import Registration from "../components/auth/Registration.jsx";
import Profile from "../components/auth/Profile.jsx";
import Admin from "../components/admin/Admin.jsx";
import About from "../components/home/about/About.jsx";
import Services from "../components/home/service/Services.jsx";
import Contact from "../components/home/contact/Contact.jsx";
import VerifyAccount from "../components/auth/VerifyAccount.jsx";
import VerifySuccess from "../components/auth/VerifySuccess.jsx";
import VerifyAccountHandler from "../components/auth/VerifyAccountHandler.jsx";
import VerifyFailed from "../components/auth/VerifyFailed.jsx";
import UpdateProfile from "../components/auth/UpdateProfile.jsx";
import ExistingTestimonials from "../components/review/ExistingTestimonials.jsx";
import NotFoundPage from "../components/notfound/NotFoundPage.jsx";
import PrivateRoutes from "../components/private-routes/PrivateRoutes.jsx";
import AdminRoutes from "../components/admin/AdminRoutes.jsx";

export const routes = [
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/services",
        element: <Services/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/verify-account",
        element: <VerifyAccount/>
      },
      {
        path: "/verify-success",
        element: <VerifySuccess/>
      },

      {
        path: "/verify-failed",
        element: <VerifyFailed/>
      },
      {
        path: "/users/verify/account",
        element: <VerifyAccountHandler/>
      },
      {
        path: "browse-all-rooms",
        element: <Room/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Registration/>
      },
      {
        element: <PrivateRoutes/>,
        children: [
          {
            path: "book-room/:roomId",
            element: <Checkout/>
          },
          {
            path: "booking-success",
            element: <BookingSuccess/>
          },
          {
            path: "/find-booking",
            element: <FindBooking/>
          },
          {
            path: "/profile",
            element: <Profile/>
          },
          {
            path: "/update-profile",
            element: <UpdateProfile/>
          },
        ]
      },
      {
        element: <AdminRoutes/>,
        children: [
          {
            path: "/add-room",
            element: <AddRoom/>
          },
          {
            path: "/existing-rooms",
            element: <ExistingRoom/>
          },
          {
            path: "/edit-room/:id",
            element: <EditRoom/>
          },
          {
            path: "/existing-reviews",
            element: <ExistingTestimonials/>
          },
          {
            path: "/admin",
            element: <Admin/>
          },
          {
            path: "/existing-bookings",
            element: <Bookings/>
          }
        ]
      },
      {
        path: "*",
        element: <NotFoundPage/>
      }
    ]
  },
]