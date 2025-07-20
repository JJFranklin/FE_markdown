import BigButton from "./bigButton/index.vue";

export { BigButton };

const compts = [BigButton];

const install = function (App) {
  compts.forEach((item) => {
    App.component(item.name, item);
  });
};
export default {install};
