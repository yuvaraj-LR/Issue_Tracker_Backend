import { encryptedPwd } from "../../../middleware/encryptPwd.js";

export const createNewUser = async(req, res, next) => {
    try {
        const {name, email, number, password} = req.body;

        let user = {
            name, 
            email, 
            number,
            "password": await encryptedPwd(password)
        }

        // Save a new user.
        const newUser = await createNewUserRepo(user);
        await sendToken(newUser, res, 200);

        // Send a welcme mail.
        await sendWelcomeEmail(newUser);
    } catch (error) {
        
    }
}