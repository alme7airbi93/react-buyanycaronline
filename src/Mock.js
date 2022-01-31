export const ROLE = {
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
}

const mockData = [
    {
        id: 1,
        email: "admin@gmail.com",
        password: "admin",
        roles: ROLE.ADMIN
    },
    {
        id: 2,
        email: "moderator@gmail.com",
        password: "moderator",
        roles: ROLE.MODERATOR
    },
    {
        id:3,
        email: "customer@gmail.com",
        password: "customer",
        roles: ROLE.CUSTOMER
    },
]
export default mockData;