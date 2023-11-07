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

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { LIMIT } from "../../constants";
import useEducation from "../../state/education";

const EducationPage = () => {
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
  } = useEducation();

  useEffect(() => {
    getData();
  }, [getData]);

  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: string) => <p>{startDate.split("T")[0]}</p>,
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: string) => <p>{endDate.split("T")[0]}</p>,
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
            <h1>Education ({total})</h1>
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
              Add education
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
        title="Education  data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add education" : "Save education"}
        okType="danger"
        open={isModalOpen}
        onOk={() => handleOkDate(form)}
        onCancel={closeModal}
      >
        <Form
          name="education"
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
            label="Name"
            name="name"
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
            label="Lavel"
            name="level"
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

          {/* <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            
            format="YYYY-MM-DD HH:mm"
          /> */}

          <RangePicker
            defaultValue={[
              dayjs("2019-09-03", dateFormat),
              dayjs("2019-11-22", dateFormat),
            ]}
          />
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
