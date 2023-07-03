import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Button, Popconfirm, Space, notification, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useState } from "react";
import apiService from "../api";
import ModalAddNew from "../components/modal-add-new";
import { FruitModel } from "../models";

type NotificationType = "success" | "info" | "warning" | "error";

const FruitPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [fruitList, setFruitList] = useState<FruitModel[]>([]);
  const [paging, setPaging] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 20,
  });
  const [totalRow, setTotalRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [createdState, setCreatedState] = useState<{
    loading: boolean;
    isSuccess: boolean;
  }>({ loading: false, isSuccess: false });
  const [deletedState, setDeletedState] = useState<{
    loading: boolean;
    isSuccess: boolean;
  }>({ loading: false, isSuccess: false });
  const [dataEdit, setDataEdit] = useState<FruitModel>();

  useEffect(() => {
    const fetchFruitList = async (isTotal?: boolean) => {
      setLoading(true);
      const results = await apiService.get("/", {
        params: isTotal
          ? {}
          : {
              ...paging,
              orderBy: "id",
              order: "desc",
            },
      });
      setLoading(false);
      if (results.status === 200) {
        if (isTotal) {
          setTotalRow(results.data?.length || 0);
        } else {
          setFruitList(
            results.data.map((item: FruitModel) => ({ key: item.id, ...item }))
          );
        }
      }
      setCreatedState({ ...createdState, isSuccess: false });
      setDeletedState({ ...deletedState, isSuccess: false });
    };

    fetchFruitList();
    fetchFruitList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging, createdState.isSuccess, deletedState.isSuccess]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description?: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const [open, setOpen] = useState(false);

  const onCreate = async (values: FruitModel) => {
    const newValues: FruitModel = {
      ...values,
      image: dataEdit ? values.image : faker.image.urlPicsumPhotos(),
      createdAt: dataEdit ? values.createdAt : dayjs().format(),
    };
    setCreatedState((prevState) => ({ ...prevState, loading: true }));
    if (dataEdit) {
      const results = await apiService.put(`/${dataEdit.id}`, newValues);
      if (results.status === 200) {
        setOpen(false);
        setCreatedState({ ...createdState, isSuccess: true });
        openNotificationWithIcon("success", "Update fruit successfully!");
        setDataEdit(undefined);
      } else {
        openNotificationWithIcon(
          "error",
          "An error occurred, please try again!"
        );
      }
    } else {
      const results = await apiService.post("/", newValues);
      if (results.status === 201) {
        setOpen(false);
        setCreatedState({ ...createdState, isSuccess: true });
        openNotificationWithIcon("success", "Create fruit successfully!");
      } else {
        openNotificationWithIcon(
          "error",
          "An error occurred, please try again!"
        );
      }
    }

    setCreatedState((prevState) => ({ ...prevState, loading: false }));
  };

  const onDelete = async (id: string) => {
    setDeletedState((prevState) => ({ ...prevState, loading: true }));
    const results = await apiService.delete(`/${id}`);
    setDeletedState((prevState) => ({ ...prevState, loading: false }));
    if (results.status === 200) {
      setCreatedState((prevState) => ({ ...prevState, isSuccess: true }));
      openNotificationWithIcon("success", "Delete fruit successfully!");
    } else {
      openNotificationWithIcon("error", "An error occurred, please try again!");
    }
  };

  const handleChangePage = (page: number, pageSize: number) => {
    setPaging({
      ...paging,
      page,
      limit: pageSize,
    });
  };

  const onShowUpdate = (record: FruitModel) => {
    setOpen(true);
    setDataEdit(record);
  };

  const cols: ColumnsType<FruitModel> = [
    {
      title: "Fruit name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (_, record) => (
        <img src={record.image} alt="" style={{ width: 100, height: 100 }} />
      ),
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      render: (_, record) => (
        <span>{numeral(record.amount).format("0,0")}</span>
      ),
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (_, record) => (
        <span>{dayjs(record.createdAt).format("DD/MM/YYYY HH:mm")}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() => onShowUpdate(record)}
          />
          <Popconfirm
            title="Delete the fruit"
            description="Are you sure to delete this fruit?"
            okText="Yes"
            cancelText="No"
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onConfirm={() => onDelete(record.id!)}
            okButtonProps={{ loading: deletedState.loading }}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        backgroundColor: colorBgContainer,
        overflow: "auto",
      }}
    >
      {contextHolder}
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setOpen(true)}
      >
        Create fruit
      </Button>
      <Table
        size="small"
        loading={loading}
        columns={cols}
        dataSource={fruitList}
        scroll={{ y: 1000 }}
        pagination={{
          pageSize: paging.limit,
          total: totalRow,
          onChange: handleChangePage,
          showTotal: (total) => `Total ${total} items`,
          size: "small",
        }}
      />
      <ModalAddNew
        loading={createdState.loading}
        onCreate={onCreate}
        open={open}
        onCancel={() => {
          setOpen(false);
          setDataEdit(undefined);
        }}
        dataEdit={dataEdit}
      />
    </Content>
  );
};

export default FruitPage;
