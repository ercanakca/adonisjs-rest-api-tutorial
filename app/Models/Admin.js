'use strict'

const Model = use('Model')

class Admin extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         *
         * Look at `app/Models/Hooks/User.js` file to
         * check the hashPassword method
         */
        this.addHook('beforeCreate', 'Admin.hashPassword')
    }
}

module.exports = Admin
