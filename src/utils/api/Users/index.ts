export interface User {
    id: string;
    age: number | null;
    firstName: string;
    lastName: string;
  }

export const getUpdateUserBody = async (user: User) => {
    return JSON.stringify({
        age: user.age,
        firstName: user.firstName,
        lastName: user.lastName,
    })
}
  
export const getUserBody = async (user: User, users: User[] | undefined) => {
    if (users === undefined) {
        return JSON.stringify({
            id: "1",
            age: user.age,
            firstName: user.firstName,
            lastName: user.lastName
        })
    }

    const newId = parseInt(users?.slice(-1)[0].id) + 1
    return JSON.stringify({
        id: newId.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
    })
}