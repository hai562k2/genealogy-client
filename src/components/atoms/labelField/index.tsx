import React, { ReactNode } from "react";

type TypeLabelFieldProps = {
    label: string | ReactNode;
    labelClass?: "required";
}

const LabelField = (props: TypeLabelFieldProps) => {
    const { label, labelClass } = props;

    return (
        <>{
            label && <label className="mb-[8px] flex gap-[4px] font-semibold">
                {label} {labelClass && <span className="text-[red] font-semibold text-[16px]">*</span>}
            </label>
        }</>
    )
};

export default LabelField;