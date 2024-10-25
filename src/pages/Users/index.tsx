import { useState, useEffect } from "react";
import { postData, getData, deleteData, updateData } from "../../utils/api";
import { User } from "../../utils/api/Users";
import { USERS_ENDPOINT } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { TableComponent } from "../../components/ui/molecules/Table";
import UserModal from "../../components/ui/molecules/Modal/User";
import { UserSchema } from "../../components/ui/molecules/Modal/validation";

interface Props {
  user?: User | null;
  visibility: boolean;
}

export const Users = ({}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const methods = useForm<Props>({
    defaultValues: { user: null, visibility: false },
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    getValues,
    clearErrors,
    trigger,
    formState: { errors },
  } = methods;

  const user = watch("user");
  const visibility = watch("visibility");

  const handleGetUsers = async () => {
    setUsers(await getData(USERS_ENDPOINT));
    setLoading(false);
  };

  const handleCreate = async () => {
    const data = getValues();
    const isErrorFree = await trigger();
    if (
      isErrorFree &&
      data.user?.firstName &&
      data.user.lastName &&
      data.user.age
    ) {
      const result = await postData({ user, users });

      if (result.id) {
        toggleModalVisibility();
        handleGetUsers();
      }
    }

    console.log(errors);
  };

  const handleUpdate = async () => {
    const data = getValues();
    const isErrorFree = await trigger();
    if (
      isErrorFree &&
      data.user?.firstName &&
      data.user.lastName &&
      data.user.age
    ) {
      const result = await updateData({ user });

      if (result.id) handleGetUsers();
    }

    console.log(errors);
  };

  const handleDelete = async () => {
    const data = getValues();
    if (data.user?.id) {
      const result = await deleteData({ user });

      if (result.id) {
        toggleModalVisibility();
        handleGetUsers();
      }
    }
  };

  const toggleModalVisibility = () => {
    clearErrors();
    setValue("visibility", !visibility);
  };

  const handleOpenModal = (user: User) => {
    setValue("user", user);
    toggleModalVisibility();
  };

  const openNewModal = () => {
    handleOpenModal({
      id: "",
      age: null,
      firstName: "",
      lastName: "",
    });
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="relative grow flex flex-col mx-4">
      {loading ? (
        <p className="self-center uppercase">Loading...</p>
      ) : (
        <>
          <div className="text-right flex flex-row justify-end mt-24">
            <button
              onClick={openNewModal}
              className="flex flex-row items-center gap-1 rounded-full px-4 py-2 bg-white text-black transition-color ease-in-out duration-300 hover:bg-blu hover:border-blu hover:text-white"
            >
              <p>Create User</p>
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <TableComponent
            data={users as any}
            handleOpenModal={handleOpenModal}
          />
          {user && (
            <UserModal
              methods={methods}
              handleClose={toggleModalVisibility}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              errorMessage={errors.user?.firstName?.message}
            />
          )}
        </>
      )}
    </div>
  );
};
