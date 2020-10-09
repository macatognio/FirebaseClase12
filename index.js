"use strict";

var firebaseConfig = {
    apiKey: "AIzaSyDxyA-FFfkcwC1pB8YC33ARcIw9_4njzN0",
    authDomain: "talentodigitalmodulo5mt.firebaseapp.com",
    databaseURL: "https://talentodigitalmodulo5mt.firebaseio.com",
    projectId: "talentodigitalmodulo5mt",
    storageBucket: "talentodigitalmodulo5mt.appspot.com",
    messagingSenderId: "397327733433",
    appId: "1:397327733433:web:667308bdaed85101740168"
};
// Initialize Firebase
var firebasecompras = firebase.initializeApp(firebaseConfig).database().ref('compras');

var app = new Vue({
    el: '#app',
    data: {
        compras: [],
        nombre: "",
        cantidad: 0
    },
    mounted() {
        firebasecompras.orderByKey();
        firebasecompras.on('child_added',
            (snapshot) => {
                let data = snapshot.toJSON();
                data.id = snapshot.key;
                console.log(data)
                this.compras.push(data);
            })
        firebasecompras.on('child_removed',
            (snapshot) => {
                console.log("remover", snapshot.key)
                let index = this.compras.findIndex(
                    (compra) => compra.id == snapshot.key
                );
                if (index >= 0) {
                    this.compras.splice(index, 1);
                }
            })
        firebasecompras.on('child_changed',
            (snapshot) => {
                let data = snapshot.toJSON();
                console.log("modificar", snapshot.key, data)
                let compra = this.compras.find(
                    (compra) => compra.id == snapshot.key
                );
                if (compra) {
                    compra.nombre = data.nombre;
                    compra.cantidad = data.cantidad;
                }
            })


    },
    methods: {
        agregar() {
            // this.compras.push({
            //     nombre: this.nombre,
            //     cantidad: this.cantidad,
            //     id: + new Date() //(new Date()).getTime()
            // });
            firebasecompras.push({
                    nombre: this.nombre,
                    cantidad: this.cantidad
                },
                (error) => {
                    if (error) {
                        console.log("error", error);
                    } else {
                        console.log("ok");
                    }
                }
            )
        },
        modificar(compramodificada) {
            // let compraantigua = this.compras.find(
            //     (compra) => compra.id == compramodificada.id
            // );
            // compraantigua.nombre = compramodificada.nombre;
            // compraantigua.cantidad = compramodificada.cantidad;

            firebasecompras.child(compramodificada.id)
                .set({
                        nombre: compramodificada.nombre,
                        cantidad: compramodificada.cantidad
                    },
                    (error) => {
                        if (error) {
                            console.log("error", error);
                        } else {
                            console.log("ok");
                        }
                    }
                )

        },
        eliminar(compraaeliminar) {
            // let index = this.compras.findIndex(
            //     (compra) => compra.id == compraaeliminar.id
            // );
            // if (index >= 0) {
            //     this.compras.splice(index, 1);
            // }

            firebasecompras.child(compraaeliminar.id)
                .remove(
                    (error) => {
                        if (error) {
                            console.log("error", error);
                        } else {
                            console.log("ok");
                        }
                    }
                )
        }
    }
})