/* Copyright (C) 2018,2019,2020 Captor AB - All Rights Reserved
 * Unauthorized copying or viewing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Contact andreas.lindh@captor.se> for information
 */
module.exports = {
    plugins: [],
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    },
    extends: [
        "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    rules: {
        "max-len": ["warn", 140],
        "no-var": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { args: "after-used", ignoreRestSiblings: false, argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
        ],
        "no-console": "off",
        "prefer-const": "off",
        "no-undef": "error", // disallow use of undeclared variables unless mentioned in a /*global */ block
        "no-undef-init": "error", // disallow use of undefined when initializing variables
        "no-undefined": "error", // disallow use of undefined variable (off by default)
        "generator-star-spacing": 1,
        "array-bracket-spacing": 1,
        "arrow-parens": 1,
        "no-await-in-loop": 1,
        "no-mixed-spaces-and-tabs": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        eqeqeq: "warn"
    }
};
