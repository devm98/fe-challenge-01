import { Form, Input, InputNumber, Modal } from "antd";
import { useEffect } from "react";
import { FruitModel } from "../models";

interface ModalAddNewProps {
  open: boolean;
  loading: boolean;
  onCreate: (values: FruitModel) => void;
  onCancel: () => void;
  dataEdit?: FruitModel;
}

const ModalAddNew: React.FC<ModalAddNewProps> = ({
  open,
  loading,
  dataEdit,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue(dataEdit);
    }
    return () => {
      form.resetFields();
    };
  }, [dataEdit, form]);

  return (
    <Modal
      open={open}
      title="Create a new fruit"
      okText={dataEdit ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (loading) {
              form.resetFields();
            }
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddNew;
