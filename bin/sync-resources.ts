import shell from "shelljs";

// Ensure target directory exists
shell.mkdir("-p", "dist/rest/v1");

// Ensure Open API scheme.
shell.cp("src/rest/v1/openapi.yml", "dist/rest/v1/");
// We might still need the swagger initializer if using older swagger-ui-express or specific setups
shell.cp("src/rest/v1/swagger-initializer.js", "dist/rest/v1/");
