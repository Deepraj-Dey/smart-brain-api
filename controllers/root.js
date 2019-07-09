const handleRoot = (req,res,database)=>
{
    res.json(database.users)
}

module.exports = {
    handleRoot:handleRoot
}