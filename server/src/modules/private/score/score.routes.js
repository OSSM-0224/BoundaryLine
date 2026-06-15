import express from "express";
import ScoreController from "./score.controller.js";

import { validateRequest } from "../../shared/middleware/validateRequest.js";

import {
  authenticate,
  authorize,
} from "../../shared/middleware/auth.middleware.js";

import {
  createScoreSchema,
  updateScoreSchema,
  matchParamSchema,
  scoreParamSchema,
} from "./dto/score.dto.js";

class ScoreRoute {
  constructor(scoreController = new ScoreController()) {
    this.router = express.Router();
    this.scoreController = scoreController;

    this.registerRoutes();
  }

  registerRoutes() {
    // Create score
    this.router.post(
      "/",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN", "SCORER"),
      validateRequest(createScoreSchema),
      this.scoreController.createScore,
    );

    // Update score
    this.router.patch(
      "/:id",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN", "SCORER"),
      validateRequest(updateScoreSchema),
      this.scoreController.updateScore,
    );

    // Get scores by match
    this.router.get(
      "/match/:matchId",
      authenticate,
      validateRequest(matchParamSchema),
      this.scoreController.getScoresByMatch,
    );

    // Delete score
    this.router.delete(
      "/:id",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN"),
      validateRequest(scoreParamSchema),
      this.scoreController.deleteScore,
    );
  }

  getRouter() {
    return this.router;
  }
}

const scoreRoute = new ScoreRoute();

export default scoreRoute.getRouter();
