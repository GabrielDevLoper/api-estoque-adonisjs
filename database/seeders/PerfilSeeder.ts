import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Perfil from 'App/Models/Perfil'

export default class PerfilSeederSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const perfis = await Perfil.all()

    if (perfis.length <= 0) {
      await Perfil.createMany([
        {
          nome: 'ADMIN',
        },
        {
          nome: 'GESTOR',
        },
      ])
    }
  }
}
