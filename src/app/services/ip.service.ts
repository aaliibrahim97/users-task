export const API = (parm1 = "") => {
  const APis = {
      registration: `/api/authaccount/registration`,
      login: `/api/authaccount/login`,
      userData:`/api/users`,
      createUser:`/api/users`,
      updateUser:`/api/users/${parm1}`,
      deleteUser:`/api/users/${parm1}`,
  };
  return APis;
};

