import React, { useState } from 'react';
import { v4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, Layout, Alert } from 'antd';

import { createDiscipline } from '~/utilities/create-new-discipline';
import { RcFile } from 'antd/lib/upload';
import { getBase64 } from '~/utilities/utilities';

const { TextArea } = Input;
const { Content } = Layout;

export const AddDiscipline = (): JSX.Element => {
  const [discipline, setDiscipline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const onChange = async (fileList: any): Promise<void> => {
    if (fileList.length && fileList[0]) {
      setImageUrl(await getBase64(fileList[0].originFileObj as RcFile));
    }
  };

  const onClick = async () => {
    if (discipline != null && duration != null) {
      const result = await createDiscipline({
        id: v4(),
        name: discipline,
        description,
        duration,
        imageUrl
      });

      if (result != null) {
        setShowToast(!showToast);
      }
    }
  }

  return (
    <>
      {showToast && <Alert
        style={{ margin: '20px' }}

        message={`New discipline '${discipline}' ${duration ? `with ${duration} hours duration` : ''} added.`}
        type="success"
        onClose={() => setShowToast(!showToast)}
        showIcon
        closable
      />
      }
      <Content style={{ padding: '50px' }}>
        <Form
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Discipline" required>
            <Input
              onChange={({
                target: { value }
              }: React.ChangeEvent<HTMLInputElement>) => setDiscipline(value)}
              value={discipline}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              onInput={({
                target: { value }
              }: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(value)
              }
              rows={1}
              value={description}
            />
          </Form.Item>
            <Form.Item
              label="Duration"
              required
            >
              <Input
                min="0"
                onChange={({ target: { value } }) => setDuration(value ? parseInt(value) : 0)}
                value={duration ? `${duration}` : undefined}
              />
            </Form.Item>
          <Form.Item label="Discipline icon" valuePropName="fileList">
            <Upload
              action=""
              listType="picture-card"
              onChange={async ({ fileList }) => await onChange(fileList)}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <div>
            <Button
              style={{ width: '100%' }}
              onClick={onClick}
              type="primary"
              block
              disabled={!(Boolean(discipline) && Boolean(duration))}
            >
              Confirm
            </Button>
          </div>
        </Form>
      </Content>
    </>
  );
};
