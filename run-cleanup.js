import postcss from 'postcss';
import fs from 'fs';
import removeDuplicateProperties from './cleanup';

const custom = fs.readFileSync('./custom.css', 'utf-8');

postcss([removeDuplicateProperties({ referenceFilePath: './custom.2.css' })])
  .process(custom, { from: './custom.css', to: './dist/custom.css' })
  .then(result => {
    fs.writeFileSync('./dist/custom.css', result.css);
  })
  .catch(error => {
    console.error(error);
  });