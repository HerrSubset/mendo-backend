Ok = x =>
({
    chain: f => f(x),
    map: f => Ok(f(x)),
    fold: (err, succ) => succ(x),
    inspect: _ => `Ok(${x})`
})


Err = x =>
({
    chain: f => Err(x),
    map: f => Err(x),
    fold: (err, succ) => err(x),
    inspect: _ => `Err(${x})`
})


module.exports.Ok = Ok
module.exports.Err = Err
