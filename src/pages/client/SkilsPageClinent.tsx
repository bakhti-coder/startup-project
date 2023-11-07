// import { Fragment, useEffect } from "react";

// import {
//   Button,
//   Flex,
//   Form,
//   Input,
//   Modal,
//   Pagination,
//   Space,
//   Table,
// } from "antd";

// import { LIMIT } from "../../constants";
// import { Skills } from "../../types";
// import useAuth from "../../zustand/auth";
// import useSkillsClient from "../../zustand/skillsClient";

const SkilsPageClinent = () => {
  // const [form] = Form.useForm();

  // const { user } = useAuth();

  // const {
  //   skills,
  //   loading,
  //   total,
  //   search,
  //   selected,
  //   isModalLoading,
  //   isModalOpen,
  //   page,
  //   btnLoading,
  //   btnId,
  //   handleUser,
  //   closeModal,
  //   showModal,
  //   handleSearch,
  //   handleOk,
  //   handleEdit,
  //   handleDelete,
  //   getSkills,
  //   handlePage,
  // } = useSkillsClient();

  // useEffect(() => {
  //   getSkills();
  // }, [getSkills]);

  // handleUser(user?._id);

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Percent",
  //     dataIndex: "percent",
  //     key: "percent",
  //   },
  //   {
  //     title: "Fullname",
  //     render: (_id: string, row: Skills) =>
  //       `${row?.user?.firstName ?? "-"} ${row?.user?.lastName ?? "-"}`,
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "_id",
  //     key: "_id",
  //     render: (id: string) => (
  //       <Space size="middle">
  //         <Button
  //           className="bg-blue-700"
  //           type="primary"
  //           onClick={() => handleEdit(id, form)}
  //         >
  //           Edit
  //         </Button>
  //         <Button
  //           loading={btnId === id && btnLoading}
  //           type="primary"
  //           danger
  //           onClick={() => handleDelete(id)}
  //         >
  //           Delete
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];

  return (
    <div>nimdur</div>
    // <Fragment>
    //   <Table
    //     scroll={{
    //       x: 1000,
    //     }}
    //     title={() => (
    //       <Flex justify="space-between" gap={36} align="center">
    //         <h1>Skills ({total})</h1>
    //         <Input
    //           value={search}
    //           onChange={handleSearch}
    //           style={{ width: "auto", flexGrow: 1 }}
    //           placeholder="Searching..."
    //         />
    //         <Button
    //           className="bg-blue-700"
    //           onClick={() => showModal(form)}
    //           type="primary"
    //         >
    //           Add skill
    //         </Button>
    //       </Flex>
    //     )}
    //     pagination={false}
    //     loading={loading}
    //     dataSource={skills}
    //     columns={columns}
    //   />
    //   {total > LIMIT ? (
    //     <Pagination
    //       total={total}
    //       pageSize={LIMIT}
    //       current={page}
    //       onChange={(e) => handlePage(e)}
    //     />
    //   ) : null}
    //   <Modal
    //     title="Skills data"
    //     maskClosable={false}
    //     confirmLoading={isModalLoading}
    //     okText={selected === null ? "Add skill" : "Save skill"}
    //     okType="danger"
    //     open={isModalOpen}
    //     onOk={() => handleOk(form)}
    //     onCancel={closeModal}
    //   >
    //     <Form
    //       name="skills"
    //       autoComplete="off"
    //       labelCol={{
    //         span: 24,
    //       }}
    //       wrapperCol={{
    //         span: 24,
    //       }}
    //       form={form}
    //     >
    //       <Form.Item
    //         label="Name"
    //         name="name"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please fill!",
    //           },
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>

    //       <Form.Item
    //         label="Percent"
    //         name="percent"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please fill!",
    //           },
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>
    //     </Form>
    //   </Modal>
    // </Fragment>
  );
};

export default SkilsPageClinent;
