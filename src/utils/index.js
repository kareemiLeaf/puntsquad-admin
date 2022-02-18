export const isLogin = () => {
  if (localStorage.getItem("PUNTS_TOKEN")) {
    return true;
  } else {
    return false;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("PUNTS_TOKEN");
  return `Bearer ${token}`;
};
