import React from 'react';
import RootRouter from './router/router';
import { App, ConfigProvider } from 'antd';

const AppReact = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBorderRadius: 0,
            headerBg: "rgb(245, 170, 7)",
            headerColor: "#ffffff",
            rowHoverBg: "#FCE0A6",
          }
        }
      }}
    >
      <App>
        <RootRouter />
      </App>
    </ConfigProvider>
  )
}

export default AppReact;
