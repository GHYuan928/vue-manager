export default {
  namespaced: true,
  state: {
    visitedViews: [], // 存所有 affix== true 的拍平的路由
    cachedViews: [] // 存 route.name
  },
  mutations: {
    ADD_VISITED_VIEW(state, view) {
      // 如果存在，就不添加
      if (state.visitedViews.some(item => item.path === view.path)) {
        return
      }
      // 可以直接 push ，因为 vue 实现了 push 后 watch
      state.visitedViews.push({
        ...view,
        title: view.meta.title || 'no-name'
      })
    },
    ADD_CACHED_VIEW(state, view) {
      if (state.cachedViews.includes(view.name)) {
        return
      }
      if (!view.meta.noCached) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEW(state, view) {
      for (const i in state.visitedViews) {
        const r = state.visitedViews[i]
        if (r.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW(state, view) {
      state.cachedViews.splice(state.cachedViews.indexOf(view.name), 1)
    },
    DEL_ALL_VISITED_VIEWS(state) {
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS(state) {
      state.cachedViews = []
    }
  },
  actions: {
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    delVisitedView({ commit }, view) {
      commit('DEL_VISITED_VIEW', view)
    },
    delCachedView({ commit }, view) {
      commit('DEL_CACHED_VIEW', view)
    },
    delView({ dispatch }, view) {
      return new Promise((resolve) => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve()
      })
    },
    delAllViews({ dispatch }) {
      dispatch('delAllVisitedViews')
      dispatch('delAllCachedViews')
    },
    delAllVisitedViews({ commit }) {
      commit('DEL_ALL_VISITED_VIEWS')
    },
    delAllCachedViews({ commit }) {
      commit('DEL_ALL_CACHED_VIEWS')
    }
  }
}
