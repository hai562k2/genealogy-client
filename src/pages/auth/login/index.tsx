import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Field from "../../../components/common/input";
import { Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { exists, login, register } from "../../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { EmailExists, LoginForm, RegisterForm } from "../../../utils/typeForm";
import { localSetItem } from "../../../utils/storage";
import { Epath } from "../../../utils/Epath";
import logo from "../../../assets/images/logo.png";

import classNames from "classnames";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const entity = useAppSelector((state) => state.authSlice.entity);
  const error = useAppSelector((state) => state.authSlice.error);
  const methods = useForm<LoginForm>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    reValidateMode: "onChange",
  });

  const methodsRegister = useForm<RegisterForm>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    reValidateMode: "onChange",
  });

  const [showOTPForm, setShowOTPForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (error) {
      message.open({ type: "error", content: error.message, duration: 2 });
    }
  }, [error]);

  const onExists = (value: EmailExists) => {
    const params = {
      email: value.email,
    };
    setEmail(value.email);
    dispatch(exists(params))
      .unwrap()
      .then((response) => {
        if (response.message && response.message.email === "EA0001") {
          message.open({
            type: "error",
            content: "Email không đúng định dạng",
          });
        } else if (response.message && response.message.email === "EA0002") {
          message.open({ type: "error", content: "Email không tồn tại" });
        } else if (response.message && response.message.password === "EA0003") {
          message.open({ type: "error", content: "Có lỗi khi gửi OTP" });
        } else if (response.data) {
          setShowOTPForm(true);
        }
      })
      .catch((error) => {
        message.open({ type: "error", content: "Email không tồn tại" });
      });
  };

  const onLogin = (value: LoginForm) => {
    const params = {
      email,
      password: value.password,
    };
    dispatch(login(params))
      .unwrap()
      .then((response) => {
        if (response.message && response.message.email === "EA0001") {
          message.open({
            type: "error",
            content: "Email không đúng định dạng",
          });
        } else if (response.message && response.message.email === "EA0002") {
          message.open({ type: "error", content: "Email không tồn tại" });
        } else if (response.message && response.message.password === "EA0003") {
          message.open({ type: "error", content: "Có lỗi khi gửi OTP" });
        } else if (response.data) {
          setShowOTPForm(true);
        }
      })
      .catch(() => {
        message.open({ type: "error", content: "Mật khẩu không đúng" });
      });
  };

  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const onRegister = () => {
    const params = {
      email: userEmail, // Đảm bảo có trường email
      name: userName,
    };
    dispatch(register(params))
      .unwrap()
      .then((response) => {
        // Xử lí response từ server
        if (response.error) {
          // Hiển thị thông báo lỗi
          message.open({ type: "error", content: response.error.message });
        } else {
          // Đăng ký thành công
          setShowOTPForm(true); // Hiển thị form OTP sau khi đăng ký thành công
          setShowRegisterForm(false); // Ẩn form đăng ký
          // Truyền email từ form đăng ký vào form đăng nhập
          setEmail(userEmail);
        }
      })
      .catch((error) => {
        // Xử lí lỗi nếu có
        message.open({ type: "error", content: "Email đã tồn tại" });
      });
  };

  const onLoginRedirect = () => {
    setShowRegisterForm(false);
    setShowOTPForm(false); // Đảm bảo không hiển thị form OTP khi quay lại form đăng nhập
  };

  useEffect(() => {
    if (entity) {
      localSetItem("token", entity.data?.token);
      localSetItem("refreshToken", entity.data?.refreshToken);
      localSetItem("user", JSON.stringify(entity.data?.user));
      message.open({
        type: "success",
        content: "Đăng nhập thành công!",
        duration: 2,
      });
      setTimeout(() => {
        navigate(Epath.HOME);
      }, 2000);
    }
  }, [entity, navigate]);

  useEffect(() => {
    if (error) {
      message.open({ type: "error", content: error.message, duration: 2 });
    }
  }, [error]);

  const formClass = classNames({
    "w-[400px]": true,
    "box-border": true,
    "rounded-[8px]": true,
    "shadow-2xl": true,
    flex: true,
    "flex-col": true,
    "items-center": true,
    "pt-10": true,
    "pb-6": true,
    "px-8": true,
    "bg-white": true,
  });

  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <div className={formClass}>
        <img className="w-20 h-20 mb-4" alt="" src={logo} />
        <h2 className="text-center mt-4 mb-6 text-2xl font-semibold">
          {showRegisterForm
            ? "Đăng ký tài khoản Genealogy"
            : "Đăng nhập vào Genealogy"}
        </h2>
        <FormProvider {...methods}>
          {showOTPForm ? (
            <form onSubmit={methods.handleSubmit(onLogin)} className="w-full">
              <Field
                name="password"
                type="password"
                label="Vui lòng nhập OTP được gửi đến email của bạn"
                labelClass="required"
                autoComplete="none"
                placeholder="Mật khẩu"
                rules={{
                  required: {
                    value: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                }}
              />
              <Button type="primary" htmlType="submit" className="w-full mt-4">
                Đăng nhập
              </Button>
            </form>
          ) : showRegisterForm ? (
            <form
              onSubmit={methodsRegister.handleSubmit(onRegister)}
              className="w-full"
            >
              <Field
                name="useremail"
                type="text"
                label="Email của bạn"
                labelClass="required"
                placeholder="Email"
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserEmail(e.target.value)
                }
                rules={{
                  required: {
                    value: true,
                    message: "Vui lòng nhập email",
                  },
                }}
              />

              <Field
                name="username"
                type="text"
                label="Tên của bạn"
                labelClass="required"
                placeholder="Tên"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.target.value)
                }
                rules={{
                  required: {
                    value: true,
                    message: "Vui lòng nhập tên của bạn",
                  },
                }}
              />

              <Button type="primary" htmlType="submit" className="w-full mt-4">
                Đăng ký
              </Button>
              <div className="flex justify-center mt-4">
                <p>
                  Bạn đã có tài khoản? Hãy{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={onLoginRedirect}
                  >
                    đăng nhập
                  </span>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={methods.handleSubmit(onExists)} className="w-full">
              <Field
                name="email"
                type="text"
                label="Email của bạn"
                labelClass="required"
                placeholder="Email"
                rules={{
                  required: {
                    value: true,
                    message: "Vui lòng nhập email",
                  },
                }}
              />
              <Button type="primary" htmlType="submit" className="w-full mt-4">
                Kiểm tra
              </Button>
              <div className="flex justify-center mt-4">
                <p>
                  Bạn chưa có tài khoản? Hãy{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setShowRegisterForm(true)}
                  >
                    đăng kí
                  </span>
                </p>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
