const { io } = require('../index');
const chatUserModel = require('../models/chatUser');
const chatsModel = require('../models/chat');



io.on('connection', (client) => {

    

    client.on('usuario', async (data) => {

        let nick = await chatUserModel.findOne({nickname: data.nickname})

        if (!nick) {
            let nicknuevo = new chatUserModel({
                nickname: data.nickname,
                usuarioId: data.id,
                img: data.img,
                conectado: true
            })

         return   await nicknuevo.save();
        }



        else {
            nick.conectado = true;

          return  await nick.save();
        }
       
    })


    client.on('Salirse', async (data, exito) => {

        let nick = await chatUserModel.findOne({nickname: data.nickname})  
        if ( nick ){
            nick.conectado = false;
    
    
           await nick.save()

        }     

    })


    client.on('conexion', async (data, usuariosC) => {

        let conectados = await chatUserModel.find({conectado: true});
        
        usuariosC(conectados);

    })


    client.on('user', async (data, sms) => {
        console.log(data);

      let mensajes = await chatsModel.find({nickname: data.nick}).populate('de', 'nickname image')

        sms(mensajes)
    })






    
  
});