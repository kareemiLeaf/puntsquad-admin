import { CloseCircleFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, message, Modal, Row } from "antd";
import axios from "axios";
import { Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";
import * as Yup from "yup";

import styles from "./AddEvents.module.scss";

const TrendingSchema = Yup.object().shape({
  trending: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Please enter trending hash"),
  start_date: Yup.string().required("Please select date"),
  end_date: Yup.string().required("Please select date"),
});

function AddEvents({ show, setShow, refetch }) {
  const [loading, setLoading] = useState(false);
  const { RangePicker } = DatePicker;
  const handleAPICall = async (values, actions) => {
    setLoading(true);
    const config = {
      method: "post",
      url: `${BASE_URL}/hashtags`,
      headers: {
        Authorization: await getToken(),
      },
      data: values,
    };

    axios(config)
      .then(function (response) {
        message.success(response.data?.message);
        actions.resetForm();
        setLoading(false);
        refetch();
        setShow(false);
      })
      .catch(function (error) {
        setLoading(false);
        message.error(error?.response.data?.message || "Something went wrong");
      });
  };
  const handleDate = (date, setFieldValue) => {
    const startDate = moment(date?.[0])?.format("DD/MM/YYYY");
    const endDate = moment(date?.[1])?.format("DD/MM/YYYY");
    setFieldValue("start_date", startDate);
    setFieldValue("end_date", endDate);
  };
  return (
    <Modal
      maskStyle={{ backgroundColor: "rgba(255,255,255,.3)" }}
      title={null}
      visible={show}
      headers={null}
      footer={null}
      centered
      destroyOnClose
      closeIcon={<CloseCircleFilled className="text-white" />}
      bodyStyle={{ backgroundColor: "#15132b", color: "#fff" }}
      onCancel={() => setShow(!show)}
    >
      <Formik
        initialValues={{
          trending: "",
          start_date: "",
          end_date: "",
        }}
        validationSchema={TrendingSchema}
        onSubmit={(values, actions) => {
          handleAPICall(values, actions);
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <div className={styles.AddEventsWrapper}>
            <h5>Add Upcoming Events</h5>
            <Row justify="space-between" gutter={10}>
              <Col span={24}>
                <p className={styles.label}>Hashtag event name</p>
                <input
                  placeholder="#"
                  className={styles.input}
                  onChange={handleChange("trending")}
                  onBlur={handleBlur("trending")}
                  value={values.trending}
                />
                {touched.trending && errors.trending ? (
                  <pre className="text-danger">{errors?.trending}</pre>
                ) : null}
              </Col>

              <Col className="mt-3">
                <p className={styles.label}>Event duration</p>
                <RangePicker
                  disabledDate={(current) => {
                    let customDate = moment().format("YYYY-MM-DD");
                    return (
                      current && current < moment(customDate, "YYYY-MM-DD")
                    );
                  }}
                  className={styles.dateInput}
                  bordered={false}
                  size="large"
                  onChange={(date) => handleDate(date, setFieldValue)}
                />
                {touched.start_date && errors.start_date ? (
                  <pre className="text-danger">{errors?.start_date}</pre>
                ) : null}
              </Col>
            </Row>
            <Button
              shape="round"
              icon={<SaveOutlined />}
              className={styles.btn}
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              Post to Puntsquad
            </Button>
          </div>
        )}
      </Formik>
    </Modal>
  );
}

export default AddEvents;
