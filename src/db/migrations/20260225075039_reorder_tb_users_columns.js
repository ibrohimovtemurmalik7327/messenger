exports.up = async function (knex) {
    await knex.raw(`
        /*language SQL*/
        ALTER TABLE tb_users
            MODIFY COLUMN id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
            MODIFY COLUMN user_name VARCHAR(100) NOT NULL AFTER id,
            MODIFY COLUMN phone VARCHAR(30) NOT NULL AFTER user_name,
            MODIFY COLUMN email VARCHAR(191) NULL AFTER phone,
            MODIFY COLUMN login VARCHAR(100) NULL AFTER email,
            MODIFY COLUMN password_hash VARCHAR(255) NOT NULL AFTER login,
            MODIFY COLUMN avatar_url VARCHAR(255) NULL AFTER password_hash,
            MODIFY COLUMN role ENUM('user','admin') NOT NULL DEFAULT 'user' AFTER avatar_url,
            MODIFY COLUMN status ENUM('active','blocked','pending') NOT NULL DEFAULT 'active' AFTER role,
            MODIFY COLUMN last_seen_at DATETIME NULL AFTER status,
            MODIFY COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER last_seen_at,
            MODIFY COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at,
                                                                                         MODIFY COLUMN phone_verified_at DATETIME NULL AFTER updated_at;
    `);
};

exports.down = async function (knex) {

};