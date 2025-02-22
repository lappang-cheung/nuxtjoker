import { unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';

const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchUsers() {
      var _a;
      this.loading = true;
      try {
        const response = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
              users {
                id
                name
                email
              }
            }`
          })
        });
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        const result = await response.json();
        if (!((_a = result == null ? void 0 : result.data) == null ? void 0 : _a.users)) throw new Error("Invalid GraphQL response");
        this.users = result.data.users;
      } catch (err) {
        this.error = err == null ? void 0 : err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const { users, loading, error } = storeToRefs(userStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-2xl font-bold">User List</h1>`);
      if (unref(loading)) {
        _push(`<p>Loading...</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<p class="text-red-500">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(users).length) {
        _push(`<ul class="mt-4 space-y-2"><!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<li class="p-2 border rounded-lg"><strong>${ssrInterpolate(user.name)}</strong> - ${ssrInterpolate(user.email)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ByFWBZFB.mjs.map
