const req = require.context('../../icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const svgIconsName = requireAll(req).map(i => {
  return i.match(/\.\/(.*)\.svg/)[1]
})

export default svgIconsName
