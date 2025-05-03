import shell from "shelljs";

// Ensure Open API scheme.
shell.cp("src/rest/v1/openapi.yml", "dist/rest/v1/");
shell.cp("src/rest/v1/swagger-initializer.js", "dist/rest/v1/");
