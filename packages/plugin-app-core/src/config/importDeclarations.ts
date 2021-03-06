const importDeclarations: any = {};
const defaultDeclarations = {
  // default export in app
  '$$framework/runApp': [
    'runApp', 'createApp',
    // router api
    'withRouter', 'history', 'getHistory', 'getSearchParams', 'useSearchParams', 'withSearchParams', 'getInitialData',
    // LifeCycles api
    'usePageShow', 'usePageHide', 'withPageLifeCycle',
    // events api
    'registerNativeEventListeners',
    'addNativeEventListener',
    'removeNativeEventListener',
    'ErrorBoundary',
  ],
  // export lazy
  '$$ice/lazy': ['lazy'],
  // export types
  '$$framework/types': ['IApp', 'IAppConfig'],
};

Object.keys(defaultDeclarations).forEach((importSource) => {
  defaultDeclarations[importSource].forEach((apiKey) => {
    importDeclarations[apiKey] = { value: importSource };
  });
});

export default importDeclarations;
