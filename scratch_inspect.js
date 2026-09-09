import fs from 'fs';
const code = fs.readFileSync('figma_mock_data.js', 'utf8');

const nrIdx = code.indexOf('nr=[');
console.log('Users slice:\n', code.slice(nrIdx, nrIdx + 4000));
