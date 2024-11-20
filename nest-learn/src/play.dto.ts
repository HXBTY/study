import { IsNotEmpty } from "class-validator";

export class PlayDto  {
  @IsNotEmpty({message: "game 不能为空"})
  game: string
}