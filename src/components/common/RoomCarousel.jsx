import React, {useEffect, useState} from "react";
import {getAvailableRooms} from "../utils/ApiFunctions";
import {Link} from "react-router-dom";
import {Card, Carousel, Col, Image, Row, Spin, Typography} from "antd";
import {motion} from "framer-motion";
import BookNowButton from "../room/BookNowButton.jsx";

const {Title} = Typography;

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAvailableRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);


  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
  }

  return (
    isLoading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
          marginTop: "1rem",
        }}
      >
        <Spin size={"large"}>
          <div style={{marginTop: 60}}>Loading Rooms</div>
        </Spin>
      </div>
    ) : (
      <>
        <section
          className={"container room-carousel__container"}>
          <Carousel autoplay autoplaySpeed={2000}>
            {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
              <div key={index}>
                <Row gutter={[16, 16]} justify="center">
                  {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={room.id}>
                      <motion.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        viewport={{once: true}}
                      >
                        <Card
                          hoverable
                          cover={
                            <Link to={`/book-room/${room.id}`}>
                              <Image
                                preview={false}
                                alt="Room"
                                src={`data:image/png;base64,${room.photo}`}
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                  borderRadius: "8px 8px 0 0",
                                }}
                              />
                            </Link>
                          }
                        >
                          <Card.Meta
                            title={<span className="hotel-color">{room.roomType}</span>}
                            description={
                              <>
                                <Title level={5} style={{margin: "8px 0", color: "#52c41a"}}>
                                  ${room.roomPrice} / night
                                </Title>
                                <BookNowButton roomId={room.id}/>
                              </>
                            }
                          />
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        </section>
      </>
    )
  );
};

export default RoomCarousel;
