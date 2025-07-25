import { send } from "@emailjs/browser";

export const sendEmail = async (email: string, name: string, message: string, choice: number) => {
    const templateParams = {
        to_name: choice === 1 ? "Vignesh D" : "Suraj S G",
        from_name: name ? name : "Anonymous",
        from_email: email ? email : "Anonymous@gmail.com",
        message: message,
  
    };
    const serviceID = choice === 1 ? process.env.EMAILJS_SERVICE_ID_1 : process.env.EMAILJS_SERVICE_ID_2;
    const templateID = choice === 1 ? process.env.EMAILJS_TEMPLATE_ID_1 : process.env.EMAILJS_TEMPLATE_ID_2;
    const publicKey = choice === 1 ? process.env.EMAILJS_PUBLIC_KEY_1 : process.env.EMAILJS_PUBLIC_KEY_2;
    if (serviceID && templateID && publicKey) {
        try {
            await send(serviceID, templateID, templateParams, publicKey);
        } catch (error) {
            console.log(error);
        }
    }
};