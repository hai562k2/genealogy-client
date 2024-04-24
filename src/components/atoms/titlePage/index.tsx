import React from "react";

const TitlePage = ({
    title
}: {
    title: string;
}) => {
    return (
        <div className="h-[50px] ps-[10px]">
            <h2 className="h-full flex items-center">{title}</h2>
        </div>
    )
};

export default TitlePage;