import { Service } from "typedi";
import { Post, Body, OnUndefined, JsonController, HttpError, HttpCode} from "routing-controllers";
import { AuthService } from "./Auth.service";
import { User } from "../User/User.model";
import { UserCredentials } from "./UserCredentials.model";
import { UnauthorizedUserError } from "./UnauthorizedUserError";
import { UserExistsConflictError } from "./UserExistsConflictError";

@Service()
@JsonController('/auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/login')
  @OnUndefined(UnauthorizedUserError)
  async login(@Body() credentials: UserCredentials) {
    return await this.service.getTokenForUserCredentials(credentials);
  }

  @Post('/signup')
  @HttpCode(201)
  @OnUndefined(UserExistsConflictError)
  async signUp(@Body() user: User) {
    return await this.service.signUp(user);
  }
}