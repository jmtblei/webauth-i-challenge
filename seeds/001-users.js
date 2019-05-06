
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'edgelord420', password: 'password'},
        {username: 'xNarutoGodx', password: 'password'},
        {username: 'MemeMaster666', password: 'abc123'}
      ]);
    });
};
