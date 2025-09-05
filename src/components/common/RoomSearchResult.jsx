import React, { useState } from "react"
import RoomCard from "../room/RoomCard"
import { Button, Row, Col, Pagination, Typography } from "antd"
import RoomPaginator from "./RoomPaginator.jsx";

const { Title } = Typography

const RoomSearchResults = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 5;
  const totalResults = results.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const paginatedResults = results.slice(startIndex, endIndex)

  return (
    <>
      {results.length > 0 ? (
        <>
          <Title level={5} style={{ textAlign: "center", marginTop: 20 }}>
            Search Results
          </Title>
          <Row gutter={[16, 16]}>
            {paginatedResults.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row justify="center" style={{ marginTop: 20 }}>
            {totalResults > resultsPerPage && (
              <RoomPaginator
                current={currentPage}
                total={totalResults}
                onChange={handlePageChange}
                pageSize={resultsPerPage}
              />
            )}
          </Row>
          <Row justify="center">
            <Button onClick={onClearSearch}>Clear Search</Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  )
}

export default RoomSearchResults
