// require all `test/components/**/index.js`
const testsContext = require.context('./unit/', true, /index\.js$/)

testsContext.keys().forEach(testsContext)

// require all `src/components/**/index.js`
const componentsContext = require.context('../src/', true, /main\.js$/)

componentsContext.keys().forEach(componentsContext)
