import React from "react";
import {Pagination} from "antd";

const RoomPaginator = ({currentPage, total, onPageChange, pageSize}) => {
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={pageSize}
      onChange={onPageChange}
      itemRender={itemRender}
      style={{ textAlign: "center", marginTop: 20 }}
    />
  );
};

export default RoomPaginator;
