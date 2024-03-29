export class Request {
    public static async postRequest(request, baseURL, userData) {
        const response = await request.post(`${baseURL}/booking`, {
            data: {
                "firstname": userData.getFirstName(),
                "lastname": userData.getLastName(),
                "totalprice": userData.getTotalPrice(),
                "depositpaid": userData.getDepositPaid(),
                "bookingdates": {
                    "checkin": userData.getCheckInDate(),
                    "checkout": userData.getCheckOutDate()
                },
                "additionalneeds": userData.getAdditionalNeeds()
            },
        });
        return response;
    }
    
    public static async getRequest(request, baseURL, ID) {
        const url = `${baseURL}/booking/`;
        const response = await request.get(url + ID, {});
        return response;
    }
    public static async patchRequest(request, baseURL, ID, partialData) {
        const url = `${baseURL}/booking/`;
        const response = await request.patch(url + ID, {
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "application/json",
            },
            data: {
                "firstname": partialData.getFirstName(),
                "lastname": partialData.getLastName(),
            },
        });
        return response;
    }
    public static async putRequest(request, baseURL, updatedUser, ID) {
        const url = `${baseURL}/booking/`;
        const response = await request.put(url + ID, {
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "*/*",
            },
            data: {
                "firstname": updatedUser.getFirstName(),
                "lastname": updatedUser.getLastName(),
                "totalprice": updatedUser.getTotalPrice(),
                "depositpaid": updatedUser.getDepositPaid(),
                "bookingdates": {
                    "checkin": updatedUser.getCheckInDate(),
                    "checkout": updatedUser.getCheckOutDate()
                },
                "additionalneeds": updatedUser.getAdditionalNeeds()
            }
        });
        return response;
    }
    public static async deleteRequest(request, baseURL, ID) {
        const url = `${baseURL}/booking/`;
        const response = await request.delete(url + ID, {
            headers: {
                Cookie: `token=${process.env.authToken}`,
                Accept: "application/json",
            },
        });
        return response;
    }
}