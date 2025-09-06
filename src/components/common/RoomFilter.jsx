import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Grid, InputNumber, Select, Space} from "antd";
import {getRoomTypes} from "../utils/ApiFunctions.js";
import dayjs from "dayjs";

const {Option} = Select;
const {RangePicker} = DatePicker
const { useBreakpoint } = Grid;

const RoomFilter = ({criteria, setCriteria}) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  useEffect(() => {
    const fetchAllRoomTypes = async () => {
      const result = await getRoomTypes();
      setRoomTypes(result);
    }
    fetchAllRoomTypes();
  }, []);

  const clearFilter = () => {
    form.resetFields();
    setCriteria({});
  };

  const handleFinish = (values) => {
    const hasValue = Object.values(values).some(v => v !== undefined && v !== null && v !== "");
    if (hasValue) {
      setCriteria(values);
    }
  }

  return (
    <Form
      form={form}
      layout={isMobile ? "vertical" : "inline"}
      onFinish={handleFinish}
      initialValues={criteria}
      style={{
        marginBottom: 16,
        padding: 16,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        gap: 20
      }}
    >
      <Form.Item name="roomType">
        <Select
          style={{width: 200}}
          placeholder="Select room type..."
          allowClear
        >
          {roomTypes.map((type, index) => (
            type && (
              <Option key={index} value={String(type)}>
                {String(type)}
              </Option>
            )
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="priceFrom">
        <InputNumber style={{width: 150}} placeholder="Price From" min={0}/>
      </Form.Item>

      <Form.Item name="priceTo">
        <InputNumber style={{width: 150}} placeholder="Price To" min={0}/>
      </Form.Item>

      <Form.Item name="dateRange">
        <RangePicker
          disabledDate={(current) => current && current < dayjs().startOf("day")}
        />
      </Form.Item>

      <Form.Item style={{marginLeft: isMobile ? 0 : "auto", marginRight: 0}}>
        <Space size={"middle"}>
          <Button type="primary" htmlType="submit">
            Filter
          </Button>
          <Button onClick={clearFilter}>Clear</Button>
        </Space>
      </Form.Item>
    </Form>

  );
};

export default RoomFilter;
