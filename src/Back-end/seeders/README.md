Seeders folder — instrucciones rápidas

- Cada archivo en esta carpeta es un seeder de Sequelize con la estructura `module.exports = { up, down }`.
- Rellena la función `up` con `await queryInterface.bulkInsert('tabla', [...], {});` y la función `down` con `await queryInterface.bulkDelete('tabla', null, {});`.

Ejemplo minimal:

```js
await queryInterface.bulkInsert('areas', [
  { nombre: 'Recursos Humanos', createdAt: new Date(), updatedAt: new Date() },
], {});

// y en down:
await queryInterface.bulkDelete('areas', null, {});
```

Comandos útiles (ejecutar en `src/Back-end`):

```bash
# ejecutar todos los seeders
npx sequelize-cli db:seed:all --config config/config.js --seeders-path seeders

# revertir todos los seeders
npx sequelize-cli db:seed:undo:all --config config/config.js --seeders-path seeders
```

Notas:
- Asegúrate de usar los nombres reales de tablas que existen en tu base de datos.
- Incluye `createdAt` y `updatedAt` si tus tablas los requieren.
