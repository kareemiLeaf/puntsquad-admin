import { CameraFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, message, Row, Upload } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";
import * as Yup from "yup";

const TipSchema = Yup.object().shape({
  link: Yup.string()
    .matches(
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
      "Enter valid url!"
    )
    .required("Please enter url"),
});

function AdvertisingComponent({ styles, getAds }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hour, setHour] = useState("4 Hours");

  const handleValue = async (values, actions) => {
    setLoading(true);
    const data = new FormData();
    data.append("image", img);
    data.append("duration", hour);
    data.append("link", values.link);
    const config = {
      method: "post",
      url: `${BASE_URL}/create-advertisement`,
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log("RESPONSE", response.data);
        actions?.resetForm();
        setLoading(false);
        setImg(null);
        message.success("Advertisement added successfully");
        getAds();
        handleRemoveUser();
      })
      .catch(function (error) {
        message.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      link: "",
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
  const handleRemoveUser = () => {
    formik.resetForm();
  };
  const handleClick = ({ key }) => {
    console.log("KEY", key);
    setHour(key);
    //you can perform setState here
  };

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="4 Hours">4 Hours</Menu.Item>
      <Menu.Item key="8 Hours">8 Hours</Menu.Item>
      <Menu.Item key="8 Hours">12 Hours</Menu.Item>
      <Menu.Item key="16 Hours">16 Hours</Menu.Item>
      <Menu.Item key="16 Hours">20 Hours</Menu.Item>
      <Menu.Item key="24 Hours">24 Hours</Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.heading}>Post an Advertisement</p>
        <Row justify="space-between">
          <Col span={14}>
            <Row justify="space-between" gutter={10}>
              <Col span={24}>
                <p className={styles.label}>Advertising Duration</p>

                <Dropdown
                  className={styles.input}
                  overlayClassName={styles.input}
                  overlay={menu}
                >
                  <Button style={{ color: "white", textAlign: "left" }}>
                    {hour}
                  </Button>
                </Dropdown>
              </Col>

              <Col span={24} className="my-3">
                <p className={styles.label}>Hyperlink for advertising</p>
                <textarea
                  placeholder="Enter url"
                  className={styles.input}
                  rows={10}
                  onChange={formik.handleChange("link")}
                  onBlur={formik.handleBlur("link")}
                  value={formik.values.link}
                />
                {formik.touched.link && formik.errors.link ? (
                  <pre className="text-danger">{formik.errors?.link}</pre>
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
            <p className={styles.label}>Advertising Image</p>
            <div className={styles.imgWrap}>
              {img && <img src={URL.createObjectURL(img)} />}
            </div>
            <div className="d-flex justify-content-center mt-4 flex-column align-items-center w-100">
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
                  {img ? "Update Photo" : "Change Photos"}
                </Button>
              </Upload>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AdvertisingComponent;
