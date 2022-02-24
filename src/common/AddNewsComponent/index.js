import { CameraFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, message, Row, Upload } from "antd";
import axios from "axios";
import { Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";
import * as Yup from "yup";

const EventSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Please enter name"),
  title: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Please enter title"),
  content: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Please enter description"),
  expiry_date: Yup.string().required("Please select end date"),
});
function AddNewsComponent({ styles, getNews }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValue = async (values, actions) => {
    setLoading(true);
    const data = new FormData();
    data.append("image", img);
    data.append("name", values.name);
    data.append("title", values.title);
    data.append("content", values.content);
    data.append("status", "1");
    data.append("expiry_date", values.expiry_date);

    const config = {
      method: "post",
      url: `${BASE_URL}/create-news`,
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        actions?.resetForm();
        setLoading(false);
        setImg(null);
        getNews();
        message.success("News added successfully");
      })
      .catch(function (error) {
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Post a News</p>
      <Row justify="space-between">
        <Formik
          initialValues={{
            title: "",
            content: "",
            duration: "",
            name: "",
            expiry_date: "",
          }}
          validationSchema={EventSchema}
          onSubmit={(values, actions) => {
            if (!img) {
              message.error("Please upload image");
              return;
            } else {
              handleValue(values, actions);
            }
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
            <Col span={14}>
              <Row justify="space-between" gutter={10}>
                <Col span={12}>
                  <p className={styles.label}>News Title</p>
                  <input
                    placeholder="Enter news title"
                    className={styles.input}
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  {touched.title && errors.title ? (
                    <pre className="text-danger">{errors?.title}</pre>
                  ) : null}
                </Col>
                <Col span={12}>
                  <p className={styles.label}>Name</p>
                  <input
                    placeholder="Enter Publisher Name"
                    className={styles.input}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {touched.name && errors.name ? (
                    <pre className="text-danger">{errors?.name}</pre>
                  ) : null}
                </Col>
                <Col span={12} className="mt-3">
                  <p className={styles.label}>Expiry Date</p>
                  <DatePicker
                    disabledDate={(current) => {
                      let customDate = moment().format("YYYY-MM-DD");
                      return (
                        current && current < moment(customDate, "YYYY-MM-DD")
                      );
                    }}
                    value={
                      values?.expiry_date
                        ? moment(values?.expiry_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(e) =>
                      setFieldValue(
                        "expiry_date",
                        moment(e).format("DD/MM/YYYY")
                      )
                    }
                    className={styles.inputDate}
                  />
                  {touched.expiry_date && errors.expiry_date ? (
                    <pre className="text-danger">{errors?.expiry_date}</pre>
                  ) : null}
                </Col>
                <Col span={24} className="my-3">
                  <p className={styles.label}>Description</p>
                  <textarea
                    placeholder="Enter Description"
                    className={styles.input}
                    rows={10}
                    onChange={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                  />
                  {touched.content && errors.content ? (
                    <pre className="text-danger">{errors?.content}</pre>
                  ) : null}
                </Col>

                <Button
                  shape="round"
                  icon={<SaveOutlined />}
                  className={styles.btn}
                  loading={loading}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Loading..." : "Post to Puntsquad"}
                </Button>
              </Row>
            </Col>
          )}
        </Formik>
        <Col span={8}>
          <p className={styles.label}>News title image</p>
          <div className={styles.imgWrap}>
            {img && <img src={URL.createObjectURL(img)} />}
          </div>
          <div className="d-flex justify-content-center mt-4 flex-column align-items-center w-100">
            <Upload
              showUploadList={false}
              accept="image/*"
              onChange={(e) => setImg(e?.file?.originFileObj)}
            >
              <Button
                shape="round"
                icon={<CameraFilled />}
                className={styles.btn1}
              >
                {img ? "Update Photo" : "Add Photo"}
              </Button>
            </Upload>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddNewsComponent;
