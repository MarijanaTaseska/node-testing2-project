const users = [
    {first_name:'Marijana', last_name:'Mirchevski'},
    {first_name:'Biljana', last_name:'Cvetkoska'},
    {first_name:'Dimitar', last_name:'Mirchevski'},
    {first_name:'Sam', last_name:'Bilibilot'},
]


exports.seed = async function(knex){
   await knex('users').insert(users)
}