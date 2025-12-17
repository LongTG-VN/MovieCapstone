import React from "react";
import { Button, Form, Grid, Input, theme, Typography, Alert } from "antd";
import { 
  LockOutlined, 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  IdcardOutlined 
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import { UserRegisterAPI } from "./slice"; // Giả sử bạn có action này
import { NavLink } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function RegisterComponent() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  
  // Lấy trạng thái từ Store đăng ký
  const { error, loading } = useSelector((state) => state.UserRegisterStore || {});

  const onFinish = (values) => {
    // ✅ Xử lý dữ liệu: Tự động gán maNhom trước khi gửi API
    const registerPayload = {
      ...values,
      maNhom: "GP01" // Bạn có thể thay đổi mã nhóm tùy dự án
    };

    console.log("Dữ liệu gửi lên Server:", registerPayload);
    // dispatch(UserRegisterAPI(registerPayload));
  };

  const styles = {
    section: {
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      display: "flex",
      minHeight: "100vh",
      justifyContent: "center",
      padding: "24px",
    },
    container: {
      backgroundColor: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: screens.md ? "40px" : "24px",
      width: "100%",
      maxWidth: "450px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={{ textAlign: "center", marginBottom: token.marginXL }}>
          <Title level={2} style={{ color: token.colorPrimary, marginBottom: 8 }}>
            ĐĂNG KÝ TÀI KHOẢN
          </Title>
          <Text type="secondary">Tham gia cùng Cyber Movie ngay hôm nay!</Text>
        </div>

        <Form
          name="register_form"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          scrollToFirstError // Tự động cuộn đến lỗi đầu tiên nếu validation thất bại
        >
          {/* Hiển thị lỗi từ server nếu có */}
          {error && (
            <Alert
              message={typeof error === 'string' ? error : (error.content || "Đăng ký thất bại!")}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
              closable
            />
          )}

          {/* 1. Tài khoản */}
          <Form.Item
            name="taiKhoan"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
          </Form.Item>

          {/* 2. Mật khẩu */}
          <Form.Item
            name="matKhau"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải từ 6 ký tự trở lên!" }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          {/* 3. Họ tên */}
          <Form.Item
            name="hoTen"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="Họ và tên" />
          </Form.Item>

          {/* 4. Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không đúng định dạng!" }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          {/* 5. Số điện thoại */}
          <Form.Item
            name="soDt"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại chỉ được chứa ký số!" }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Đăng Ký
            </Button>
          </Form.Item>

          <div style={styles.footer}>
            <Text>Đã có tài khoản? </Text>
            <NavLink to="/login" style={{ fontWeight: '500' }}>Đăng nhập</NavLink>
          </div>
        </Form>
      </div>
    </section>
  );
}