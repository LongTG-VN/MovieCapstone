import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';

const RacChieuPhimComponent = () => {
 const [tabPlacement, setTabPlacement] = useState('start');
 
 const changeTabPlacement = e => {
    setTabPlacement(e.target.value);
  };

  return (
    <>
      <Tabs
        tabPlacement={tabPlacement}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            // hình ảnh Component và thêm class rounded nhé 
            label: <h1>a</h1>,
            key: id,
            // Cho 1 cái compnentcon nữa :D
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </>
  );
}

export default RacChieuPhimComponent