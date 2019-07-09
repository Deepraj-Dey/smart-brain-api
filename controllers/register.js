const handleRegister = (req,res,bcrypt,database)=>
{
    const{name,email,password} = req.body
    if(!email || !name || !password)
    {
       return res.status(400).json('incorrect form submission')
    }
    else
    {
        const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
   database.transaction(trx=>{
       trx.insert(
           {
               hash:hash,
               email:email
           }
       )
       .into('login')
       .returning('email')
       .then(loginEmail=>{
          return trx('users')
           .returning('*')
           .insert({
            name:name,
            email:loginEmail[0],
            joined:new Date()
           })
           .then(user=> 
            {
              return res.json(user[0])
            })
       })
       .then(trx.commit)
       .catch(trx.rollback)
      
   })
   .catch(err=>res.json("unable to register"))
    }
   
}

module.exports = {
    handleRegister:handleRegister
}