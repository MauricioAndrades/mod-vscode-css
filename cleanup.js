import postcss from 'postcss';
import fs from 'fs';

export default postcss.plugin('remove-duplicate-properties', opts => {
  opts = opts || {};

  // Load the reference CSS file and parse it using PostCSS
  const referenceCss = fs.readFileSync(opts.referenceFilePath, 'utf-8');
  const referenceRoot = postcss.parse(referenceCss);

  // Create a set to store all the properties from the reference CSS file
  const referenceProperties = new Set();

  // Populate the set with the properties from the reference CSS file
  referenceRoot.walkDecls(decl => {
    referenceProperties.add(decl.prop);
  });

  return (root, result) => {
    // Walk through all the declarations in the current CSS file and remove any properties that are in the reference set
    root.walkDecls(decl => {
      if (referenceProperties.has(decl.prop)) {
        decl.remove();
      }
    });
  };
});
