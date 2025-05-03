import path from "path";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Prisma } from "@prisma/client";

import { v1 } from "./v1";
import { prisma } from "../prismaClient";

const app = express();
const PORT = process.env.PORT || 80;

// Load OpenAPI spec
const openApiSpec = YAML.load(path.join(__dirname, "v1", "openapi.yml"));

// Serve Swagger UI
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "v1", "openapi.yml"),
    validateRequests: true,
    validateResponses: true,
  }),
);
app.use("/v1", v1);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);

  // Handle Prisma not found errors
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({
      error: "Resource not found"
    });
  }

  // Handle Prisma NotFoundError which can be thrown directly
  if (err.name === 'NotFoundError' || err.message.includes('No') && err.message.includes('found')) {
    return res.status(404).json({
      error: "Resource not found"
    });
  }

  // Handle validation errors from OpenAPI validator
  if (err.name === 'BadRequest' || err.message.includes('validation')) {
    return res.status(400).json({
      error: err.message
    });
  }

  // Handle all other errors
  return res.status(500).json({
    error: "Internal server error"
  });
});

export function start() {
  const server = app.listen(PORT, () => {
    console.log(`HTTP server running at: http://localhost:${PORT}`);
  });

  // Gracefully disconnect from the DB and shutdown server.
  process.on("SIGINT", async () => {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Error during disconnect:", err);
    }

    server.close(() => {
      console.log("Process terminated");
      // Exit the process after everything is done
      process.exit(0);
    });
  });
}
