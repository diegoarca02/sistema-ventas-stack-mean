var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');

function registrar(req,res){
    let data = req.body;
    var venta = new Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err,venta_save)=>{
        if(venta_save){
            let detalles = data.detalles;

            detalles.forEach((element,index) => {
                var detalleventa = new DetalleVenta();
                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id;

                detalleventa.save((err,detalle_save)=>{
                    if(detalle_save){
                        Producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if(producto_data){
                                Producto.findByIdAndUpdate({_id:producto_data._id},{stock: parseInt(producto_data.stock) - parseInt(element.cantidad)},(err,producto_edit)=>{
                                    res.end();
                                })
                            }else{
                                res.send(err);
                            }
                        });
                    }else{
                        res.send(err);
                    }
                });

            });

        }else{
            res.send(err);
        }
    });
}

function datos_venta(req,res){
    var id = req.params['id'];

    Venta.findById(id).populate('idcliente').populate('iduser').exec((err,data_venta)=>{
        if(data_venta){
            DetalleVenta.find({venta:data_venta._id}).populate('idproducto').exec({idventa:id},(err,data_detalle)=>{
                if(data_detalle){
                    res.status(200).send(
                        {
                            data : {
                                venta: data_venta,
                                detalles: data_detalle
                            }
                        }
                    );
                }
            });
        }
    });
}

function listado_venta(req,res){
    Venta.find().populate('idcliente').populate('iduser').exec((err,data_ventas)=>{
        if(data_ventas){
            res.status(200).send({ventas:data_ventas});
        }else{
            res.status(404).send({message: "No hay ningun registro de venta"});
        }
    });
}

function detalles_venta(req,res){
    var id = req.params['id'];

    DetalleVenta.find({venta: id}).populate('idproducto').exec((err,data_detalles)=>{
        if(data_detalles){
            res.status(200).send({detalles:data_detalles});
        }else{
            res.status(404).send({message: "No hay ningun registro de venta"});
        }
    });
}

module.exports = {
    registrar,
    datos_venta,
    listado_venta,
    detalles_venta
}