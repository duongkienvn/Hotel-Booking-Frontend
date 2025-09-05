import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BookNowButton = ({ roomId }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleBooking = () => {
    if (!isLoggedIn) {
      navigate("/register");
      return;
    }
    navigate(`/book-room/${roomId}`);
  };

  return (
    <Button
      type="primary"
      size="middle"
      style={{ marginTop: 10 }}
      block
      onClick={handleBooking}
    >
      Book Now
    </Button>
  );
};

export default BookNowButton;
