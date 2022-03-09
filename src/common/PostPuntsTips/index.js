import { CameraFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, message, Row, Spin, Upload } from "antd";
import axios from "axios";
import UserCard from "common/UserCard";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { useHistory } from "react-router-dom";
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
  expiry_date: Yup.string().required("Select end date"),
});

function PostPuntsTips({ styles, user, fetching }) {
  const [img, setImg] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleValue = async (values, actions) => {
    setLoading(true);
    const data = new FormData();
    data.append("image", img);
    data.append("title", values.title);
    data.append("content", values.content);
    data.append("status", "1");
    data.append("user_id", user?.userId);
    data.append("expiry_date", values.expiry_date);
    const config = {
      method: "post",
      url: `${BASE_URL}/create-puntclub-feed`,
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
        formik.resetForm();
        history.push(`/users/top-punters`);
      })
      .catch(function (error) {
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      expiry_date: "",
    },
    validationSchema: TipSchema,
    onSubmit: (values, actions) => {
      if (!img) {
        message.error("Please upload image");
        return;
      } else {
        handleValue(values, actions);
      }
    },
  });
  return (
    <>
      {user && (
        <Col span={6}>
          <div className="d-flex align-items-center">
            {fetching ? <Spin /> : <UserCard data={user} />}
          </div>
        </Col>
      )}
      <div className={styles.wrapper}>
        <p className={styles.heading}>Post a Tip</p>
        <Row justify="space-between">
          <Col span={14}>
            <Row justify="space-between" gutter={10}>
              <Col span={12}>
                <p className={styles.label}>Tip Title</p>
                <input
                  placeholder="Enter title"
                  className={styles.input}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <pre className="text-danger">{formik.errors?.title}</pre>
                ) : null}
              </Col>
              <Col span={12}>
                <p className={styles.label}>Tip duration</p>
                <DatePicker
                  disabledDate={(current) => {
                    let customDate = moment().format("YYYY-MM-DD");
                    return (
                      current && current < moment(customDate, "YYYY-MM-DD")
                    );
                  }}
                  value={
                    formik?.values?.expiry_date
                      ? moment(formik?.values?.expiry_date, "DD/MM/YYYY")
                      : ""
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "expiry_date",
                      moment(e).format("DD/MM/YYYY")
                    )
                  }
                  className={styles.inputDate}
                />
                {formik.touched.expiry_date && formik.errors.expiry_date ? (
                  <pre className="text-danger">
                    {formik.errors?.expiry_date}
                  </pre>
                ) : null}
              </Col>
              <Col span={24} className="my-3">
                <p className={styles.label}>Description</p>
                <textarea
                  placeholder="Enter Description"
                  className={styles.input}
                  rows={10}
                  onChange={formik.handleChange("content")}
                  onBlur={formik.handleBlur("content")}
                  value={formik.values.content}
                />
                {formik.touched.content && formik.errors.content ? (
                  <pre className="text-danger">{formik.errors?.content}</pre>
                ) : null}
              </Col>

              <Button
                shape="round"
                icon={<SaveOutlined />}
                className={styles.btn}
                onClick={formik?.handleSubmit}
                loading={loading}
                disabled={loading}
              >
                {loading ? "Loading..." : "Post to Puntsquad"}
              </Button>
            </Row>
          </Col>

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
    </>
  );
}

export default PostPuntsTips;
