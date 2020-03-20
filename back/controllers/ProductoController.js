var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');


function registrar(req,res){
    
    var data = req.body;

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err,producto_save)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({produto: producto_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto'}); 
                }
            }
        });
    }else{
        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err,producto_save)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({produto: producto_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto'}); 
                }
            }
        });
    }
    
}

function listar(req,res){
    var titulo = req.params['titulo'];

    Producto.find({titulo: new RegExp(titulo,'i')}).populate('idcategoria').exec((err,productos_listado)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(productos_listado){
                res.status(200).send({productos:productos_listado});
            }else{
                res.status(403).send({message: 'No hay ningun registro con ese titulo'});
            }
        }
    });
}

function editar(req,res){
    var data = req.body;
    var id = req.params['id'];
    var img = req.params['img'];

    if(req.files.imagen){

        if(img || img != null ||img != undefined){
            fs.unlink('./uploads/productos/'+img, (err)=>{
                if(err) throw err;
            });
        }

        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        Producto.findByIdAndUpdate({_id:id},{titulo: data.titulo, descripcion: data.descripcion, imagen:imagen_name, precio_compra: data.precio_compra, precio_venta: data.precio_venta, idcategoria: data.idcategoria, puntos: data.puntos}, (err, producto_edit) =>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(403).send({message: 'No se edito el producto'});
                }
            }
        });
    }else{
        Producto.findByIdAndUpdate({_id:id},{titulo: data.titulo, descripcion: data.descripcion, precio_compra: data.precio_compra, precio_venta: data.precio_venta, idcategoria: data.idcategoria, puntos: data.puntos}, (err, producto_edit) =>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(403).send({message: 'No se edito el producto'});
                }
            }
        });
    }

    

}

function obtener_producto(req,res){
    var id = req.params['id'];

    Producto.findOne({_id: id}, (err, producto_data) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_data){

            

                res.status(200).send({producto:producto_data});
            }else{
                res.status(403).send({message: 'No existe el registro'});
            }
        }
    });
}

function eliminar(req,res){
    var id = req.params['id'];

    Producto.findOneAndRemove({_id:id}, (err, producto_delete) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_delete){
                fs.unlink('./uploads/productos/'+producto_delete.imagen, (err)=>{
                    if(err) throw err;
                });
                res.status(200).send({produto:producto_delete});
            }else{
                res.status(403).send({message: 'No se elimino ningun registro'});
            }
        }
    })
}

function update_stock(req,res){
    let id = req.params['id'];
    let data = req.body;

    Producto.findById(id,(err,producto_data)=>{
        if(producto_data){
            Producto.findByIdAndUpdate(id,{stock: parseInt(producto_data.stock) + parseInt(data.stock)},(err,producto_edit)=>{
                if(producto_edit){
                    res.status(200).send({producto:producto_edit});
                }
            })
        }else{
            res.status(500).send(err);
        }
    })
}

function get_img(req,res) {  
    var img = req.params['img'];

    if(img != "null"){
        let path_img = './uploads/productos/'+ img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/productos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}


module.exports ={
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
get_img
    
}