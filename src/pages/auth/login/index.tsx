import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Field from "../../../components/common/input";
import { Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { exists, login } from "../../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { EmailExists, LoginForm } from "../../../utils/typeForm";
import { localSetItem } from "../../../utils/storage";
import { Epath } from "../../../utils/Epath";
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

  const [showOTPForm, setShowOTPForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
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
      .catch(() => {
        message.open({ type: "error", content: "Có lỗi xảy ra" });
      });
  };

  const onLogin = (value: LoginForm) => {
    const params = {
      email,
      password: value.password,
    };
    dispatch(login(params));
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
        <img className="w-20 h-20 mb-4" alt="" src={"avs"} />
        <h2 className="text-center mt-4 mb-6 text-2xl font-semibold">
          Đăng nhập vào Genealogy
        </h2>
        <FormProvider {...methods}>
          {showOTPForm ? (
            <form onSubmit={methods.handleSubmit(onLogin)} className="w-full">
              <Field
                name="password"
                type="password"
                label="Mật khẩu"
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
          ) : (
            <form onSubmit={methods.handleSubmit(onExists)} className="w-full">
              <Field
                name="email"
                type="text"
                label="Email của bạn"
                labelClass="required"
                placeholder="email"
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
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
