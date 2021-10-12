/**
 * Create a new recipe for your service
 */
const fs = require('fs-extra');
const path = require('path');
const open = require('open');

if (process.argv.length < 3) {
  console.log(`Usage: pnpm run create <Recipe name> [Folder name]
For example:
pnpm run create WhatsApp
pnpm run create "Google Hangouts"
You can set "Folder name" to "FerdiDev" to use Ferdi's development instance instead:

pnpm run create WhatsApp FerdiDev
`);
  throw new Error('Please provide the correct number of args!');
}

const recipeName = process.argv[2];
const recipe = recipeName.toLowerCase().replace(/\s/g, '-');
const cleanRecipeId = recipe.replace(/[^a-z]/g, ''); // Clean recipe ID only containing a-z, for usage as the JavaScript class name
const folderName = process.argv[3] || 'Zellim';
const filesThatNeedTextReplace = [
  'package.json',
  'index.js',
  'webview.js',
  'README.md',
];

(async () => {
  // Folder paths
  const userData =
    process.env.APPDATA ||
    (process.platform == 'darwin'
      ? process.env.HOME + '/Library/Application Support'
      : process.env.HOME + '/.config');
  const recipesFolder = path.join(userData, folderName, 'recipes');
  const devRecipeFolder = path.join(recipesFolder, 'dev');
  const newRecipeFolder = path.join(devRecipeFolder, recipe);
  const sampleRecipe = path.join(__dirname, 'sample_recipe');

  // Make sure dev recipe folder exists
  if (!fs.existsSync(recipesFolder)) {
    console.log(
      `Couldn't find your recipe folder (${recipesFolder}). Is Zellim installed?`,
    );
    return;
  }
  await fs.ensureDir(devRecipeFolder);

  if (fs.existsSync(newRecipeFolder)) {
    console.log('⚠️ Recipe already exists');
    return;
  }

  console.log('[Info] Passed pre-checks');

  // Copy sample recipe to recipe folder
  await fs.copy(sampleRecipe, newRecipeFolder);
  console.log('[Info] Copied recipe');

  // Replace placeholders with the recipe-specific values
  for (const file of filesThatNeedTextReplace) {
    const filePath = path.join(newRecipeFolder, file);
    let contents = await fs.readFile(filePath, 'utf-8');
    contents = contents.replace(/SERVICE/g, recipe);
    contents = contents.replace(/SNAME/g, recipeName);
    contents = contents.replace(/SCLEAN/g, cleanRecipeId);
    await fs.writeFile(filePath, contents);
  }
  console.log('[Info] Prepared new recipe');

  open(newRecipeFolder);
  console.log(`✅ Successfully created your recipe.

What's next?
- Make sure you restart Zellim in order for the recipe to show up
- Customise "webview.js", "package.json" and "icon.svg" (see https://github.com/getferdi/recipes/blob/master/docs/integration.md#recipe-structure)
- Publish your recipe (see https://github.com/getferdi/recipes/blob/master/docs/integration.md#publishing)`);
})();
