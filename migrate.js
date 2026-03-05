const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};

const files = walkSync('./libs/features/src/workflow');

files.forEach(file => {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) {
    let content = fs.readFileSync(file, 'utf8');
    
    // For DiagramApp/workflow-canvas.tsx which is at libs/features/src/workflow/
    if (file.endsWith('workflow-canvas.tsx')) {
        content = content.replace(/@\/diagram\/components\//g, './components/');
        content = content.replace(/@\/diagram\/engine\//g, './engine/');
        content = content.replace(/@\/diagram\/context\//g, './context/');
        content = content.replace(/@\/styles\/theme/g, '@temp-workspace/ui'); // we will provide a mocked theme export or default to MUI theme setup
        content = content.replace(/@\/styles\/GlobalStyles/g, '@temp-workspace/ui');
    } else if (file.includes('/components/')) {
        content = content.replace(/@\/diagram\/components\//g, './');
        content = content.replace(/@\/diagram\/engine\//g, '../engine/');
        content = content.replace(/@\/diagram\/context\//g, '../context/');
        content = content.replace(/@\/styles\/theme/g, '@temp-workspace/ui');
    } else if (file.includes('/engine/')) {
        content = content.replace(/@\/diagram\/engine\//g, './');
        content = content.replace(/@\/diagram\/context\//g, '../context/');
        content = content.replace(/@\/diagram\/components\//g, '../components/');
    } else if (file.includes('/context/')) {
        content = content.replace(/@\/diagram\/engine\//g, '../engine/');
    }

    // Convert lucide-react to fontawesome
    // This is hard to perfect via regex but we can change the import and fix the components later.
    // We will just let them break initially and fix them through TS issues.

    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log("Migration complete");
