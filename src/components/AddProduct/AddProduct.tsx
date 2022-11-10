import React, { useState } from "react";
import { v4 } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Upload, Layout, Space } from "antd";

import { Product } from "~/types/types";
import { createProduct } from "~/utilities/create-new-product";
import { RcFile } from "antd/lib/upload";
import { getBase64 } from "~/utilities/utilities";

const { TextArea } = Input;
const { Content } = Layout;

export const AddProduct = () => {
  const [barcode, setBarcode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const onChange =  async (fileList: any) => {
    if (fileList.length && fileList[0]) {
      setImageUrl(await getBase64(fileList[0].originFileObj as RcFile));
    }
  };

  const onClick = () => {
    if (barcode && weight) {
      createProduct({
        id: v4(),
        barcode: parseInt(barcode),
        description,
        weight,
        width,
        height,
        length,
        imageUrl,
      });
    }
  }

  return (
    <>
      <Content style={{ padding: "50px" }}>
        <Form
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Barcode" required>
            <Input
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => setBarcode(value)}
              value={barcode}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              onInput={({
                target: { value },
              }: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(value)
              }
              rows={1}
              value={description}
            />
          </Form.Item>
          {/* <Space.Compact size="medium" block> */}
            <Form.Item
              label="Weight"
              required
            >
              <Input
                min="0"
                onChange={({ target: { value } }) => setWeight(value ? parseInt(value) : 0)}
                value={weight ? `${weight}` : undefined}
              />
            </Form.Item>
            <Form.Item
              label="Width"
            >
              <Input
                min="0"
                onChange={({ target: { value } }) => setWidth(value ? parseInt(value) : 0)}
                value={width ? `${width}` : undefined}
              />
            </Form.Item>
            <Form.Item
              label="Length"
            >
              <Input
                min="0"
                onChange={({ target: { value } }) => setLength(value ? parseInt(value) : 0)}
                value={length ? `${length}` : undefined}
              />
            </Form.Item>
            <Form.Item
              label="Height"
            >
              <Input
                min="0"
                onChange={({ target: { value } }) => setHeight(value ? parseInt(value) : 0)}
                value={height ? `${height}` : undefined}
              />
            </Form.Item>
          <Form.Item label="Product image" valuePropName="fileList">
            <Upload
              action=""
              listType="picture-card"
              onChange={({ fileList }) => onChange(fileList)}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <div>
            <Button
              style={{ width: "100%" }}
              onClick={onClick}
              type="primary"
              block
              disabled={!(Boolean(barcode) && Boolean(weight))}
            >
              Confirm
            </Button>
          </div>
        </Form>
      </Content>
    </>
  );
};
