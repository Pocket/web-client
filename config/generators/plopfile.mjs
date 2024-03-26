var __async = (__this, __arguments, generator2) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator2.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator2.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator2 = generator2.apply(__this, __arguments)).next());
  });
};

// utilities.ts
function validateFilename(input) {
  if (input.includes(".")) {
    return "name cannot include an extension";
  }
  if (input.includes("_")) {
    return "name cannot include underscores";
  }
  if (!input) {
    return "name is required";
  }
  return true;
}

// ui-component/_plop.ts
var uiPlop = {
  description: "Static UI Component",
  prompts: (inquirer) => __async(void 0, null, function* () {
    const { componentMain } = yield inquirer.prompt({
      type: "input",
      name: "componentMain",
      message: "What is the component type?",
      validate: validateFilename
    });
    const { componentSubs } = yield inquirer.prompt({
      type: "input",
      name: "componentSubs",
      message: "What sub-components would you like? (comma separated, blank for none)",
      validate: (input) => {
        if (input.length == 0)
          return true;
        const subs = input.split(",").map((stringValue) => stringValue.toString().trim());
        const validatedValues = subs.map(validateFilename);
        const hasNoErrors = validatedValues.every(
          (currentValue) => typeof currentValue === "boolean"
        );
        return hasNoErrors ? true : validatedValues.join(", ");
      }
    });
    return Promise.resolve({
      // all answer
      componentSubs,
      componentMain
    });
  }),
  actions: function(data) {
    const { componentMain, componentSubs } = data;
    const addMain = {
      type: "addMany",
      skipIfExists: true,
      destination: "../../ui/components/{{ componentName }}/",
      data: {
        componentName: componentMain,
        storyName: "Complete"
      },
      templateFiles: [
        "ui-component/component.story.tsx.hbs",
        "ui-component/component.test.tsx.hbs",
        "ui-component/index.tsx.hbs",
        "ui-component/style.module.css.hbs"
      ]
    };
    const subs = componentSubs.split(",").filter(Boolean).map((subName) => {
      const componentName = `${componentMain}-${subName.trim()}`;
      return {
        type: "addMany",
        destination: "../../ui/components/{{ componentName }}/",
        data: {
          componentName,
          storyName: subName
        },
        templateFiles: [
          "ui-component/component.story.tsx.hbs",
          "ui-component/component.test.tsx.hbs",
          "ui-component/index.tsx.hbs",
          "ui-component/style.module.css.hbs"
        ]
      };
    });
    return [addMain, ...subs];
  }
};

// common-state/_plop.ts
var statePlop = {
  description: "Shared state for components",
  prompts: [
    {
      type: "input",
      name: "stateType",
      message: "What will your state file be concerned with?",
      validate: validateFilename
    },
    {
      type: "input",
      name: "stateName",
      message: "What is the name of the state you would like?",
      validate: validateFilename
    }
  ],
  actions: [
    {
      type: "addMany",
      skipIfExists: true,
      destination: "../../common/state/{{ stateType }}-{{ stateName }}/",
      templateFiles: [
        "common-state/hydrate.tsx.hbs",
        "common-state/index.ts.hbs",
        "common-state/state.test.ts.hbs"
      ]
    }
  ]
};

// plopfile.ts
function generator(plop) {
  plop.setGenerator("Component", uiPlop);
  plop.setGenerator("State", statePlop);
}
export {
  generator as default
};
