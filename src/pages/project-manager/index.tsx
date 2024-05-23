import React, { useEffect, useState } from "react";

const ProjectManager = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
          Genealogy
        </h1>
        <p className="text-gray-700 mb-6 text-lg md:text-xl">
          Chào mừng bạn đến với Website gia phả Genealogy. Vui lòng thêm dòng họ
          của bạn để sử dụng dịch vụ của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default ProjectManager;
