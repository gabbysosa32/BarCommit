  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;

  var app = new Framework7({
      // App root element
      root: '#app',
      // App Name
      name: 'My App',
      // App id
      id: 'com.myapp.test',
      // Enable swipe panel
      panel: {
          swipe: 'left',
      },
      // Add default routes
      routes: [
              { path: '/index/', url: 'index.html', },
              { path: '/about/', url: 'about.html', },
              { path: '/registro/', url: 'registro.html', },
              { path: '/usuario/', url: 'usuario.html', },
              { path: '/pedidos/', url: 'pedidos.html', },
              { path: '/cartaadmin/', url: 'cartaadmin.html', },
              { path: '/admin/', url: 'admin.html', },
              { path: '/verusuarios/', url: 'verusuarios.html', },
              { path: '/carta/', url: 'carta.html', },
          ]
          // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  var nombre = "";
  var mail = "";
  var local = "";
  var clave = "";
  var categoria = "";
  var nombreprod = "";
  var precioprod = "";
  //   var colUsuarios = db.collection('usuarios');
  var db = firebase.firestore();
  // Handle Cordova Device Ready Event
  $$(document).on('deviceready', function() {
      console.log("Device is ready!");
  });

  // Option 1. Using one 'page:init' handler for all pages
  $$(document).on('page:init', function(e) {
      // Do something here when page loaded and initialized
      console.log(e);
      //   $$('#LogOut').on('click', FnCerrarsesion);
      //   console.log("Index")
  })

  // Option 2. Using live 'page:init' event handlers for each page
  $$(document).on('page:init', '.page[data-name="index"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrARegistro').on('click', fnirARegistro);
      //   $$('#IrAUsuario').on('click', fnirAUsuario);
      $$('#IrAUsuario').on('click', fnirAAdmin);
  })
  $$(document).on('page:init', '.page[data-name="registro"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#registro').on('click', fnRegistrarusuario);

  })
  $$(document).on('page:init', '.page[data-name="usuario"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrAPedidos').on('click', fnirAPedidos);
      $$('#VerCarta').on('click', fnVerCarta);

  })
  $$(document).on('page:init', '.page[data-name="pedidos"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized

  })
  $$(document).on('page:init', '.page[data-name="admin"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrACartaAd').on('click', fnirACartaAd);
      $$('#IrAVerUsuarios').on('click', fnIrAUsuarios);
  })
  $$(document).on('page:init', '.page[data-name="cartaadmin"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#AgregarCarta').on('click', fnAgregarCarta);
  })
  $$(document).on('page:init', '.page[data-name="verusuarios"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      // -------------------------------------------------trayendo los usuarios de la base de datos 





  })
  $$(document).on('page:init', '.page[data-name="carta"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized

  })



  function fnIrAUsuarios() {
      mainView.router.navigate('/verusuarios/');

      db.collection("usuarios").get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  //   console.log(doc.id, " => ", doc.data());
                  mail = doc.id;
                  nombre = doc.data().Nombre;
                  local = doc.data().Local; //sale por el catch por alguna razon
                  Estado = doc.data().Estado;
                  carta = `<div class="card data-table">
                  <table>
                    <thead>
                      <tr>
                        <th class="input-cell">
                          <span class="table-head-label">Nombre</span>
                          
                        </th>
                        <th class="input-cell">
                          <span class="table-head-label">Local</span>
                          
                        </th>
                        <th class="input-cell">
                          <span class="table-head-label">Mail</span>
                          
                        </th>
                        <th class="input-cell">
                          <span class="table-head-label">Estado</span>
                          <div class="input input-dropdown">
                            <select>
                              <option value="1">Admin</option>
                              <option value="2">Cliente</option>
                              <option value="3">Inactivo</option>
                            </select>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>` + nombre + `</td>
                        <td>` + local + `</td>
                        <td>` + mail + `</td>
                    
                      </tr>
                    </tbody>
                  </table>
                </div>`


                  $$('#contenedorUsuarios').append(carta);
                  console.log("anda bien pa")
              });
          })
          .catch(function() {
              console.log("Error DataBAse")

          })
  }

  function fnirAAdmin() {
      //   mainView.router.navigate('/admin/');
      mainView.router.navigate('/usuario/');
  }

  function fnirACartaAd() {
      mainView.router.navigate('/cartaadmin/');
  }

  function fnirAPedidos() {
      mainView.router.navigate('/pedidos/');
  }

  function fnirARegistro() {

      mainView.router.navigate('/registro/');
  }

  function fnirAUsuario() {

      //   firebase.auth().signInWithEmailAndPassword(mail, clave)
      //       .then((userCredential) => {

      //           var user = userCredential.user;
      //           mainView.router.navigate('/usuario/');
      //           console.log("Anda")
      //       })
      //       .catch((error) => {
      //           var errorCode = error.code;
      //           var errorMessage = error.message;
      //       });
      mainView.router.navigate('/usuario/');
  }


  function fnRegistrarusuario() {
      mail = $$('#registro-email').val();
      local = $$('#registro-local').val();
      nombre = $$('#registro-nombre').val();
      clave = $$('#registro-clave').val();



      // Creacion de usuario -----------------------------------


      firebase.auth().createUserWithEmailAndPassword(mail, clave)
          .then(function() {
              mainView.router.navigate('/index/');
              console.log("crea el usuario")


              var datos = {
                  Nombre: nombre,
                  Local: local,
                  Estado: 2,

              };

              db.collection("usuarios").doc(mail).set(datos)
                  .then(function(MiVarDeDocRef) {
                      console.log("Se creo todo bien");
                  })
                  .catch(function(datosDelError) {
                      console.log("Salio todo mal");
                  })
          })
          .catch(function(error) {
              if (error.code == "auth/email-already-in-use") {
                  console.error("el mail elegido ya esta vinculado a una cuenta");
              }

          });


  }

  function fnAgregarCarta() {
      categoria = $$('#nat-ad').val();
      nombreprod = $$('#nom-ad').val();
      precioprod = $$('#pre-ad').val();





      var datos2 = {
          //   Nombre: nombreprod,
          Precio: precioprod,
          Estado: 1,


      };

      db.collection(categoria).doc(nombreprod).set(datos2)
          .then(function(MiVarDeDocRef) {
              console.log("Se creo todo bien");
          })
          .catch(function(datosDelError) {
              console.log("Salio todo mal");
          })
  }





  function fnVerCarta() {
      mainView.router.navigate('/carta/');
      //   Muestro las gaseosas en el html 
      db.collection("Gaseosa").get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {

                  tipo = doc.id;
                  precio = doc.data().Precio;
                  estado = doc.data().Estado;

                  cartagaseosa = `<h1> </h1>
                  <h4> ` + tipo + ` $ ` + precio + `<button class="col button button-fill color-green onclick="Carro(` + tipo + `, ` + precio + `)">agregar a mi pedido</button> <br></h4>
                            
                  `



                  $$('#Contenedorgaseosas').append(cartagaseosa);

                  console.log(precio)
                  console.log(estado)
                  console.log(tipo)
              });
          })
          .catch(function() {
              console.log("Error DataBAse")

          })

      // Muestro la cafeteria en el html

      db.collection("Cafeteria").get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {

                  tipo = doc.id;
                  precio = doc.data().Precio;
                  estado = doc.data().Estado;

                  cartacafe = `<h1> </h1>
                  <h4> ` + tipo + ` $ ` + precio + `<button class="col button button-fill color-green onclick="Carro(` + tipo + `, ` + precio + `)">agregar a mi pedido</button>  <br></h4>
                            
                  `



                  $$('#Contenedorcafeteria').append(cartacafe);

                  console.log(precio)
                  console.log(estado)
                  console.log(tipo)
              });
          })
          .catch(function() {
              console.log("Error DataBAse")

          })
          // Muestro las hamburguesas en el html
      db.collection("Hamburguesas").get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  //   console.log(doc.id, " => ", doc.data());
                  tipo = doc.id;
                  precio = doc.data().Precio;
                  estado = doc.data().Estado;

                  cartaburguers = `<h1> </h1>
              <h4> ` + tipo + ` $ ` + precio + `<button class="col button button-fill color-green"  onclick="Carro(` + tipo + `, ` + precio + `)">agregar a mi pedido</button>  <br></h4>
                            
              `



                  $$('#Contenedorhamburguesas').append(cartaburguers);

                  console.log(precio)
                  console.log(estado)
                  console.log(tipo)
              });
          })
          .catch(function() {
              console.log("Error DataBAse")

          })

  }

  function Carro(i, p) {
      console.log(i, p)
  }
  //   function FnCerrarsesion() {
  //       console.log("Index23")
  //       var logOut = () => {


  //           var user = firebase.auth().currentUser;

  //           if (user) {
  //               firebase.auth().signOut()
  //                   .then(() => {
  //                       console.log('Cerrar sesión');
  //                       mainView.router.navigate('/index/');
  //                   })
  //                   .catch((error) => {
  //                       console.log('error ' + error);
  //                   });
  //           } else {
  //               console.log('Ya cerre sesion');
  //           }

  //       }

  //   }