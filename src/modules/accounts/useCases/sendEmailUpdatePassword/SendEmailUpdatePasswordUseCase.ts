import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import auth from "@config/auth";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { transporter } from "@utils/sendMail";

interface IRequest {
  email: string;
  url: string;
}

@injectable()
class SendEmailUpdatePasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, url }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not exists", 404);
    }

    const { secret_password_token } = auth;

    const token = sign(
      {
        email,
      },
      secret_password_token,
      {
        subject: user.id,
        expiresIn: "30m",
      },
    );

    await transporter.sendMail({
      html: `Parece que você solicitou a redefinição de senha para a sua conta de email. <br>
              Estamos aqui para ajudar a recuperar o acesso à sua conta.<br>
              Clique no link para redefinição de senha <a href="${url}/?token=${token}">Clique aqui</a>
              `,
      subject: "Recuperação de senha",
      from: process.env.GMAIL,
      to: email,
    });
  }
}

export { SendEmailUpdatePasswordUseCase };
