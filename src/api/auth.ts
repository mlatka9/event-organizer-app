import api from "lib/api";

interface registerDataType {
  email: string;
  password: string;
}

export const register = async (registerData: registerDataType) => {
  const { data } = await api.post("auth/register", registerData);
  return data;
};
