import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const admin = auth.user?.id_perfil === 1

    if (!admin) {
      return response.unauthorized({ message: 'Ação não permitida' })
    }

    await next()
  }
}
