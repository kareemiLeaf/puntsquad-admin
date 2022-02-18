const { readdirSync } = require("fs");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      return { name: dirent.name, value: dirent.name };
    });

module.exports = (plop) => {
  const directories = getDirectories("src/pages");
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
      {
        // Raw text input
        type: "confirm",
        // Variable name for this input
        name: "isCommon",
        // Prompt to display on command line
        message: "Is it common component?",
      },
      {
        when(response) {
          return response.isCommon === false;
        },
        // Raw text input
        type: "list",
        // Variable name for this input
        name: "container",
        // Prompt to display on command line
        message: "Choose container?",
        choices: directories,
      },
    ],
    actions: (data) => {
      const path = data.isCommon
        ? "src/common/"
        : `src/pages/${data.container}/`;

      const actions = [
        {
          type: "add",
          path: `${path}{{pascalCase name}}/index.js`,
          templateFile: "plop-templates/Component/index.js.hbs",
        },
        {
          type: "add",
          path: `${path}{{pascalCase name}}/{{pascalCase name}}.module.scss`,
          templateFile: "plop-templates/Component/index.scss.hbs",
        },
      ];
      return actions;
    },
  });

  plop.setGenerator("screen", {
    description: "Create a screen",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your screen name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/index.js",
        templateFile: "plop-templates/Component/index.js.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{pascalCase name}}.module.scss",
        templateFile: "plop-templates/Component/index.scss.hbs",
      },
    ],
  });
};
