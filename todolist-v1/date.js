// jshint esversion: 6

const getDay = () => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("en-US", options);
};

module.exports = {
  getDay,
};
