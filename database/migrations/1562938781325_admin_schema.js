'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
      table.string('email', 191).notNullable().unique()
      table.string('username', 191).nullable()
      table.string('password', 191).nullable()
      table.boolean('status', 1).default(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema
