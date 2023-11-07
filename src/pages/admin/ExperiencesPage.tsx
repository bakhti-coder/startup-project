import { Fragment, useEffect } from "react";

import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
const { RangePicker } = DatePicker;

import { LIMIT } from "../../constants";
import useExperiences from "../../store/experiences";

const ExperiencesPage = () => {
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
    handleOkDate,
    handleEdit,
    handleDelete,
    getData,
    handlePage,
  } = useExperiences();

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Work name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <p>{description.slice(0, 20)}...</p>,
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
            <h1>Experiences ({total})</h1>
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
              Add experience
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
        title="Experiences data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add experience" : "Save experience"}
        okType="danger"
        open={isModalOpen}
        onOk={() => handleOkDate(form)}
        onCancel={closeModal}
      >
        <Form
          name="experiences"
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
            label="Work name"
            name="workName"
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
            label="Company name"
            name="companyName"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            // onChange={handleDateValue}
            // onOk={onOk}
          />
        </Form>
      </Modal>
    </Fragment>
  );
};

export default ExperiencesPage;
