import { Fragment, useCallback, useEffect, useState } from "react";

import {
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
import request from "../../server";
import useAuth from "../../state/auth";
import { Skills } from "../../types";

const SkilsPageClinent = () => {
  const [form] = Form.useForm();

  const { user } = useAuth();

  const [data, setData] = useState<Skills[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnId, setBtnId] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const refetch = () => {
    setCallback(!callback);
  };

  const getSkils = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { pagination, data },
      } = await request.get("skills", {
        params: {
          search,
          page,
          user: user?._id,
        },
      });
      setTotal(pagination?.total);
      setData(data.map((el: Skills) => ({ ...el, key: el?._id })));
    } finally {
      setLoading(false);
    }
  }, [page, search, user?._id]);

  useEffect(() => {
    getSkils();
  }, [getSkils]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);

    try {
      if (selected === null) {
        setIsModalLoading(true);
        await request.post("skills", values);
        getSkils();
      } else {
        setIsModalLoading(true);
        await request.put(`skills/${selected}`, values);
        getSkils();
      }
    } finally {
      setIsModalLoading(false);
    }
    refetch();
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    setBtnId(id);
    try {
      setBtnLoading(true);
      await request.delete(`skills/${id}`);
      getSkils();
    } finally {
      setBtnLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    setSelected(id);
    try {
      setLoading(true);
      const { data } = await request.get(`skills/${id}`);
      form.setFieldsValue(data);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Fullname",
      render: (_id: string, row: Skills) =>
        `${row?.user?.firstName ?? "-"} ${row?.user?.lastName ?? "-"}`,
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
            onClick={() => handleEdit(id)}
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
            <h1>Skills ({total})</h1>
            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button className="bg-blue-700" onClick={showModal} type="primary">
              Add skill
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
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="Skills data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        okType="danger"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="skills"
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
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkilsPageClinent;
