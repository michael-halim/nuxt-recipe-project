export const getters = {
  getBaseLink: () => () => {
    return "http://192.168.1.11:9000";
  },
  formatNumber: () => (x) => {
    // Function to Format Number to separate number with 3 digits
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};
