"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";

import { FORM_DATA_COLLECTION_INPUTS } from "@/constants/data";
import useGeoLocation from "@/hooks/useGeoLocation";
import { addFieldData } from "./actions/fieldData";
import { formatDate } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { clearDataCollected, setDataCollected } from "@/slices/dataCollected";
import { RootState } from "@/store/store";

const Home = () => {
  const { location, isLoading } = useGeoLocation();
  const { authState } = useAuth();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dataCollected = useSelector(
    (state: RootState) => state.dataCollected.dataCollected
  );

  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);

    const {
      productType,
      category,
      description,
      feedback,
      nextAppointmentDate,
      locationValue,
    } = values;

    let payload = {
      productType,
      category,
      description,
      feedback,
      locationGeo: location,
      location: locationValue,
      nextAppointmentDate: formatDate(nextAppointmentDate),
      userId: authState?.uid,
      userEmail: authState?.username,
    };

    try {
      const res = await addFieldData(payload);

      if (res.success) {
        notification.success({
          message: "Data added successfully!",
          placement: "top",
        });
      }
      if (!res.success) {
        notification.error({
          message: "Unable to add data!",
          placement: "top",
        });
      }
      setLoading(false);
      dispatch(clearDataCollected());
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error adding data!",
        placement: "top",
      });
      setLoading(false);
    }
  };

  const onFieldChange = (_: any, values: any) => {
    dispatch(
      setDataCollected({
        ...values,
        nextAppointmentDate: undefined,
      })
    );
  };

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <Form
          name="create-user"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={dataCollected}
          onValuesChange={onFieldChange}
        >
          {FORM_DATA_COLLECTION_INPUTS.map((input) => (
            <Form.Item
              key={input.name}
              name={input.name}
              label={input.label}
              rules={input.rules}
            >
              {input.type === "select" && (
                <Select options={input.options} size="large" />
              )}
              {input.type === "textarea" && <Input.TextArea rows={4} />}

              {input.type === "datePicker" && (
                <DatePicker
                  style={{ width: "100%" }}
                  size="large"
                  showTime
                  format="YYYY-MM-DD HH:mm"
                />
              )}
            </Form.Item>
          ))}
          {!isLoading && !location?.latitude && !location?.longitude && (
            <Form.Item
              label="Location"
              name="locationValue"
              rules={[
                { required: true, message: "Please input your location!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default Home;
