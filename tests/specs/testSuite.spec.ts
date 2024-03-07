import { test, expect } from "@playwright/test";
import createUser from "../pages/createUser.ts";
import { generateToken } from "../pages/tokenGeneration.ts";
import { Request } from "../pages/httpRequests.ts";
test.describe.serial("Test Suite",() => {
  let newUser;
  let updatedUser;
  test.beforeAll(async ({ request, baseURL }) => {
    newUser = new createUser();
    newUser.setUserData();
    updatedUser = new createUser();
    updatedUser.setUserData();
    process.env.authToken = await generateToken({ request, baseURL });
  });
  test("POST create booking", async ({ request, baseURL }) => {
    const response = await Request.postRequest(request, baseURL, newUser);
    const responseBody = await response.json();
    process.env.BOOKING_ID = responseBody.bookingid;
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(responseBody.booking).toHaveProperty("firstname",newUser.getFirstName());
    expect(responseBody.booking).toHaveProperty("lastname",newUser.getLastName());
    expect(responseBody.booking).toHaveProperty("totalprice",newUser.getTotalPrice());
    expect(responseBody.booking).toHaveProperty("depositpaid",newUser.getDepositPaid());
    expect(responseBody.booking).toHaveProperty("additionalneeds",newUser.getAdditionalNeeds());
  });
  test("GET get booking details", async ({ request, baseURL }) => {
    let ID = process.env.BOOKING_ID;
    const response = await Request.getRequest(request, baseURL, ID);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toHaveProperty("firstname", newUser.getFirstName());
    expect(responseBody).toHaveProperty("lastname", newUser.getLastName());
    expect(responseBody).toHaveProperty("totalprice", newUser.getTotalPrice());
    expect(responseBody).toHaveProperty("depositpaid",newUser.getDepositPaid());
  });
  test("PATCH update using first and last name", async ({ request, baseURL}) => {
    let ID = process.env.BOOKING_ID;
    const response2 = await Request.getRequest(request, baseURL, ID);
    expect(response2.status()).toBe(200);
    const response = await Request.patchRequest(request,baseURL,ID,updatedUser);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("firstname",updatedUser.getFirstName());
    expect(responseBody).toHaveProperty("lastname", updatedUser.getLastName());
    expect(responseBody).toHaveProperty("totalprice", newUser.getTotalPrice());
    expect(responseBody).toHaveProperty("depositpaid",newUser.getDepositPaid());
    expect(responseBody).toHaveProperty("additionalneeds",newUser.getAdditionalNeeds());
  });
  test("PUT update booking fully", async ({ request, baseURL }) => {
    let ID = process.env.BOOKING_ID;
    const response2 = await Request.getRequest(request, baseURL, ID);
    expect(response2.status()).toBe(200);
    const response = await Request.putRequest(request, baseURL, updatedUser, ID);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("firstname",updatedUser.getFirstName());
    expect(responseBody).toHaveProperty("lastname", updatedUser.getLastName());
    expect(responseBody).toHaveProperty("totalprice",updatedUser.getTotalPrice());
    expect(responseBody).toHaveProperty("depositpaid",updatedUser.getDepositPaid());
    expect(responseBody).toHaveProperty("additionalneeds",updatedUser.getAdditionalNeeds());
  });
  test("DELETE delete booking", async ({ request, baseURL }) => {
    let ID = process.env.BOOKING_ID;
    const response2 = await Request.getRequest(request, baseURL, ID);
    expect(response2.status()).toBe(200);
    const response = await Request.deleteRequest(request, baseURL, ID);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe("Created");
    const getResponse = await Request.getRequest(request, baseURL, ID);
    expect(getResponse.status()).toBe(404);
    expect(getResponse.statusText()).toBe("Not Found");
  });
});
