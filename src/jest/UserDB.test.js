/* eslint-disable */
import {userStatusChange} from "../repository/UserDB.js";

test("Update the User Status: ", async () => {
    let userId="16bJFBu4qdiv4DB6Nsos";
    let status={status:true};
	await expect(userStatusChange(userId,status)).resolves.toBe(true);

});