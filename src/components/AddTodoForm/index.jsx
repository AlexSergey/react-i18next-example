import { Form, Row, Col, Button, Input } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { PlusCircleFilled } from '@ant-design/icons';

import './styles.less';

export const AddTodoForm = ({ onFormSubmit }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = () => {
    onFormSubmit(form.getFieldValue('name'));
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={'name'}
            rules={[{ required: true, message: t('required') }]}
          >
            <Input placeholder={t('placeholder')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <Trans
              i18nKey="add_todo"
              components={{ icon: <PlusCircleFilled /> }}
            />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
