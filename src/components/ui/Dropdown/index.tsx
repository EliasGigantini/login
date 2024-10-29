import { useState } from "react";
import { Button, buttonVariants } from "../button";
import { User } from "../../../utils/api/Users";

interface Props {
  users: User[];
  methods: any;
}

export const Dropdown = ({ users, methods }: Props) => {
  const [show, setShow] = useState(false);

  const handleClick = (user: User) => {
    setShow(!show);

    if (user.id === "") throw new Error("Invalid user!");

    methods.setValue("user", user);
  };

  return (
    <>
      <div className="inline-block text-left">
        <div>
          {methods.getValues().user.id === "" ? (
            <Button
              type="button"
              className={`text-center ${show ? "text-blu" : "text-black"}`}
              variant={buttonVariants.ghost}
              onClick={() => setShow(!show)}
            >
              <>Select User</>
            </Button>
          ) : (
            <Button
              type="button"
              className={`text-center ${show ? "text-blu" : "text-black"}`}
              variant={buttonVariants.ghost}
              onClick={() => setShow(!show)}
            >
              <>
                {methods.getValues().user.firstName}{" "}
                {methods.getValues().user.lastName}
              </>
            </Button>
          )}
        </div>

        {show ? (
          <div className="absolute left-4 bottom-0 mb-16 w-64 max-h-72 overflow-y-scroll rounded-3xl bg-pure shadow-lg shadow-blu/25">
            <div className="p-1 flex flex-col">
              {users.map((user) => (
                <button
                  type="button"
                  key={user.id}
                  onClick={() => handleClick(user)}
                  className="px-4 py-2 rounded-full grow transition-all duration-200 text-left hover:bg-blu hover:text-pure hover:px-6"
                >
                  {user.firstName} {user.lastName}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
