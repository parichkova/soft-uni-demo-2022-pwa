// import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import QrReader from 'react-qr-scanner'

import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Layout
} from 'antd';
import { useState } from 'react';

const { TextArea } = Input;
const { Header, Content } = Layout;

export const AddProduct = () => {
  // const [barcode, setBarcode] = useState<string>("");

  return (
    <>
      <Header></Header>
      Tishh
      {/* <QrReader
          onError={(e: Error) => console.log(e)}
          onScan={(s: string) => setBarcode(s)}
        >
          Test: <p>{barcode}</p>
        </QrReader> */}
      <Content style={{ padding: '50px' }}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
          className=""
        >
          <Form.Item label="Barcode" required>
          <Input />
          </Form.Item>
          <Form.Item label="Product description">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Weight" required>
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="Width">
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="Length">
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="Height">
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="Product image" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Button type="primary">Confirm</Button>
          <Button type="primary">Scan barcode</Button>
        </Form>
      </Content>
    </>
  );
};
