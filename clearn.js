const rimraf = require('rimraf');
const globby = require('globby');

(async () => {
  rimraf('node_modules',()=>{})
  const paths = await globby(['node_modules','public/img/post-image','public/img/product-image','!.gitignore']);
  paths.forEach(file=> {
    rimraf(file,()=>{
      console.log('clear file: ',file)
    });
  })
})();
