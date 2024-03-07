import data from "../data/credentials.json";
export async function generateToken({ request, baseURL }) {
    const key = await request.post(`${baseURL}/auth`, {
        data: {
            "username": data.username,
            "password": data.password
        }
    });
    const authBody = await key.json();
    return `${authBody["token"]}`;
}