/* eslint-disable import/extensions */
import axios from "axios";
import reducer from "../src/store/authSlice";

jest.mock("axios");

describe("authSlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      id: null,
      email: null,
      nickname: null,
    };
  });

  it("RETURN INITIALSTATE", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("SHOULD FETCH USER", () => {
    const user = {
      id: "621dbb6e148cd5177d0ee67a",
      email: "choisy9619@gmail.com",
      nickname: "seoyoung",
    };
    const resp = { data: user };
    axios.post.mockResolvedValue(resp);

    expect(resp.data).toEqual(user);
  });
});
