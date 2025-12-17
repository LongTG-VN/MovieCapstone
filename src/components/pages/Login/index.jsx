import React, { useEffect } from "react"; // ✅ Đã thêm useEffect
import { Button, Checkbox, Form, Grid, Input, theme, Typography, Alert, notification } from "antd"; // ✅ Đã thêm notification
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginAPI } from "./slice";
import { useNavigate, NavLink } from "react-router-dom"; // ✅ Đổi Navigate thành useNavigate

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function LoginComponent() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Khởi tạo hook điều hướng

  const { data, error, loading } = useSelector((state) => state.UserLoginStore || {});

  // ✅ Xử lý chuyển hướng và thông báo khi đăng nhập thành công
  useEffect(() => {
    if (data) {
      // 1. Lưu thông tin đăng nhập
      localStorage.setItem("USER_LOGIN", JSON.stringify(data));

      // 2. Hiển thị thông báo thành công
      notification.success({
        message: "Thành công",
        description: "Chào mừng bạn quay trở lại!",
        placement: "topRight",
      });

      // 3. Chuyển hướng về trang chủ
      if (data.maLoaiNguoiDung === "QuanTri") {
     navigate("/news");
      } else {
         navigate("/home");
      }
     
    }
  }, [data, navigate]); // ✅ Dependency array đúng chuẩn

  const onFinish = (values) => {
    dispatch(UserLoginAPI(values));
  };

  const renderError = () => {
    if (error) {
      const errorMessage = typeof error === 'string' ? error : (error.content || "Đăng nhập thất bại!");
      return (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: token.marginMD }}
          closable
        />
      );
    }
    return null;
  };

  const styles = {
    section: {
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      display: "flex",
      minHeight: "100vh",
      justifyContent: "center",
      padding: "16px",
    },
    container: {
      backgroundColor: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: screens.md ? "40px" : "24px",
      width: "100%",
      maxWidth: "400px",
    },
    header: {
      textAlign: "center",
      marginBottom: token.marginXL,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title level={2} style={{ color: token.colorPrimary, marginBottom: 0 }}>
            CYBER MOVIE
          </Title>
          <Text type="secondary">Đăng nhập để trải nghiệm ngay!</Text>
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          {renderError()}

          <Form.Item
            name="taiKhoan"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: token.colorTextDisabled }} />} 
              placeholder="Tài khoản" 
            />
          </Form.Item>

          <Form.Item
            name="matKhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: token.colorTextDisabled }} />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>
            <Link style={{ float: "right" }} href="#">
              Quên mật khẩu?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={styles.footer}>
            <Text>Bạn chưa có tài khoản? </Text>
            <NavLink 
                to="/register" 
                style={{ color: token.colorPrimary, fontWeight: '500' }}
            >
                Đăng ký ngay
            </NavLink>
          </div>
        </Form>
      </div>
    </section>
  );
}