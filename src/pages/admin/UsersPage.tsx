import { Fragment, useEffect } from "react";

import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";

import { LIMIT } from "../../constants";
import { UserType } from "../../types";
import { userImage } from "../../utils/Image";
import useUser from "../../zustand/user";

const UsersPage = () => {
  const [form] = Form.useForm();

  const {
    data,
    loading,
    total,
    search,
    selected,
    isModalLoading,
    isModalOpen,
    page,
    btnLoading,
    btnId,
    closeModal,
    showModal,
    handleSearch,
    handleOk,
    handleEdit,
    handleDelete,
    getData,
    handlePage,
  } = useUser();

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => <Avatar src={userImage(photo)} alt="avatar" />,
    },
    {
      title: "Full name",
      dataIndex: "firstName",
      key: "firstName",
      render: (firstName: string, row: UserType) => (
        <p>
          {firstName} {row.lastName}
        </p>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <p>{role}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button
            className="bg-blue-700"
            type="primary"
            onClick={() => handleEdit(id, form)}
          >
            Edit
          </Button>
          <Button
            loading={btnId === id && btnLoading}
            type="primary"
            danger
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Users ({total})</h1>
            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button
              className="bg-blue-700"
              onClick={() => showModal(form)}
              type="primary"
            >
              Add user
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={data}
        columns={columns}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(e) => handlePage(e)}
        />
      ) : null}
      <Modal
        title="Users data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add user" : "Save user"}
        okType="danger"
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="user"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Firs name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Info" name="info">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Fields" name="fields">
            <Input />
          </Form.Item>

          <Form.Item label="Phone number" name="phoneNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Birthday" name="birthday">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Github" name="github">
            <Input />
          </Form.Item>

          <Form.Item label="Linkedin" name="linkedin">
            <Input />
          </Form.Item>

          <Form.Item label="Telegram" name="telegram">
            <Input />
          </Form.Item>

          <Form.Item label="Instagram" name="instagram">
            <Input />
          </Form.Item>

          <Form.Item label="Youtube" name="youtube">
            <Input />
          </Form.Item>

          <Form.Item label="Facebook" name="facebook">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
