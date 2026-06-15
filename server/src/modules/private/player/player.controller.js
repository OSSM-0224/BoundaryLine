import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import PlayerService from "./player.service.js";

class PlayerController {
  constructor(playerService = new PlayerService()) {
    this.playerService = playerService;
  }

  listPlayers = asyncHandler(async (req, res) => {
    const players = await this.playerService.listPlayers(req.validated.query);

    return new ApiResponse(
      200,
      "Players fetched successfully",
      players,
    ).send(res);
  });

  getPlayer = asyncHandler(async (req, res) => {
    const player = await this.playerService.getPlayerById(
      req.validated.params.id,
    );

    return new ApiResponse(200, "Player fetched successfully", player).send(
      res,
    );
  });

  createPlayer = asyncHandler(async (req, res) => {
    const player = await this.playerService.createPlayer(req.validated.body);

    return new ApiResponse(201, "Player created successfully", player).send(
      res,
    );
  });

  updatePlayer = asyncHandler(async (req, res) => {
    const player = await this.playerService.updatePlayer(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(200, "Player updated successfully", player).send(
      res,
    );
  });

  deletePlayer = asyncHandler(async (req, res) => {
    const player = await this.playerService.deletePlayer(
      req.validated.params.id,
    );

    return new ApiResponse(200, "Player deleted successfully", player).send(
      res,
    );
  });
}

export default PlayerController;
