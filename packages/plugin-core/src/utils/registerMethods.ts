import getPages from './getPages';
import getRoutes from './getRoutes';
import formatPath from './formatPath';

export default (api, options: any = {}) => {
  const { registerMethod } = api;
  const { generator, pageGenerator } = options;

  // register utils method
  registerMethod('getPages', getPages);
  registerMethod('formatPath', formatPath);
  registerMethod('getRoutes', getRoutes);

  // registerMethod for modify page
  registerMethod('addPageExport', pageGenerator.addPageExport);
  registerMethod('removePageExport', pageGenerator.removePageExport);

  // registerMethod for add export
  const regsiterKeys = ['addIceExport', 'addIceTypesExport', 'addIceAppConfigTypes', 'addIceAppConfigAppTypes'];
  regsiterKeys.forEach((registerKey) => {
    registerMethod(registerKey, (exportData) => {
      generator.addExport(registerKey, exportData);
    });
    registerMethod(registerKey.replace('add', 'remove'), (removeExportName) => {
      generator.removeExport(registerKey, removeExportName);
    });
  });

  const registerAPIs = {
    addEntryImports: {
      apiKey: 'addContent',
    },
    addEntryCode: {
      apiKey: 'addContent',
    },
  };

  Object.keys(registerAPIs).forEach((apiName) => {
    registerMethod(apiName, (code, position = 'after') => {
      const { apiKey } = registerAPIs[apiName];
      generator[apiKey](apiName, code, position);
    });
  });
};
