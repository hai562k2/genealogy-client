import React, { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import LabelField from "../../atoms/labelField";
import { Input } from "antd";
import ErrorMessage from "../../atoms/errorMessage";

type TypeFieldProps = {
    name: string;
    label?: string | ReactNode;
    labelClass?: "required";
    rules?: Object;
    type?: "text" | "password" | "textarea";
    [key: string]: any;
}

const Field = (props: TypeFieldProps) => {
    const { name, label, labelClass, rules, type, ...rest } = props;
    const { control, formState } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <div className="mb-[16px]">
                    <LabelField label={label} labelClass={labelClass} />
                    {type === "password" &&
                        <Input.Password
                            {...field}
                            style={{ height: "38px" }}
                            status={formState.errors[name] ? "error" : ""}
                            {...rest}
                        />
                    }
                    {type === "text" &&
                        <Input
                            {...field}
                            status={formState.errors[name] ? "error" : ""}
                            style={{ height: "38px" }}
                            {...rest}
                        />
                    }
                    {type === "textarea" &&
                        <Input.TextArea 
                            {...field}
                            status={formState.errors[name] ? "error" : ""}
                            {...rest}
                        />
                    }
                    <ErrorMessage error={formState.errors[name]} />
                </div>
            )}
        />
    );
};

export default Field;