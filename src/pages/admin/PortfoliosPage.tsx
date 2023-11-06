import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { LIMIT } from "../../constants";
import { Photo } from "../../types";
import { getImage } from "../../utils/Image";
import usePortfolios from "../../zustand/portfolios";

const PortfoliosPage = () => {
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
    photo,
    photoLoading,
    closeModal,
    showModal,
    handleSearch,
    handleOk,
    uploadPhoto,
    handleEdit,
    handleDelete,
    getData,
    handlePage,
  } = usePortfolios();

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo: Photo) => (
        <Image width={50} height={50} src={getImage(photo)} alt="img" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <Link to={url} className="underline">
          Link
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc: string) => <p>{desc.slice(0, 30)}...</p>,
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
            <h1>Portfolios ({total})</h1>
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
              Add portfolio
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
        title="Portfolios data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add portfolio" : "Save portfolio"}
        okType="danger"
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="portfolio"
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
            label="Url portfolio"
            name="url"
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
            <TextArea rows={2} />
          </Form.Item>

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={uploadPhoto}
          >
            {photo ? (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={getImage(photo)}
                alt="avatar"
              />
            ) : (
              <div>
                {photoLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  {selected === null ? "Add photo" : "Change photo"}
                </div>
              </div>
            )}
          </Upload>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfoliosPage;
