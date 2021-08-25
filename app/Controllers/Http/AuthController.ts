import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const cpf = request.input('cpf')
    const password = request.input('password')

    const token = await auth.use('api').attempt(cpf, password)

    return token
  }
}
