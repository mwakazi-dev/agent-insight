"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { FORM_DATA_COLLECTION_INPUTS } from "@/constants/data";
import useGeoLocation from "@/hooks/useGeoLocation";
import { addFieldData } from "./actions/fieldData";
import { formatDate } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { clearDataCollected, setDataCollected } from "@/slices/dataCollected";
import { RootState } from "@/store/store";

const Home = () => {
  const { location } = useGeoLocation();
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
    } = values;

    let payload = {
      productType,
      category,
      description,
      feedback,
      nextAppointmentDate: formatDate(nextAppointmentDate),
      userId: authState?.uid,
      userEmail: authState?.email,
      created: Date.now(),
      userName: authState?.displayName,
      location,
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
    <Row justify="center">
      <Col xs={24} md={12}>
        <Card>
          <Row
            justify="center"
            align="middle"
            style={{ marginBottom: "24px", margin: "16px auto" }}
          >
            <Col xs={24} md={12}>
              <Row
                justify="start"
                align="middle"
                style={{ marginBottom: "24px", margin: "16px " }}
              >
                <Col xs={24} md={12}>
                  <Typography.Title level={3}>Create Agent</Typography.Title>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col xs={24} md={24}>
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
                        {input.type === "textarea" && (
                          <Input.TextArea rows={4} />
                        )}

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

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loading}
                        disabled={loading}
                        style={{ backgroundColor: "#2F3645" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Home;
