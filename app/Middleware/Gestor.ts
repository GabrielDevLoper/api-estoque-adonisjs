import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Gestor {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const gestor = auth.user?.id_perfil === 2

    if (!gestor) {
      return response.unauthorized({ message: 'Ação não permitida' })
    }

    await next()
  }
}
