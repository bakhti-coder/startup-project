import { Fragment, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Button, Tabs, TabsProps } from "antd";

import useAccount from "../../state/account";
import { userImage } from "../../state/Image";

import "./style.scss";

const AccountPage = () => {
  const {
    userData,
    isFetching,
    photoLoading,
    editLoading,
    // passwordEditLoading,
    photo,
    handleFileChange,
    getUserData,
    editUserData,
  } = useAccount();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Profile",
      children: (
        <Fragment>
          {isFetching ? (
            <h1>Loading...</h1>
          ) : (
            <div className="profile__settings">
              <div className="profile__settings__file">
                <label htmlFor="fileInput" className="file-label">
                  {photo ? "Change photo" : "Upload photo "}
                </label>
                <input
                  className="file__upload"
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {photoLoading ? (
                  <LazyLoadImage
                    effect="blur"
                    className="file__img"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                    alt="gif"
                  />
                ) : photo ? (
                  <LazyLoadImage
                    effect="blur"
                    className="file__img"
                    src={userImage(photo)}
                    alt="user"
                  />
                ) : (
                  <LazyLoadImage
                    effect="blur"
                    className="file__img"
                    src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                    alt="NoPhoto"
                  />
                )}
              </div>

              <form className="profile__settings__form" onSubmit={editUserData}>
                <div>
                  <label className="profile__settings__form__title">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={userData?.firstName}
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    defaultValue={userData?.lastName}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={userData?.username}
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Fields
                  </label>
                  <input
                    type="text"
                    name="fields"
                    defaultValue={userData?.fields}
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    defaultValue={userData?.phoneNumber}
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Email
                  </label>
                  <input
                    name="email"
                    defaultValue={userData?.email}
                    type="email"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">Info</label>
                  <textarea
                    rows={5}
                    name="info"
                    defaultValue={userData?.info}
                    // type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Address
                  </label>
                  <input
                    name="address"
                    defaultValue={userData?.address}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Github
                  </label>
                  <input
                    name="github"
                    defaultValue={userData?.github}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Linkedin
                  </label>
                  <input
                    name="linkedin"
                    defaultValue={userData?.linkedin}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Telegram
                  </label>
                  <input
                    name="telegram"
                    defaultValue={userData?.telegram}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Instagram
                  </label>
                  <input
                    name="instagram"
                    defaultValue={userData?.instagram}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Youtube
                  </label>
                  <input
                    name="youtube"
                    defaultValue={userData?.youtube}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div>
                  <label className="profile__settings__form__title">
                    Facebook
                  </label>
                  <input
                    name="facebook"
                    defaultValue={userData?.facebook}
                    type="text"
                    className="profile__settings__form__input"
                  />
                </div>

                <div className="send">
                  {editLoading ? (
                    <Button
                      loading={editLoading}
                      disabled
                      className="bg-blue-700 w-full my-5"
                    >
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      className="send__button bg-blue-700 w-full my-5"
                    >
                      Save
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </Fragment>
      ),
    },
    {
      key: "2",
      label: "Change password",
      children: "adkjlfnalidg ",
    },
  ];

  return (
    <section>
      <div className="container max-w-1200">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </section>
  );
};

export default AccountPage;
