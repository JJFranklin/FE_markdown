import { defineComponent as r, createElementBlock as s, openBlock as a } from "vue";
const p = (t, n) => {
  const o = t.__vccOpts || t;
  for (const [e, c] of n)
    o[e] = c;
  return o;
}, f = r({
  name: "BigButton"
});
function u(t, n, o, e, c, m) {
  return a(), s("button", null, "我是超大1按钮");
}
const _ = /* @__PURE__ */ p(f, [["render", u]]), i = [_], l = function(t) {
  i.forEach((n) => {
    t.component(n.name, n);
  });
}, B = { install: l };
export {
  _ as BigButton,
  B as default
};
