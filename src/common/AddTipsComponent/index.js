import { CameraFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Upload } from "antd";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";
import * as Yup from "yup";

const TipSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Please enter title"),
  content: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Please enter description"),
});

function AddTipsComponent({ styles, getTips }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValue = async (values, actions) => {
    const data = new FormData();
    data.append("image", img);
    data.append("title", values.title);
    data.append("content", values.content);
    data.append("status", "1");

    const config = {
      method: "post",
      url: `${BASE_URL}/create-tips`,
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
        message.success("Tip added successfully");
        getTips();
      })
      .catch(function (error) {
        message.error(error?.response?.error);
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Post a Tip</p>
      <Row justify="space-between">
        <Formik
          initialValues={{
            title: "",
            content: "",
            duration: "",
          }}
          validationSchema={TipSchema}
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
            values,
          }) => (
            <Col span={14}>
              <Row justify="space-between" gutter={10}>
                <Col span={12}>
                  <p className={styles.label}>Tip Title</p>
                  <input
                    placeholder="AFL Grand Plaza"
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
                  <p className={styles.label}>Tip duration</p>
                  <input
                    placeholder="4 Hours"
                    className={styles.input}
                    onChange={handleChange("duration")}
                    onBlur={handleBlur("duration")}
                    value={values.duration}
                  />
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
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Post to Puntsquad"}
                </Button>
              </Row>
            </Col>
          )}
        </Formik>
        <Col span={8}>
          <p className={styles.label}>Tip title image</p>
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

export default AddTipsComponent;
