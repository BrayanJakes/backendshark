

module.exports = class CrudMongo{


   async listar(modelo, req, res){



     let listado =  await modelo.find().skip(Number(req.query.desde || 0));
        
     await modelo.countDocuments({}, (err, count)=>{
        if(err){
            return res.json({
                ok:false,
                err
             })
        }
        
         return res.json({
            ok:true,
            listado,
            contador: count
         })
     })
    }


    async agregar(modelo, req, res){
        

        await modelo.save((err, exito)=>{
        if(err){
            return res.json({
                ok:false,
                err
             })
        }
              return res.json({
            ok:true,
            exito
         })
       })  

    }

    async actualizar (modelo, id, body, req, res){

        await modelo.findByIdAndUpdate(id, {$set: body}, {new: true}, (err, actualizado)=>{
             if(!actualizado){
                return res.json({
                    ok:false,
                    message: 'No actualizado, existe un dato ya existente al que estas insertando',
                 })
            }
             if(err){
                return res.json({
                    ok:false,
                    message: `${id} no existe`,
                 })
            }

            return res.json({
                ok:true,
                message: `Actualizado`
             })
        })
    }

    async eliminar(modelo, id, req, res){
       await modelo.findByIdAndRemove(id, (err, eliminado) => {

            if(!eliminado){
                return res.json({
                    ok:false,
                    message: `${id} no existe`,
                 })
            }

            if(err){
                return res.json({
                    ok:false,
                    err
                 })
            }
            return res.json({
                ok:true,
                message: `Eliminado`
             })

           
        })
    }
}

