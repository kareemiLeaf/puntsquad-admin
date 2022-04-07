import { CameraFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Upload } from "antd";
import back from "assets/back-filled.png";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";
import * as Yup from "yup";

import styles from "./AddNewPuntUser.module.scss";

const PuntsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Please enter user name"),
  speciality: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Please enter Speciality"),
});

function AddNewPuntUser() {
  const history = useHistory();
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      speciality: "",
    },
    validationSchema: PuntsSchema,
    onSubmit: async (values, actions) => {
      if (!img) {
        message.error("Please upload image");
        return;
      } else {
        setLoading(true);
        const data = new FormData();
        data.append("name", values.name);
        data.append("speciality", values.speciality);
        data.append("image", img);

        var config = {
          method: "post",
          url: `${BASE_URL}/create-puntclub-user`,
          headers: {
            Accept: "application/json",
            Authorization: await getToken(),
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            message.success(response?.data?.message);
            actions.resetForm();
            setImg(null);
            setLoading(false);
            history.push("/users");
          })
          .catch(function (error) {
            message.error(
              error?.response?.data?.message || "Something went wrong"
            );
            setLoading(false);
          });
      }
    },
  });

  return (
    <div className={styles.AddNewPuntUserWrapper}>
      <h4>New PuntsClub User</h4>
      <div
        className="d-flex align-items-center pointer"
        onClick={() => history.goBack()}
      >
        <img src={back} alt="back" className={styles.backArrow} />
        <p className={styles.back}>Back</p>
      </div>

      <div className={styles.wrapper}>
        <h5>Add info</h5>

        <Col span={8}>
          <p className={styles.label}>PuntsClub Name</p>
          <input
            placeholder="Enter PuntsClub name"
            className={styles.input}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <pre className="text-danger">{formik.errors?.name}</pre>
          ) : null}
        </Col>
        <Col span={8} className="pb-4">
          <p className={styles.label}>Speciality</p>
          <input
            placeholder="Enter Speciality"
            className={styles.input}
            onChange={formik.handleChange("speciality")}
            onBlur={formik.handleBlur("speciality")}
            value={formik.values.speciality}
          />
          {formik.touched.speciality && formik.errors.speciality ? (
            <pre className="text-danger">{formik.errors?.speciality}</pre>
          ) : null}
        </Col>
        <p className={styles.label}>Users Profile Image</p>
        <Row align="middle" gutter={30}>
          <Col>
            <div className={styles.imgWrapper}>
              {img && <img src={URL.createObjectURL(img)} />}
            </div>
          </Col>
          <Col>
            <Upload
              showUploadList={false}
              accept=".jpg,.jpeg,.png"
              data-max-size="2048"
              beforeUpload={(file) => {
                if (file?.size > 2097152) {
                  message.error("Please choose a image size less than 2MB");
                }
              }}
              onChange={(e) => {
                if (e?.file?.size < 2097152) {
                  setImg(e?.file?.originFileObj);
                }
              }}
            >
              <Button
                shape="round"
                icon={<CameraFilled />}
                className={styles.btn1}
              >
                {img ? "Change Photo" : "Add Photo"}
              </Button>
            </Upload>
          </Col>
        </Row>
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
      </div>
    </div>
  );
}

export default AddNewPuntUser;
