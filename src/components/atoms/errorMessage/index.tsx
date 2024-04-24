import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type TypeErrorMessageProps = {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const ErrorMessage = (props: TypeErrorMessageProps) => {
    const { error } = props;

    return (
        <p className='text-[red] mt-[4px] text-[12px]'>{`${error?.message ?? ""}`}</p>
    )
};

export default ErrorMessage;