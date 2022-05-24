import "./AdvertisingComponent.module.scss";

import { CameraFilled, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  message,
  Row,
  TimePicker,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";
import * as Yup from "yup";

const TipSchema = Yup.object().shape({
  link: Yup.string()
    .matches(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?/,
      "Enter valid url!"
    )
    .required("Please enter url"),
});

// function readFile(file) {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => resolve(reader.result), false);
//     reader.readAsDataURL(file);
//   });
// }

function AdvertisingComponent({ styles, getAds }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hour, setHour] = useState(moment().format("HH:MM:ss"));
  const [date, setDate] = useState(new Date());

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
    setImg(file?.originFileObj);
  };

  const handleValue = async (values, actions) => {
    setLoading(true);
    const data = new FormData();
    data.append("image", img);
    data.append(
      "duration",
      `${moment(date).format("YYYY-MM-DD")} ${moment(hour).format("HH:MM:ss")}`
    );
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

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.heading}>Post an Advertisement</p>
        <Row justify="space-between">
          <Col span={14}>
            <Row justify="space-between" gutter={10}>
              <Col span={24}>
                <p className={styles.label}>Advertising duration</p>

                <Row justify="space-between" gutter={10}>
                  <Col className="mt-3" span={10}>
                    <p className={styles.label}>Advertising Date</p>
                    <DatePicker
                      // defaultValue={moment()}
                      // format={"YYYY/MM/DD"}
                      disabledDate={(current) => {
                        let customDate = moment().format("YYYY-MM-DD");
                        return (
                          current && current < moment(customDate, "YYYY-MM-DD")
                        );
                      }}
                      // value={moment(date).format("YYYY-MM-DD")}
                      onChange={(e) => setDate(e)}
                      className={styles.input1}
                    />

                    {!date && <pre className="text-danger">{"Enter Date"}</pre>}
                  </Col>
                  <Col className="mt-3" span={10}>
                    <p className={styles.label}>Advertising Time</p>
                    <div className={styles.input2}>
                      <TimePicker
                        use12Hours
                        format="h:mm a"
                        className="p-0"
                        bordered={false}
                        onChange={(e) => setHour(moment(e))}
                      />
                    </div>
                    {!hour && <pre className="text-danger">{"Enter Time"}</pre>}
                  </Col>
                </Row>
              </Col>

              <Col span={24} className="my-3">
                <p className={styles.label}>Hyperlink for advertising</p>
                <textarea
                  placeholder="Enter url"
                  className={styles.input1}
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
              <ImgCrop grid>
                <Upload
                  showUploadList={false}
                  accept=".jpg,.jpeg,.png"
                  data-max-size="2048"
                  multiple={false}
                  maxCount={1}
                  fileList={fileList}
                  onChange={onChange}
                >
                  <Button
                    shape="round"
                    icon={<CameraFilled />}
                    className={styles.btn1}
                  >
                    {img ? "Update Photo" : "Change Photos"}
                  </Button>
                </Upload>
              </ImgCrop>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AdvertisingComponent;
