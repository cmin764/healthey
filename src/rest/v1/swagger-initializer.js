window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "/v1/openapi.yml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIBundle.SwaggerUIStandalonePreset
    ],
  });
};
